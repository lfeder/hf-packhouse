"""Build topo-site.js, the existing ground under the packhouse pad, for grades.html.

Source: sources/topo-model.pdf, the Pattison topo (Lot 10, 1 ft contours, surveyed 2025-12-03). It is a vector PDF
with the contours on layers C-TOPO-MAJR (5 ft, labelled) and C-TOPO-MINR (1 ft, unlabelled).

    python3 -m venv /tmp/v && /tmp/v/bin/pip install pymupdf scipy numpy
    /tmp/v/bin/python scripts/topo-site.py

1. Survey to site. The six lot-corner monuments on the survey are the six corners of PROP in site-placement.html;
   a least-squares similarity transform maps one to the other (scale 0.8335 ft/pt against the sheet's 1" = 60',
   rotation -36.6°, corner residuals 0.3 ft or less).
2. Elevations. Index contours take the number printed on them; pieces broken by a label or a join inherit it. A TIN
   of those plus the three ground spot shots then gives each 1 ft contour its foot (the nearest whole foot that is not
   a multiple of 5), and any unlabelled index contour its 5 ft.
3. Surface. A TIN of every contour vertex and the spot shots, sampled on a 2 ft grid over the pad and truck court.
"""
import json, re
from pathlib import Path
import numpy as np
import fitz
from scipy.interpolate import LinearNDInterpolator
from scipy.spatial import cKDTree

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "sources" / "topo-model.pdf"
OUT = ROOT / "topo-site.js"

# survey monuments (PDF points) and the matching PROP corners (site feet)
S = np.array([[1065.2, 470.0], [1585.0, 854.7], [1337.8, 1188.7], [1235.4, 2163.6], [143.5, 2048.9], [137.2, 1724.0]])
P = np.array([[69.6, 55.7], [608.7, 54.6], [609.2, 400.6], [1025.3, 1104.3], [237.7, 1570.3], [71.9, 1355.6]])
zs, zp = S[:, 0] + 1j * S[:, 1], P[:, 0] + 1j * P[:, 1]
(A, B), *_ = np.linalg.lstsq(np.vstack([zs, np.ones(len(zs))]).T, zp, rcond=None)
RES = np.abs(A * zs + B - zp)
def site(pts):
    z = A * (pts[:, 0] + 1j * pts[:, 1]) + B
    return np.stack([z.real, z.imag], 1)

GRID = dict(x0=440, x1=800, y0=380, y1=780, step=2)          # pad, truck court and their banks
CLIP = (GRID["x0"] - 120, GRID["x1"] + 120, GRID["y0"] - 120, GRID["y1"] + 120)   # contours kept for the TIN

page = fitz.open(PDF)[0]
def segments(layer):
    """The contours are drawn as filled quads, two triangles to a segment, so each drawing is one segment: pair its
    four corners into the two short ends and join their midpoints."""
    out = []
    for d in page.get_drawings():
        if d.get("layer") != layer: continue
        pts = []
        for it in d["items"]:
            for q in it[1:]:
                if hasattr(q, "x") and not any(abs(q.x - r[0]) + abs(q.y - r[1]) < 1e-3 for r in pts): pts.append((q.x, q.y))
        if len(pts) < 2: continue
        P4 = np.array(pts)
        if len(P4) == 4:
            pairs = min([((0, 1), (2, 3)), ((0, 2), (1, 3)), ((0, 3), (1, 2))],
                        key=lambda pr: sum(np.hypot(*(P4[i] - P4[j])) for i, j in pr))
            e = [P4[list(pr)].mean(0) for pr in pairs]
        else:
            D = np.hypot(*(P4[:, None] - P4[None]).transpose(2, 0, 1)); i, j = np.unravel_index(D.argmax(), D.shape); e = [P4[i], P4[j]]
        out.append(site(np.array(e)))
    return [q for q in out if CLIP[0] - 5 < q[:, 0].mean() < CLIP[1] + 5 and CLIP[2] - 5 < q[:, 1].mean() < CLIP[3] + 5]

def chain(segs, tol=0.6, dash=4.0):
    """join segments end to end into contour lines. The 1 ft contours are dashed, so an end also joins the nearest end
    up to `dash` ft away that carries straight on: the gap runs along both segments, not across to the next contour."""
    ends = np.array([q[k] for q in segs for k in (0, 1)]); tree = cKDTree(ends)
    out = np.array([(q[k] - q[1 - k]) / max(np.hypot(*(q[k] - q[1 - k])), 1e-9) for q in segs for k in (0, 1)])   # pointing out of each end
    def ok(i, j):
        v = ends[j] - ends[i]; d = np.hypot(*v)
        if d <= tol: return True
        v = v / d
        return v @ out[i] > 0.9 and -v @ out[j] > 0.9
    nbr = {}
    for i in range(len(ends)):
        c = sorted((j for j in tree.query_ball_point(ends[i], dash) if j // 2 != i // 2 and ok(i, j)), key=lambda j: np.hypot(*(ends[j] - ends[i])))
        nbr[i] = c
    used, lines = set(), []
    for s0 in range(len(segs)):
        if s0 in used: continue
        used.add(s0); line = [segs[s0][0], segs[s0][1]]
        for side in (1, 0):                      # grow from the far end, then from the near end
            cur = 2 * s0 + side
            while True:
                nxt = [j for j in nbr[cur] if j // 2 not in used]
                if not nxt: break
                j = nxt[0]; used.add(j // 2); far = j ^ 1
                (line.append if side else (lambda p: line.insert(0, p)))(ends[far]); cur = far
        lines.append(np.array(line))
    return lines

major, minor = chain(segments("C-TOPO-MAJR")), chain(segments("C-TOPO-MINR"))
def seg_dist(p, q):
    a, b = q[:-1], q[1:]; ab = b - a; t = np.clip(((p - a) * ab).sum(1) / np.maximum((ab * ab).sum(1), 1e-9), 0, 1)
    return np.sqrt((((a + ab * t[:, None]) - p) ** 2).sum(1)).min()
labels = [(site(np.array([[(w[0] + w[2]) / 2, (w[1] + w[3]) / 2]]))[0], float(w[4]), max(w[2] - w[0], w[3] - w[1]) * abs(A))
          for w in page.get_text("words") if re.fullmatch(r"2[56]\d\d", w[4])]
# a label sits in a gap in its contour: it names the lines that end at either side of it
named = {}
for c, e, half in labels:
    if not (CLIP[0] < c[0] < CLIP[1] and CLIP[2] < c[1] < CLIP[3]): continue
    group = major if e % 5 == 0 else minor
    for i, q in enumerate(group):
        if min(np.hypot(*(q[0] - c)), np.hypot(*(q[-1] - c))) < half / 2 + 3 or seg_dist(c, q) < 1.5:
            named[(e % 5 == 0, i)] = e

# spot shots on the ground (drain, pipe, nail); the TW and F.F. numbers are walls and floors, not ground
spots = []
for w in page.get_text("words"):
    m = re.fullmatch(r"(?:EL|ELEV)\.=(25\d\d\.\d+)", w[4])
    if m: spots.append((site(np.array([[w[0], (w[1] + w[3]) / 2]]))[0], float(m.group(1))))

def tin(lines, values, extra=()):
    pts = np.vstack([q for q in lines] + [np.array([p for p, _ in extra]).reshape(-1, 2)])
    val = np.concatenate([np.full(len(q), v) for q, v in zip(lines, values)] + [np.array([v for _, v in extra])])
    return LinearNDInterpolator(pts, val)

known = [(q, named[(True, i)]) for i, q in enumerate(major) if (True, i) in named] + \
        [(q, named[(False, i)]) for i, q in enumerate(minor) if (False, i) in named]
# work outward: each pass names the lines the last pass's TIN reaches, until nothing new is reached
done = {(big, i): v for (big, i), v in named.items()}
miss, off = [], []
for _ in range(30):
    have = [(major if big else minor)[i] for (big, i) in done]
    t0 = tin(have, list(done.values()), spots)
    new = 0
    for big, group in ((True, major), (False, minor)):
        for i, q in enumerate(group):
            if (big, i) in done: continue
            est = np.nanmedian(t0(q))
            if np.isnan(est): continue
            if big: f = round(est / 5) * 5
            else: f = min((k for k in range(int(est) - 2, int(est) + 3) if k % 5), key=lambda k: abs(k - est))
            done[(big, i)] = f; (miss if big else off).append(abs(f - est)); new += 1
    if not new: break
lines = [(major if big else minor)[i] for (big, i) in done]; vals = list(done.values())
known = list(named)
surface = tin(lines, vals, spots)

g = GRID
xs = np.arange(g["x0"], g["x1"] + 0.01, g["step"]); ys = np.arange(g["y0"], g["y1"] + 0.01, g["step"])
X, Y = np.meshgrid(xs, ys)
Z = surface(np.stack([X.ravel(), Y.ravel()], 1)).reshape(X.shape)
# cells past the surveyed area (beyond the east property line) carry null

def simplify(q, tol=0.4):
    if len(q) < 3: return q
    a, b = q[0], q[-1]; ab = b - a; L = np.hypot(*ab)
    d = np.abs(np.cross(ab, q - a)) / L if L > 1e-9 else np.hypot(*(q - a).T)
    k = int(d.argmax())
    return np.vstack([simplify(q[:k + 1], tol)[:-1], simplify(q[k:], tol)]) if d[k] > tol else np.array([a, b])
def inside(q):
    m = (q[:, 0] >= g["x0"]) & (q[:, 0] <= g["x1"]) & (q[:, 1] >= g["y0"]) & (q[:, 1] <= g["y1"])
    runs, cur = [], []
    for p, ok in zip(q, m):
        if ok: cur.append(p)
        elif cur: runs.append(np.array(cur)); cur = []
    if cur: runs.append(np.array(cur))
    return [r for r in runs if len(r) > 1]
contours = [{"e": int(v), "p": [round(c, 1) for c in simplify(r).ravel()]} for q, v in zip(lines, vals) for r in inside(q)]

data = {
    "source": "Pattison topo, Lot 10, 1 ft contours, 2025-12-03 (sources/topo-model.pdf)",
    "fit": {"scaleFtPerPt": round(abs(A), 5), "rotationDeg": round(float(np.degrees(np.angle(A))), 3), "cornerResidualFt": round(float(RES.max()), 2)},
    "grid": {"x0": g["x0"], "y0": g["y0"], "step": g["step"], "nx": len(xs), "ny": len(ys),
             "z": [None if np.isnan(v) else int(round((v - 2500) * 100)) for v in Z.ravel()]},   # hundredths of a foot above 2500
    "contours": contours,
}
OUT.write_text("/* Existing ground under the packhouse pad, from scripts/topo-site.py. Site feet; grid z in hundredths of a foot above 2500. */\n"
               "window.TOPO = " + json.dumps(data, separators=(",", ":")) + ";\n")
print(f"fit residual {RES.max():.2f} ft; {len(major)} index and {len(minor)} 1 ft lines; {len(known)} named by a label, "
      f"{len(miss)} index pieces from the TIN (worst {max(miss) if miss else 0:.2f} ft off 5), "
      f"{len(off)} minor pieces (median {np.median(off):.2f} ft, 95th pct {np.percentile(off, 95):.2f} ft off a whole foot)")
print(f"grid {len(xs)} x {len(ys)}, {np.isnan(Z).sum()} cells unsurveyed, z {np.nanmin(Z):.2f}..{np.nanmax(Z):.2f}; {len(contours)} contour runs; {OUT.stat().st_size // 1024} KB")
