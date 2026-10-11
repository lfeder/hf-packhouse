# HF Lalamilo packhouse — design

The packhouse and fert-room/storage building for the Hawaii Farming Lalamilo expansion: siting,
3D models, grading, the dock, the spec and storage. Everything is public and served as-is by
GitHub Pages:

**https://lfeder.github.io/hf-packhouse/**

This is the only home for the design work. It used to live in `greenhouse-quote-tracker/packhouse/`
and be mirrored here; that repo is archived as of 2026-10-11. The estimator, vendor quotes and
cost ledgers are in aloha-app (Managers/Expand, the `expansion` schema and storage bucket).

Two buildings at 8,000 ft2 each: the packhouse, and the fert room and storage building.

## Pages

The pages are plain files with no build; they load each other by name, so they stay together at
the root.

- `site-placement.html` — both buildings on the CEAd Option 5 site plan, with setback and apron checks.
- `packhouses-3d.html` — 3D models of both footprints.
- `grades.html` — floor levels against the Pattison topo, with rough earthwork cost.
- `dock-detail.html` — the angled dock in plan, dimensioned; the drawing to hand the dock vendor.
- `spec.html` — `packhouse-spec.md` rendered. Rebuild with `python3 scripts/build-spec.py`.
- `storage.html` — pallet space against need at +50% production, from `scripts/storage-inventory.sql`.
- `packhouse-layouts.js` — rooms and doors, shared by the site map, 3D models and grades.
- `packhouse-site.dxf` — the CAD drawing. Rebuild with `node scripts/export-dxf.js`.

## Sources and scripts

- `sources/site-map-plan.pdf` → `site-plan-option5.jpg` (the sheet with the old SUPPORT block
  erased), via `scripts/site-plan-image.py`.
- `sources/topo-model.pdf` → `topo-site.js` (the ground under the pad), via `scripts/topo-site.py`.
- `scripts/*.sql` query aloha-prod for storage, cooler occupancy and fert-room flows.

## Editing

Serve locally with `python3 serve.py` (http://localhost:8765), which turns caching off.

`packhouse-layouts.js`, `topo-site.js` and `site-plan-option5.jpg` keep their names when they
change, so a cached copy makes an edit look like it never happened. After changing any of them,
run `./stamp.sh` before committing: it stamps each page's reference with the file's content hash.

`robots.txt` and the `noindex` landing page keep it out of search results.
