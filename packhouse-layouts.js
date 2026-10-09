/* Room and opening layouts for the two 8,000 ft2 packhouse buildings, both 100 × 80 ft.
   Shared by site-placement.html (plan on the site) and packhouses-3d.html (3D models).

   Local frame, both buildings: x runs 0..W across the 80 ft width, z runs 0..D down the 100 ft depth, drawing
   frame of CEAd Option 5 before the site map turns the building a quarter clockwise. Faces: N at z=0, S at z=D,
   W at x=0, E at x=W; on the site map N is east, S is west, W is north and E is south. An opening's a/b run along
   its face (x for N/S, z for E/W); h is head height, sill is the bottom above slab; rig is the longest container a
   dock takes, 45 ft where not given. A partition hole is
   [a, b, bottom, top] along the partition, with "glass" as a fifth entry for a window or glazed door. */

/* Set position of each building on the site map, in site feet (x east, y south, drawing frame): its north-west corner
   once turned a quarter clockwise. Both sit 20 ft off the Lettuce Grow for the septic, and far enough south that the
   packhouse's angled dock apron clears the property line. Read by the site map, the 3D flows and the grades page. */
window.PH_SITE = { ph80: { x: 485.7, y: 488, rot: 1 }, fert80: { x: 485.7, y: 618, rot: 1 } };   /* 19.5 ft west of the first layout, following the Lettuce Grow */
/* the property line, site feet, traced from the CEAd sheet; its six corners are the Pattison survey's lot monuments */
window.PH_PROP = [[69.6, 55.7], [608.7, 54.6], [609.2, 400.6], [1025.3, 1104.3], [237.7, 1570.3], [71.9, 1355.6]];
/* Ecoblock wall facing the shop on Lot 9: its face `off` ft inside the east property line (PH_PROP[2] to [3]), between
   y0 and y1 measured on the line, `h` ft above the court. A 2 ft step one block long (`step`) finishes each end, where
   the court or road turns off the line and an ordinary 2:1 slope takes over. Read by the site map and the grades page. */
window.PH_ECO = { off: 3, y0: 440, y1: 575, h: 4, step: 6 };
/* electrical pull boxes, site feet. PB1 halfway between the Existing Facility's SE corner (485.6, 461) and the NW corner of
   the packhouse's north-wall stalls (491.1, 470); PB2 in Grow 3 on the post column at x 567.3 (where the sheet's dashed
   lines fan out), four posts south of the north edge. The buried line between them is drawn straight: its real route is
   unknown. */
/* the upper road from the north, traced from the CEAd sheet: in at existing grade, about a foot above the floor, past the
   packhouse's north side and into the truck court's north entry. Read by the site map and the grades page. */
window.PH_ROAD = [[516, 397], [522, 412], [532, 420], [580, 420.5], [598, 426], [612, 438], [622, 452], [632, 470], [608, 478], [606, 466], [598, 455], [584, 448], [516, 448]];
window.PH_PULL = [{ mark: "PB1", x: 488.4, y: 465.5 }, { mark: "PB2", x: 567.3, y: 782.1 }];

window.PH_LAYOUTS = {
  /* docks on the 80 ft N face (east on the site map) */
  ph80: {
    id: "ph80", building: "ph", shape: "A", name: "Packhouse", W: 80, D: 100, eave: 14, color: "#3B7645",
    rooms: [
      { id: "cold", name: "Cold storage", tone: "--flow-box", x0: 0, x1: 80, z0: 0, z1: 30,
        note: "Finished goods at 50–55 °F across the whole dock face. 60 floor positions block-stacked 4 deep off a 12 ft dock aisle, clear of the route to the pack-room door. Insulated panel walls, full height." },
      { id: "pack", name: "Pack room", tone: "--flow-crop", noTag: true, x0: 0, x1: 80, z0: 30, z1: 75,
        note: "Harvest comes in through R1 on the north wall at the cooler end, over the floor scale to staging. The Japanese/English packing machine (one machine for both) sits in the vendor's 36 × 36 ft cell, turned so its infeed is at the cooler end, fed straight from staging, and its outfeed at the west end, where the pack table boxes wrapped Js onto the J/E pallet. The five 6 × 3 ft Keiki tables form one row beside it, with two pallet spaces for packed cases and the empty-bin pallet just south of them. A clear 28 × 16 ft palletizing area with the pallet wrapper against the cooler wall just north of the cooler door, 3 desks, hand-wash sinks at the pack room door and the break room door. Epoxy floor." },
      { id: "break", name: "Break room", tone: "--survey", x0: 0, x1: 48, z0: 75, z1: 100, parts: [[0, 75, 48, 92], [0, 92, 32, 100]],
        note: "1,072 ft² at the west end, an L around the bathrooms. Staff come in from the parking through P4 at the west end of the north wall, with a 6 × 6 ft block of mini lockers beside the door. Windows and a glass door look into the pack room. 12 ft ceiling." },
      { id: "clean", name: "Cleaning store", short: "Cleaning", tone: "--ink-3", x0: 32, x1: 38, z0: 92, z1: 100,
        note: "48 ft² on the west wall for cleaning supplies and the mop sink, next to the bathrooms, door from the break room." },
      { id: "bath2", name: "Bathroom 2", short: "Bath 2", tone: "--ink-3", x0: 38, x1: 43, z0: 92, z1: 100,
        note: "5 × 8 ft single-user bathroom on the west wall, toilet and sink, door from the break room. Eyewash on the break room wall beside the cleaning store." },
      { id: "bath1", name: "Bathroom 1", short: "Bath 1", tone: "--ink-3", x0: 43, x1: 48, z0: 92, z1: 100,
        note: "5 × 8 ft single-user bathroom on the west wall, in the break room's southwest corner, toilet and sink, door from the break room." },
      { id: "store", name: "Box, bag and label store", short: "Box store", tone: "--flow-box", x0: 48, x1: 80, z0: 75, z1: 100,
        note: "800 ft² at the southwest corner, open to the pack room with no wall between: the forklift comes in R3 and sets pallets straight down. A 2-deep lane of boxes and bags two high (28 pallets) off a 12 ft aisle, with shelving for labels and small supplies. The box erector stands here against the bathroom wall, with the cartons it feeds off." }
    ],
    partitions: [
      /* break room to pack room: a glass door, and windows either side of it from 3.5 to 7 ft */
      { axis: "z", at: 75, from: 0, to: 48, h: 12, holes: [[3, 17, 3.5, 7, "glass"], [20, 24, 0, 7, "glass"], [27, 38, 3.5, 7, "glass"]] },
      /* cleaning store and bathrooms along the west wall, doors from the break room */
      { axis: "z", at: 92, from: 32, to: 48, h: 12, holes: [[33.5, 36.5, 0, 7], [39, 42, 0, 7], [44, 47, 0, 7]] },
      { axis: "x", at: 32, from: 92, to: 100, h: 12, holes: [] },
      { axis: "x", at: 38, from: 92, to: 100, h: 12, holes: [] },
      { axis: "x", at: 43, from: 92, to: 100, h: 12, holes: [] },
      { axis: "x", at: 48, from: 75, to: 100, h: 12, holes: [] }
    ],
    openings: [
      { mark: "D2", type: "dock", face: "N", a: 52.5, b: 60.5, h: 9, angle: 22.5, seal: 1.5, rig: 40, size: "8 × 9 ft", room: "Cold storage",
        detail: "48 in dock in an insulated dock house angled about 22° toward the south, manual leveller and dock shelter. Auto" },
      { mark: "D1", type: "dock", face: "N", a: 65.5, b: 73.5, h: 9, angle: 22.5, seal: 1.5, rig: 40, size: "8 × 9 ft", room: "Cold storage",
        detail: "48 in dock in an insulated dock house angled about 22° toward the south, manual leveller and dock shelter. 40 ft containers out. Auto" },
      { mark: "P4", type: "door", face: "W", a: 95.5, b: 98.5, h: 7, size: "3 × 7 ft", room: "Break room",
        detail: "Staff entry at the west end of the north wall, beside the parking along it, into the break room by the mini lockers" },
      { mark: "R2", type: "rollup", face: "W", a: 2, b: 12, h: 10, size: "10 × 10 ft", room: "Cold storage",
        detail: "At grade on the north wall (site map), straight into the cooler's dock aisle. Box trucks going out. Auto" },
      { mark: "R1", type: "rollup", face: "W", a: 31.5, b: 41.5, h: 10, size: "10 × 10 ft", room: "Pack room",
        detail: "At grade on the north wall (site map), at the east end of the pack room by the cooler door. Box trucks bringing cucumbers in from the grows. Auto" },
      { mark: "P3", type: "door", face: "E", a: 50, b: 53, h: 7, size: "3 × 7 ft", room: "Pack room",
        detail: "Pack room door on the south wall, straight onto the covered bin wash" },
      { mark: "R3", type: "rollup", face: "E", a: 32, b: 40, h: 10, forklift: true, size: "8 × 10 ft", room: "Pack room",
        detail: "Forklift roll-up on the south wall (site map) at the east end of the pack room, by the cooler wall: boxes and bags come in from the fert building across the lane and the bin wash pad to the box store. No trucks" }
    ],
    /* outdoor areas, local coords; x > W is outside the E face (south wall on the site map) */
    outdoor: [
      { id: "binwash", name: "Bin wash", x0: 80, x1: 110, z0: 30, z1: 100, roof: 14,   /* z0 just east of R3 (32–40), so its post clears the opening */
        note: "Covered bin wash, 70 ft along the west end of the south wall × 30 ft out (2,100 ft²) under an open awning, in the 50 ft gap between the packhouse and the fert building, leaving a 20 ft lane. Its east posts stand just east of R3, clear of the opening. Sloped pad to a trench drain, hot water. The pack room door opens onto it, and forklifts cross it to R3 with boxes from the fert building. Clean bins are stacked at its west end for the harvest trucks." }
    ],
    /* drains, local coords as [x0, z0, x1, z1]: trench drains are long strips, floor drains 1.5 ft squares */
    drains: [
      { name: "Trench drain", x0: 2, z0: 52, x1: 78, z1: 53 },        /* pack room washdown, the full width through the centre of the room */
      { name: "Floor drain", x0: 62.75, z0: 20.25, x1: 64.25, z1: 21.75 },   /* cooler, in the route to the pack room door */
      { name: "Floor drain", x0: 34.25, z0: 96.25, x1: 35.75, z1: 97.75 },   /* cleaning store, at the mop sink */
      { name: "Bin wash trench", x0: 107.5, z0: 31, x1: 108.5, z1: 99 }      /* outer edge of the bin wash pad, which slopes to it */
    ],
    /* fit-out: the J/E wrapper turned end for end (infeed at the cooler end, fed straight from harvest staging) and
       the Keiki tables in one row beside it, as [centre x, centre z, size along x, size along z] */
    lineFlip: true,
    feedFromStaging: true,
    scale: [7, 36.5],
    stage: [[14, 36], [18.5, 36]],
    tables: [[29, 35, 6, 3], [29, 42, 6, 3], [29, 49, 6, 3], [29, 56, 6, 3], [29, 63, 6, 3]],
    tablePoints: [[24.5, 35], [24.5, 42], [24.5, 49], [24.5, 56], [24.5, 63]],      /* bins in along the north side */
    tablePointsOut: [[33.5, 35], [33.5, 42], [33.5, 49], [33.5, 56], [33.5, 63]],   /* cases and empties out the south side */
    kpal: [[37.5, 42], [37.5, 56]],
    kempty: [37.5, 63],
    jpal: [[23.5, 71]],          /* hard against the J packing line, beside the outfeed pack table */
    erector: [55, 80],           /* in the box store against the bathroom wall, with the cartons it feeds off */
    boxStage: null,              /* no day's staging by the line: the box store is next to it, open to the pack floor */
    desks: [52, [62, 68, 74]],
    flowSpots: {
      scale: { x: 7, z: 36.5 }, stage: { x: 16, z: 38 }, infeed: { x: 13, z: 41.5 },
      jpack: { x: 23.5, z: 66.5 }, jpalsp: { x: 27.5, z: 71 }, erector: { x: 55, z: 74 },
      kpalsp: { x: 37.5, z: 49 }, kempty: { x: 37.5, z: 66.5 }
    }
  },

  fert80: {
    id: "fert80", building: "fert", shape: "A", name: "Fert Room & Storage", W: 80, D: 100, eave: 17, color: "#A9702B",
    lightBand: [14, 16.5],   /* translucent light panels round the top of all four walls, under the eave */
    drains: [
      { name: "Trench drain, forklift grade", x0: 2, z0: 89.5, x1: 51, z1: 90.5 },   /* along the front of the skid and tanks, stopping just past the last tank */
      { name: "Sump", x0: 51, z0: 88.5, x1: 54, z1: 91.5 }      /* fert rinse to a sump, not the septic */
    ],            /* along the ridge; the packhouse has none, its roof and walls are insulated */
    rooms: [
      { id: "dry", name: "Dry storage", tone: "--flow-box", x0: 0, x1: 80, z0: 0, z1: 70,
        note: "Eight rack lines run east–west on 12 ft counterbalance aisles, 6 bays each, two high on the floor plus one shelf, and the line on the north wall runs on to the east wall, 8 bays: 300 positions against 204 needed (three months after the expansion). 16 ft staging behind the docks." },
      { id: "fert", name: "Fertigator and fert storage", short: "Fert room", tone: "--survey", x0: 0, x1: 80, z0: 70, z1: 100,
        note: "The fertigator skid at the west end of the south wall, the six tanks east of it. Block-stacked lanes two-high, 88 positions against 71 needed. Partition to the roof, no curb." }
    ],
    partitions: [
      { axis: "z", at: 70, from: 0, to: 80, h: "eave", holes: [[3, 11, 0, 10]] }
    ],
    openings: [
      { mark: "D1", type: "dock", face: "N", a: 63.5, b: 71.5, h: 9, size: "8 × 9 ft", room: "Dry storage",
        detail: "48 in dock square to the wall, manual leveller and dock shelter, on the south part of the east wall (site map), where grade is lowest, its apron 4 ft below the floor. This one does not need the packhouse's angle: its 115 ft apron fits straight out, so the container backs in square and the forklift runs straight into dry storage. Container drops of packaging and fertiliser. Auto" },
      { mark: "D2", type: "dock", truck: "box", face: "N", a: 8, b: 16, h: 9, size: "8 × 9 ft", room: "Dry storage",
        detail: "Box-truck dock on the north part of the east wall (site map), its apron 4 ft below the floor like D1, manual leveller and dock shelter. The weekly box truck backs in and is loaded straight off the dock. Auto" },
      { mark: "P1", type: "door", face: "E", a: 2, b: 5, h: 7, size: "3 × 7 ft", room: "Dry storage",
        detail: "Egress on the south wall (site map) at its east end, out of the dock staging area" },
      { mark: "R1", type: "rollup", forklift: true, face: "W", a: 74, b: 82, h: 10, size: "8 × 10 ft", room: "Fert room",
        detail: "Forklift roll-up at grade on the fert room's north wall (site map), facing the packhouse across the lane. Boxes come out of dry storage through I1 and leave here for the packhouse's R3. No trucks" },
      { mark: "P3", type: "door", face: "W", a: 85, b: 88, h: 7, size: "3 × 7 ft", room: "Fert room",
        detail: "Second exit from the fert room, beside R1 on the north wall: swings out, panic bar" },
      { mark: "V1", type: "louvre", face: "E", a: 90, b: 94, h: 5, sill: 2, size: "4 × 3 ft", room: "Fert room",
        detail: "Low intake for the gable-end exhaust fans F1 and F2" },
      { mark: "F1", type: "louvre", fan: true, face: "S", a: 22, b: 25.5, h: 13.5, sill: 10, size: "36 in fan", room: "Fert room",
        detail: "Exhaust fan high in the fert room's gable end (west wall on the site map), about 10,000 cfm, under the light band. Air comes in low through V1 and the doors" },
      { mark: "F2", type: "louvre", fan: true, face: "S", a: 56, b: 59.5, h: 13.5, sill: 10, size: "36 in fan", room: "Fert room",
        detail: "Second exhaust fan in the fert room's gable end, beside the last tank. With F1, about 8 air changes an hour" },
      { mark: "F3", type: "louvre", fan: true, face: "N", a: 30, b: 33.5, h: 13.5, sill: 10, size: "36 in fan", room: "Dry storage",
        detail: "Exhaust fan high in dry storage's gable end (east wall on the site map, over the truck court), between the docks, under the light band. About 10,000 cfm" },
      { mark: "F4", type: "louvre", fan: true, face: "N", a: 46, b: 49.5, h: 13.5, sill: 10, size: "36 in fan", room: "Dry storage",
        detail: "Second exhaust fan in dry storage's gable end, between the docks. With F3, about 4 air changes an hour in dry storage" },
      { mark: "I1", type: "internal", face: "I", a: 3, b: 11, h: 10, size: "8 × 10 ft", room: "Partition",
        detail: "Store to fert room, forklift route. Flagged pending the separation rating" }
    ]
  }
};

/* Layout variants, for comparing options side by side on the 3D page (its Layout dropdown). A variant is a copy
   of a base layout with some rooms, doors or fit-out moved; it keeps the base's id, so the site map, the page copy
   and the flow routes all treat it as the same building. Keyed "<base>~<variant>". */
(function(L){
  function variant(base, key, label, note, patch){
    var v = JSON.parse(JSON.stringify(L[base]));
    patch(v);
    v.variant = key; v.variantLabel = label; v.variantNote = note;
    L[base + "~" + key] = v;
  }
  L.fert80.variantLabel = "As drawn";

  variant("fert80", "i1east", "I1 beside the dock",
    "I1 moves to the east end of the partition, in line with the D1 aisle, so fertiliser runs straight down from the dock. " +
    "The pick and build area moves with it. The lane along the partition shortens to stay clear of I1: 84 positions instead of 88.",
    function(v){
      v.partitions[0].holes = [[64, 72, 0, 10]];
      v.openings.forEach(function(o){ if (o.mark === "I1"){ o.a = 64; o.b = 72; } });
      v.rooms[1].note = v.rooms[1].note.replace("88 positions", "84 positions");
      v.fit = { lanes: [{ x0: 2, z0: 70.5, nx: 15, nz: 2, face: "+z" }, { x0: 54, z0: 90.5, nx: 6, nz: 2, face: "-z" }] };
      v.flowSpots = { pick: { x: 67, z: 84 } };
    });
})(window.PH_LAYOUTS);
