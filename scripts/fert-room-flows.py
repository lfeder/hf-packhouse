"""Inbound deliveries and outbound moves for the fert building, from inventory receipts and burn.

    python3 scripts/fert-room-flows.py     # queries aloha-prod via the supabase CLI

Pallet sizes and weekly burn match storage.html. Fert goes out to each site by acreage at the
current rate (fert burn / 13.25 ac: JTL 8, BIP 4, nurseries 0.25, lettuce 1); cuke boxes and bags go to the packhouse.
"""
import collections, csv, datetime as dt, io, pathlib, subprocess

PAL = {"Calcium Nitrate, 55lb": 2420, "Magnesium Sulfate, 50lb": 2200, "Potassium Nitrate, 55lb": 2420,
       "Mono Potassium Phosphate Keep": 2100, "Potassium Sulfate, 50lb": 2200,
       "Keiki Boxes, White": 500, "Japanese Boxes, White": 500, "Boxes 14oz": 360, "Boxes 4oz": 480,
       "Boxes Off Grade": 700, "Boxes FS, 10lb": 320, "Bags Keiki, 1lb": 64000, "Bags Keiki, 2lb": 64000}
BURN = {"Calcium Nitrate, 55lb": 4200, "Magnesium Sulfate, 50lb": 1848, "Potassium Nitrate, 55lb": 1400,
        "Mono Potassium Phosphate Keep": 760, "Potassium Sulfate, 50lb": 700,
        "Keiki Boxes, White": 3000, "Japanese Boxes, White": 2000, "Boxes 14oz": 720, "Boxes 4oz": 600,
        "Boxes Off Grade": 175, "Boxes FS, 10lb": 80, "Bags Keiki, 1lb": 16333, "Bags Keiki, 2lb": 15000}
FERT = [k for k in PAL if 2000 < PAL[k] < 3000]
SITES = {"JTL": 8, "BIP": 4, "Nurseries": 0.25, "Lettuce": 1, "Lalamilo (local)": 5.5}   # post-expansion; JTL/BIP burn unchanged
LO, HI = dt.date(2025, 9, 22), dt.date(2026, 9, 21)

sql = "\n".join(l for l in pathlib.Path(__file__).with_suffix(".sql").read_text().splitlines() if not l.startswith("--"))
out = subprocess.run(["npx", "supabase", "db", "query", "--linked", "--project-ref", "zdvpqygiqavwpxljpvqw",
                      "-o", "csv", sql], capture_output=True, text=True, check=True).stdout
rows = [r for r in csv.DictReader(io.StringIO(out[out.index("d,item"):]))
        if r["item"] in PAL and LO <= dt.date.fromisoformat(r["d"]) <= HI]

per = collections.defaultdict(list)
for r in rows: per[r["item"]].append(float(r["q"]))
print(f"{'item':32}{'dlvs':>5}{'every wks':>10}{'plt/dlv':>8}{'recv plt/yr':>12}{'burn plt/yr':>12}")
for it in PAL:
    L = per.get(it, []); tot = sum(L) / PAL[it]; n = len(L)
    print(f"{it:32}{n:5}{52 / n if n else 0:10.1f}{tot / n if n else 0:8.1f}{tot:12.0f}{BURN[it] * 52 / PAL[it]:12.0f}")

ev = collections.defaultdict(float)
for r in rows: ev[(r["d"], r["vendor"])] += float(r["q"]) / PAL[r["item"]]
byv = collections.defaultdict(list)
for (d, v), p in sorted(ev.items()): byv[v].append(p)
for v, L in byv.items():
    print(f"{v}: {len(L)} deliveries, avg {sum(L) / len(L):.1f} plt, max {max(L):.0f}")

lb_ac = sum(BURN[k] for k in FERT) / 13.25
print(f"\nfert per acre: {lb_ac:.0f} lb/wk")
for s, ac in SITES.items():
    print(f"{s:18}{ac:6}ac {lb_ac * ac:7.0f} lb/wk " + " ".join(f"{k.split(',')[0]}={BURN[k] / 13.25 * ac / PAL[k]:.2f}" for k in FERT))

# Nutrien ships full containers, weight-limited at ~40,000 lb (biggest loads: 41,800 lb on 2026-06-05,
# 36,540 on 07-02). Post-expansion the hub feeds 18.75 acre equivalents; today's burn already covers 13.25 of them.
CONTAINER_LB, SCALE = 40000, 18.75 / 13.25
by_burn = sum(BURN[k] for k in FERT) * SCALE
by_recv = sum(sum(per.get(k, [])) for k in FERT) / 52 * SCALE
for name, lbwk in (("burn set on each item", by_burn), ("receipts, last 12 mo", by_recv)):
    print(f"{name:24}{lbwk:8.0f} lb/wk  full container every {CONTAINER_LB / lbwk:.1f} wks  3 months = {lbwk * 13.04 / 2250:.0f} plt")
