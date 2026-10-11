/* Export the site plan, both buildings and the grading to DXF (R12, ASCII), for CAD.

   Run from anywhere:  node scripts/export-dxf.js
   Writes packhouse-site.dxf

   Units are feet, in the site frame the pages use (traced from the CEAd sheet, ±2 ft), with y flipped so north is up.
   Not a survey: the Pattison survey governs. Contours carry their elevation as z. Everything is read from the same
   sources the pages draw from: packhouse-layouts.js, topo-site.js, and the grading model in grades.html. */
const fs = require("fs"), path = require("path");
const HERE = path.resolve(__dirname, ".."), OUT = path.join(HERE, "packhouse-site.dxf");

global.window = {}; global.document = { querySelector: () => null };
eval(fs.readFileSync(path.join(HERE, "packhouse-layouts.js"), "utf8"));
eval(fs.readFileSync(path.join(HERE, "topo-site.js"), "utf8"));

/* the grading model, lifted out of grades.html: everything up to the volume tables */
const gsrc = fs.readFileSync(path.join(HERE, "grades.html"), "utf8");
const g0 = gsrc.indexOf('(function(){\n"use strict";'), g1 = gsrc.indexOf("function westSouth");
const model = gsrc.slice(g0, g1).replace('(function(){\n"use strict";', "");
const neigh = gsrc.match(/var NEIGH = \[[\s\S]*?\];/)[0];
/* the existing buildings, parking and septic, lifted out of site-placement.html */
const ssrc = fs.readFileSync(path.join(HERE, "site-placement.html"), "utf8");
const grab = name => ssrc.match(new RegExp("const " + name + " = \\[[\\s\\S]*?\\n\\];"))[0];
const site = [grab("BLDG"), ssrc.match(/const STALL = [^\n]*/)[0], grab("PARK_SPOTS"), grab("ITEM_HOME")].join("\n");

const run = new Function(model + "\n" + neigh + "\n" + site + `
  setFloor(OPT1); runModels();   /* the chosen floor, as the page opens on */
  return { FF, XR, G: MODELS.court.G, NX, NY, ST, T, PROP, L, SITE, ECO, NEIGH, BLDG, ITEM_HOME, STALL, STALL_D, AISLE,
           walls: wallsOf("court").filter(counts) };`);
const M = run();

/* ---------- DXF writer ---------- */
const ents = [], layers = {};
const Y = y => -y;   /* site y runs south; CAD y runs north */
function layer(n, c){ layers[n] = c; }
function line(l, a, b, z0, z1){ ents.push(["LINE", l, `10\n${a[0].toFixed(3)}\n20\n${Y(a[1]).toFixed(3)}\n30\n${(z0 || 0).toFixed(3)}\n11\n${b[0].toFixed(3)}\n21\n${Y(b[1]).toFixed(3)}\n31\n${(z1 === undefined ? z0 || 0 : z1).toFixed(3)}`]); }
function poly(l, pts, closed){ for (let i = 0; i < pts.length - (closed ? 0 : 1); i++) line(l, pts[i], pts[(i + 1) % pts.length]); }
function text(l, p, h, s, rot){ ents.push(["TEXT", l, `10\n${p[0].toFixed(3)}\n20\n${Y(p[1]).toFixed(3)}\n30\n0\n40\n${h}\n1\n${s.replace(/[^\x20-\x7E]/g, c => ({ "·": "-", "–": "-", "—": "-", "×": "x", "°": "%%d", "²": "2" })[c] || "")}\n50\n${(rot || 0).toFixed(2)}`]); }
function write(){
  const L = Object.keys(layers);
  let s = "0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n9\n$INSUNITS\n70\n2\n0\nENDSEC\n";
  s += "0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n" + L.length + "\n";
  L.forEach(n => { s += `0\nLAYER\n2\n${n}\n70\n0\n62\n${layers[n]}\n6\nCONTINUOUS\n`; });
  s += "0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n";
  ents.forEach(e => { s += `0\n${e[0]}\n8\n${e[1]}\n${e[2]}\n`; });
  s += "0\nENDSEC\n0\nEOF\n";
  fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, s);
}

/* ---------- geometry ---------- */
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const rotRect = (cx, cy, l, d, ang) => { const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return [[-l / 2, -d / 2], [l / 2, -d / 2], [l / 2, d / 2], [-l / 2, d / 2]].map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]); };
function toSite(id, x, z){ const P = M.SITE[id], B = M.L[id], W = B.W, D = B.D;
  const q = [[x, z], [D - z, x], [W - x, D - z], [z, W - x]][P.rot]; return [P.x + q[0], P.y + q[1]]; }

layer("PROPERTY", 1); layer("BLDG-NEW", 3); layer("ROOMS", 8); layer("DOORS", 1); layer("BLDG-EXIST", 8); layer("BLDG-LOT9", 9);
layer("WALL-ECOBLOCK", 6); layer("WALL-RETAINING", 7); layer("ROAD", 252); layer("SITE", 30); layer("ELEC-PULLBOX", 2);
layer("TOPO-EXIST", 8); layer("GRADE-FINISHED", 5); layer("NOTES", 7);

poly("PROPERTY", M.PROP, true);

/* new buildings, rooms, openings */
["ph80", "fert80"].forEach(id => {
  const B = M.L[id];
  poly("BLDG-NEW", [toSite(id, 0, 0), toSite(id, B.W, 0), toSite(id, B.W, B.D), toSite(id, 0, B.D)], true);
  const c = toSite(id, B.W / 2, B.D / 2); text("BLDG-NEW", [c[0] - 30, c[1] - 44], 3, `${B.name} - ${B.D} x ${B.W} ft, eave ${B.eave} ft, FF ${M.FF.toFixed(2)}`);
  B.rooms.forEach(r => { (r.parts || [[r.x0, r.z0, r.x1, r.z1]]).forEach(p => poly("ROOMS", [toSite(id, p[0], p[1]), toSite(id, p[2], p[1]), toSite(id, p[2], p[3]), toSite(id, p[0], p[3])], true));
    const m = toSite(id, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2); text("ROOMS", [m[0] - 8, m[1]], 2, r.short || r.name); });
  B.openings.filter(o => o.face !== "I").forEach(o => {
    const at = t => o.face === "N" ? toSite(id, t, 0) : o.face === "S" ? toSite(id, t, B.D) : o.face === "W" ? toSite(id, 0, t) : toSite(id, B.W, t);
    const a = at(o.a), b = at(o.b); line("DOORS", a, b); text("DOORS", [(a[0] + b[0]) / 2 + 1, (a[1] + b[1]) / 2 + 1], 1.5, `${o.mark} ${o.size || ""}`);
  });
});

/* existing buildings on our lot, and on Lot 9 */
M.BLDG.forEach(b => { poly("BLDG-EXIST", rect(b.x, b.y, b.w, b.h), true); text("BLDG-EXIST", [b.x + 3, b.y + 6], 3, b.name); });
const u = M.ECO.u, out = [u[1], -u[0]];
M.NEIGH.forEach(n => { const s0 = n.sw, p = (a, d) => [s0[0] + u[0] * a + out[0] * d, s0[1] + u[1] * a + out[1] * d];
  poly("BLDG-LOT9", [p(0, 0), p(n.len, 0), p(n.len, n.dep), p(0, n.dep)], true); text("BLDG-LOT9", p(10, n.dep / 2), 3, n.name + " (traced, pad level not surveyed)"); });

/* Ecoblock wall: its band, 2.5 ft deep, face ECO.off inside the line, with a 2 ft step one block long past each end */
const E = window.PH_ECO, A = M.PROP[2];
const atL = (y, o) => { const t = (y - A[1]) / u[1]; return [A[0] + u[0] * t + M.ECO.n[0] * o, A[1] + u[1] * t + M.ECO.n[1] * o]; };
const band = (y0, y1) => poly("WALL-ECOBLOCK", [atL(y0, E.off), atL(y1, E.off), atL(y1, E.off + 2.5), atL(y0, E.off + 2.5)], true);
const dy = E.step * u[1]; band(E.y0, E.y1); band(E.y0 - dy, E.y0); band(E.y1, E.y1 + dy);
const wm = atL((E.y0 + E.y1) / 2, 9); text("WALL-ECOBLOCK", wm, 2, `Ecoblock wall, 4 ft (two 2 ft blocks), face ${E.off} ft inside the line; 2 ft step each end`, -Math.atan2(u[1], u[0]) * 180 / Math.PI);
/* every other retaining wall the grading needs, top and bottom elevations in the note */
M.walls.filter(w => !/Ecoblock/.test(w.where)).forEach(w => line("WALL-RETAINING", [w.x0, w.y0], [w.x1, w.y1], M.FF + w.hi));

/* roads: north entry, the upper bypass (centreline and edges), the shop's concrete pad */
poly("ROAD", window.PH_ROAD, true); text("ROAD", [540, 436], 2.5, "North entry road, at grade");
const BP = window.PH_BYPASS;
for (let i = 0; i < BP.pts.length - 1; i++){ const p = BP.pts[i], q = BP.pts[i + 1], l = Math.hypot(q[0] - p[0], q[1] - p[1]), nx = -(q[1] - p[1]) / l, ny = (q[0] - p[0]) / l;
  line("ROAD", p, q); [-1, 1].forEach(s => line("ROAD", [p[0] + nx * BP.w / 2 * s, p[1] + ny * BP.w / 2 * s], [q[0] + nx * BP.w / 2 * s, q[1] + ny * BP.w / 2 * s])); }
text("ROAD", [700, 530], 2.5, `Upper bypass, one way, ${BP.w} ft, at grade`, -Math.atan2(u[1], u[0]) * 180 / Math.PI);
const SH = window.PH_SHOP, onLine = p => { const t = (p[0] - A[0]) * u[0] + (p[1] - A[1]) * u[1]; return [A[0] + u[0] * t, A[1] + u[1] * t]; };
const s1 = [SH.sw[0] + u[0] * SH.len, SH.sw[1] + u[1] * SH.len]; poly("ROAD", [onLine(SH.sw), onLine(s1), s1, SH.sw], true);

/* septic and parking */
M.ITEM_HOME.forEach(it => { const l = it.kind === "septic" ? it.len : it.stalls / (it.rows || 1) * M.STALL, d = it.kind === "septic" ? it.wid : (it.rows || 1) * M.STALL_D + (it.aisle ? M.AISLE : 0);
  poly("SITE", rotRect(it.x, it.y, l, d, it.ang), true); text("SITE", [it.x - 10, it.y], 2, `${it.name} ${Math.round(l)} x ${Math.round(d)} ft`, -it.ang); });

/* pull boxes and the buried line, drawn straight: route unknown */
const [p1, p2] = window.PH_PULL; line("ELEC-PULLBOX", [p1.x, p1.y], [p2.x, p2.y]);
window.PH_PULL.forEach(p => { poly("ELEC-PULLBOX", rect(p.x - 1.5, p.y - 1.5, 3, 3), true); text("ELEC-PULLBOX", [p.x + 3, p.y], 2, p.mark); });
text("ELEC-PULLBOX", [(p1.x + p2.x) / 2 + 3, (p1.y + p2.y) / 2], 2, "Buried electrical, route unknown - locate before digging");

/* contours by marching squares, 1 ft; z is the elevation */
function contours(A, lay, lo, hi){
  for (let lev = Math.ceil(lo); lev <= Math.floor(hi); lev++){
    const v = lev - M.FF;
    for (let j = 0; j < M.NY - 1; j++) for (let i = 0; i < M.NX - 1; i++){
      const k = j * M.NX + i, c = [A[k], A[k + 1], A[k + M.NX + 1], A[k + M.NX]];
      if (c.some(isNaN)) continue;
      const x0 = M.T.x0 + i * M.ST, y0 = M.T.y0 + j * M.ST, P = [[x0, y0], [x0 + M.ST, y0], [x0 + M.ST, y0 + M.ST], [x0, y0 + M.ST]], hits = [];
      for (let e = 0; e < 4; e++){ const a = c[e], b = c[(e + 1) % 4]; if ((a < v) !== (b < v)){ const t = (v - a) / (b - a), pa = P[e], pb = P[(e + 1) % 4]; hits.push([pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t]); } }
      for (let h = 0; h + 1 < hits.length; h += 2) line(lay, hits[h], hits[h + 1], lev);
    }
  }
}
let lo = Infinity, hi = -Infinity; M.XR.forEach(z => { if (!isNaN(z)){ lo = Math.min(lo, z + M.FF); hi = Math.max(hi, z + M.FF); } });
contours(M.XR, "TOPO-EXIST", lo, hi);
contours(M.G, "GRADE-FINISHED", lo - 5, hi);

text("NOTES", [80, 30], 4, "Hawaii Farming, Lalamilo - packhouse and fert building. Feet, site frame traced from the CEAd sheet (+/-2 ft), north up.");
text("NOTES", [80, 38], 3, `Finished floor ${M.FF.toFixed(2)} both buildings. Contours 1 ft: existing (Pattison topo) and finished grade. The Pattison survey governs.`);
write();
console.log("wrote", OUT, ents.length, "entities");
