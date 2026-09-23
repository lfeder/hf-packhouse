/* Room and opening layouts for the two 8,000 ft2 packhouse buildings.
   Shared by site-placement.html (plan on the site) and packhouses-3d.html (3D models).

   Local frame, both buildings: x runs 0..W across the 50 ft width (west to east),
   z runs 0..D down the 160 ft length (north to south), drawing frame of CEAd Option 5.
   Faces: N at z=0, S at z=D, W at x=0, E at x=W. An opening's a/b run along its face
   (x for N/S, z for E/W); h is head height, sill is the bottom above slab.
   Docks sit on the north face of both buildings so each gets its own 130 ft truck apron.
   Two footprints per building: shape "B" 160 × 50 (keys ph, fert), shape "A" 100 × 80 (keys ph80, fert80). */

window.PH_LAYOUTS = {
  ph: {
    id: "ph", building: "ph", shape: "B", name: "Packhouse", W: 50, D: 160, eave: 17, color: "#3B7645",
    rooms: [
      { id: "cold", name: "Cold storage", tone: "--flow-box", x0: 0, x1: 50, z0: 0, z1: 40,
        note: "Finished goods at 50–55 °F on the dock end. 38 floor positions in two double rows, the inner row shortened to keep the aisle to R2 clear, 12 ft staging behind the docks. Insulated panel walls, full height." },
      { id: "pack", name: "Pack room", tone: "--flow-crop", x0: 0, x1: 50, z0: 40, z1: 100,
        note: "Grading and pack line running north to the cooler, packing stations both sides. Epoxy floor." },
      { id: "recv", name: "Harvest receiving", short: "Receiving", tone: "--flow-dry", x0: 25, x1: 50, z0: 100, z1: 160,
        note: "Bins in off the harvest mini-trucks through R1, buffered here before the line. Open to the pack room." },
      { id: "bath1", name: "Bathroom 1", short: "Bath 1", tone: "--ink-3", x0: 0, x1: 8, z0: 100, z1: 108,
        note: "8 × 8 ft single-user bathroom, toilet and sink, door from the pack room." },
      { id: "bath2", name: "Bathroom 2", short: "Bath 2", tone: "--ink-3", x0: 8, x1: 16, z0: 100, z1: 108,
        note: "8 × 8 ft single-user bathroom, toilet and sink, door from the pack room." },
      { id: "jan", name: "Janitor", short: "Jan", tone: "--ink-3", x0: 16, x1: 25, z0: 100, z1: 108,
        note: "Mop sink and cleaning supplies, door from the pack room." },
      { id: "lockers", name: "Lockers", tone: "--ink-3", x0: 0, x1: 25, z0: 108, z1: 120,
        note: "Staff lockers and PPE, opening off the break room. 12 ft ceiling." },
      { id: "break", name: "Break room", tone: "--survey", x0: 0, x1: 25, z0: 120, z1: 160,
        note: "Staff entry P2 on the south face, away from the truck side. 12 ft ceiling." }
    ],
    partitions: [
      { axis: "z", at: 40, from: 0, to: 50, h: "eave", holes: [[20, 30, 0, 10]] },
      { axis: "z", at: 100, from: 0, to: 25, h: 12, holes: [[2.5, 5.5, 0, 7], [10.5, 13.5, 0, 7], [19, 22, 0, 7]] },
      { axis: "z", at: 108, from: 0, to: 25, h: 12, holes: [] },
      { axis: "z", at: 120, from: 0, to: 25, h: 12, holes: [[15, 21, 0, 7]] },
      { axis: "x", at: 8, from: 100, to: 108, h: 12, holes: [] },
      { axis: "x", at: 16, from: 100, to: 108, h: 12, holes: [] },
      { axis: "x", at: 25, from: 100, to: 160, h: 12, holes: [[140, 144, 0, 7]] }
    ],
    openings: [
      { mark: "D1", type: "dock", face: "N", a: 4, b: 13, h: 10, size: "9 × 10 ft", room: "Cold storage",
        detail: "48 in dock with leveller and shelter. 40 and 45 ft containers out. Auto" },
      { mark: "D2", type: "dock", face: "N", a: 17, b: 26, h: 10, size: "9 × 10 ft", room: "Cold storage",
        detail: "48 in dock with leveller and shelter. Auto" },
      { mark: "P1", type: "door", face: "N", a: 28.5, b: 31.5, h: 7, size: "3 × 7 ft", room: "Cold storage",
        detail: "Egress from the cooler, clear of the truck well" },
      { mark: "R2", type: "rollup", face: "W", a: 26, b: 38, h: 14, size: "12 × 14 ft", room: "Cold storage",
        detail: "At grade, on the cooler's long wall at the end away from the docks. On the docks-south site layout that is the east wall at the cooler's north end, where grade is highest. Box trucks going out, loaded straight from the cooler. Auto" },
      { mark: "R1", type: "rollup", face: "S", a: 32, b: 44, h: 14, size: "12 × 14 ft", room: "Harvest receiving",
        detail: "At grade. Harvest mini-trucks coming in from the grows. Auto" },
      { mark: "P2", type: "door", face: "S", a: 8, b: 11, h: 7, size: "3 × 7 ft", room: "Break room",
        detail: "Staff entry and egress" },
      { mark: "P3", type: "door", face: "E", a: 68, b: 71, h: 7, size: "3 × 7 ft", room: "Pack room",
        detail: "Egress from the pack room" }
    ]
  },

  fert: {
    id: "fert", building: "fert", shape: "B", name: "Fert Room & Storage", W: 50, D: 160, eave: 17, color: "#A9702B",
    rooms: [
      { id: "dry", name: "Dry storage", tone: "--flow-box", x0: 0, x1: 50, z0: 0, z1: 118,
        note: "Six rack lines run the length on 9.3 ft reach-truck aisles, 11 bays each, two high on the floor plus one shelf: 396 positions against 204 needed (three months after the expansion). 16 ft staging behind the dock." },
      { id: "fert", name: "Fertigator and fert storage", short: "Fert room", tone: "--survey", x0: 0, x1: 50, z0: 118, z1: 160,
        note: "Six tanks in a line along the south wall, skid in the corner. Block-stacked lanes two-high, 90 positions against 71 needed. Partition to the roof, no curb." }
    ],
    partitions: [
      { axis: "z", at: 118, from: 0, to: 50, h: "eave", holes: [[2, 12, 0, 10]] }
    ],
    openings: [
      { mark: "D1", type: "dock", face: "N", a: 6, b: 15, h: 10, size: "9 × 10 ft", room: "Dry storage",
        detail: "48 in dock with leveller and shelter. Container drops of packaging and fertiliser. Auto" },
      { mark: "R1", type: "rollup", face: "N", a: 22, b: 34, h: 14, size: "12 × 14 ft", room: "Dry storage",
        detail: "At grade. Box trucks going out. Auto" },
      { mark: "P1", type: "door", face: "N", a: 40, b: 43, h: 7, size: "3 × 7 ft", room: "Dry storage",
        detail: "Egress, clear of the truck well" },
      { mark: "P2", type: "door", face: "E", a: 60, b: 63, h: 7, size: "3 × 7 ft", room: "Dry storage",
        detail: "Egress" },
      { mark: "C1", type: "door", face: "S", a: 38, b: 41, h: 7, size: "3 × 7 ft", room: "Fert room",
        detail: "Exterior only" },
      { mark: "V1", type: "louvre", face: "E", a: 128, b: 132, h: 5, sill: 2, size: "4 × 3 ft", room: "Fert room",
        detail: "Low intake. High exhaust above it at 10–13 ft" },
      { mark: "V2", type: "louvre", face: "E", a: 128, b: 132, h: 13, sill: 10, size: "4 × 3 ft", room: "Fert room",
        detail: "High exhaust fan", hideTag: true },
      { mark: "I1", type: "internal", face: "I", a: 2, b: 12, h: 10, size: "10 × 10 ft", room: "Partition",
        detail: "Store to fert room, forklift route. Flagged pending the separation rating" }
    ]
  },

  /* ---------------- 100 × 80 ft: 80 across (x), 100 deep (z), docks on the 80 ft north face ---------------- */
  ph80: {
    id: "ph80", building: "ph", shape: "A", name: "Packhouse", W: 80, D: 100, eave: 17, color: "#3B7645",
    rooms: [
      { id: "cold", name: "Cold storage", tone: "--flow-box", x0: 0, x1: 80, z0: 0, z1: 30,
        note: "Finished goods at 50–55 °F across the whole dock face. 60 floor positions block-stacked 4 deep off a 12 ft dock aisle, clear of the route to the pack-room door. Insulated panel walls, full height." },
      { id: "pack", name: "Pack room", tone: "--flow-crop", noTag: true, x0: 0, x1: 80, z0: 30, z1: 75,
        note: "Japanese / English packing machine (one machine for both) in the vendor's 36 × 36 ft cell in the north half of the room, infeed on the receiving side, with the five 6 × 3 ft Keiki tables in the same half and the box erector against the cooler wall. Beside the erector, against the cooler wall, an 8 × 8 ft box and bag staging spot holds a day's supply: a pallet each of Keiki and Japanese boxes, off-grade boxes, and a shelf of bags, topped up daily from the fert building through R3. A clear 28 × 16 ft palletizing area with the pallet wrapper against the cooler wall just north of the cooler door (site map), 3 desks on the north wall of the bathroom and storage block, hand-wash sinks at each entry. Epoxy floor." },
      { id: "recv", name: "Harvest receiving", short: "Receiving", tone: "--flow-dry", x0: 0, x1: 48, z0: 75, z1: 100,
        note: "One greenhouse is harvested at a time, so this holds a pallet or two: pallets of 36 bins come off the box truck through R1 on the north wall, over the floor scale, to a staging spot by the line, and staff carry the bins to the Keiki tables and the machine infeed. Open to the pack room." },
      { id: "bath1", name: "Bathroom 1", short: "Bath 1", tone: "--ink-3", x0: 48, x1: 56, z0: 75, z1: 83,
        note: "8 × 8 ft single-user bathroom, toilet and sink, door from the pack room." },
      { id: "bath2", name: "Bathroom 2", short: "Bath 2", tone: "--ink-3", x0: 56, x1: 64, z0: 75, z1: 83,
        note: "8 × 8 ft single-user bathroom, toilet and sink, door from the pack room." },
      { id: "store", name: "Storage", tone: "--ink-3", x0: 48, x1: 64, z0: 83, z1: 100,
        note: "Behind the bathrooms: lockers, PPE, cleaning supplies and a mop sink. Doors from receiving and the break room." },
      { id: "break", name: "Break room", tone: "--survey", x0: 64, x1: 80, z0: 75, z1: 100,
        note: "16 ft wide to line up with the bathroom and locker block; seats 20. Staff entry P2 on the west wall. 12 ft ceiling." }
    ],
    partitions: [
      { axis: "z", at: 30, from: 0, to: 80, h: "eave", holes: [[59, 69, 0, 10]] },
      { axis: "z", at: 75, from: 48, to: 80, h: 12, holes: [[50.5, 53.5, 0, 7], [58.5, 61.5, 0, 7], [70, 74, 0, 7]] },
      { axis: "x", at: 56, from: 75, to: 83, h: 12, holes: [] },
      { axis: "z", at: 83, from: 48, to: 64, h: 12, holes: [] },
      { axis: "x", at: 48, from: 75, to: 100, h: 12, holes: [[90, 94, 0, 7]] },
      { axis: "x", at: 64, from: 75, to: 100, h: 12, holes: [[88, 92, 0, 7]] }
    ],
    openings: [
      { mark: "P1", type: "door", face: "N", a: 46, b: 49, h: 7, size: "3 × 7 ft", room: "Cold storage",
        detail: "Egress from the cooler, clear of the truck well" },
      { mark: "D2", type: "dock", face: "N", a: 52, b: 61, h: 10, angle: 22.5, seal: 1.5, size: "9 × 10 ft", room: "Cold storage",
        detail: "48 in dock in an insulated dock house angled about 22° toward the south, leveller and seal, on the low end of the dock face. Auto" },
      { mark: "D1", type: "dock", face: "N", a: 65, b: 74, h: 10, angle: 22.5, seal: 1.5, size: "9 × 10 ft", room: "Cold storage",
        detail: "48 in dock in an insulated dock house angled about 22° toward the south, leveller and seal. 40 and 45 ft containers out. Auto" },
      { mark: "P2", type: "door", face: "S", a: 70, b: 73, h: 7, size: "3 × 7 ft", room: "Break room",
        detail: "Staff entry and egress" },
      { mark: "R2", type: "rollup", face: "W", a: 1, b: 13, h: 14, size: "12 × 14 ft", room: "Cold storage",
        detail: "At grade on the north wall (site map), the high side, straight into the cooler's dock aisle. Box trucks going out. Auto" },
      { mark: "R1", type: "rollup", face: "W", a: 84, b: 96, h: 14, size: "12 × 14 ft", room: "Harvest receiving",
        detail: "At grade on the west side of the north wall (site map). Box trucks bringing cucumbers in from the grows. Auto" },
      { mark: "P3", type: "door", face: "E", a: 50, b: 53, h: 7, size: "3 × 7 ft", room: "Pack room",
        detail: "Pack room door on the south wall, straight onto the covered bin wash" },
      { mark: "R3", type: "rollup", face: "E", a: 58, b: 68, h: 10, forklift: true, size: "10 × 10 ft", room: "Pack room",
        detail: "Forklift roll-up on the south wall (site map), just west of P3 and 20 ft from the box erector, clear of the pallet wrapper inside and the bin washer outside: boxes and bags come in from the fert building across the lane and the bin wash pad. No trucks" }
    ],
    /* outdoor areas, local coords; x > W is outside the E face (south wall on the site map) */
    outdoor: [
      { id: "binwash", name: "Bin wash", x0: 80, x1: 110, z0: 16, z1: 82, roof: 14,
        note: "Covered bin wash, 66 ft along the south wall × 30 ft out (1,980 ft²) under an open awning, in the 50 ft gap between the packhouse and the fert building, leaving a 20 ft lane. Sloped pad to a trench drain, hot water. The pack room door opens onto it, and forklifts cross it to R3 with boxes from the fert building. Clean bins are stacked outside here for the harvest trucks." }
    ]
  },

  fert80: {
    id: "fert80", building: "fert", shape: "A", name: "Fert Room & Storage", W: 80, D: 100, eave: 17, color: "#A9702B",
    rooms: [
      { id: "dry", name: "Dry storage", tone: "--flow-box", x0: 0, x1: 80, z0: 0, z1: 70,
        note: "Eight rack lines run north–south on 12 ft counterbalance aisles, 6 bays each, two high on the floor plus one shelf: 288 positions against 204 needed (three months after the expansion). 16 ft staging behind the dock." },
      { id: "fert", name: "Fertigator and fert storage", short: "Fert room", tone: "--survey", x0: 0, x1: 80, z0: 70, z1: 100,
        note: "Six tanks and the skid along the south wall. Block-stacked lanes two-high, 88 positions against 71 needed. Partition to the roof, no curb." }
    ],
    partitions: [
      { axis: "z", at: 70, from: 0, to: 80, h: "eave", holes: [[2, 12, 0, 10]] }
    ],
    openings: [
      { mark: "R1", type: "rollup", face: "N", a: 6, b: 18, h: 14, size: "12 × 14 ft", room: "Dry storage",
        detail: "At grade on the north part of the east wall (site map), the high end. Box trucks going out. Auto" },
      { mark: "P1", type: "door", face: "N", a: 24, b: 27, h: 7, size: "3 × 7 ft", room: "Dry storage",
        detail: "Egress, clear of the truck well" },
      { mark: "D1", type: "dock", face: "N", a: 63, b: 72, h: 10, size: "9 × 10 ft", room: "Dry storage",
        detail: "48 in dock square to the wall, leveller and seal, on the south part of the east wall (site map), where grade is lowest. This one does not need the packhouse's angle: its 115 ft apron fits straight out, so the container backs in square and the forklift runs straight into dry storage. Container drops of packaging and fertiliser. Auto" },
      { mark: "P2", type: "door", face: "E", a: 40, b: 43, h: 7, size: "3 × 7 ft", room: "Dry storage",
        detail: "Egress" },
      { mark: "C1", type: "door", face: "E", a: 74, b: 77, h: 7, size: "3 × 7 ft", room: "Fert room",
        detail: "Exterior only" },
      { mark: "V1", type: "louvre", face: "E", a: 90, b: 94, h: 5, sill: 2, size: "4 × 3 ft", room: "Fert room",
        detail: "Low intake. High exhaust above it at 10–13 ft" },
      { mark: "V2", type: "louvre", face: "E", a: 90, b: 94, h: 13, sill: 10, size: "4 × 3 ft", room: "Fert room",
        detail: "High exhaust fan", hideTag: true },
      { mark: "I1", type: "internal", face: "I", a: 2, b: 12, h: 10, size: "10 × 10 ft", room: "Partition",
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
  L.ph80.variantLabel = "As drawn";

  variant("ph80", "packrecv", "Harvest door into the pack room",
    "The harvest box-truck door R1 moves into the pack room, as far east on the north wall as the room goes: against the " +
    "cooler wall, 17 ft west of R2. The scale sits just inside it and harvest staging in the gap between the J/E " +
    "wrapper's outfeed end and the Keiki tables, so the tables are closest. J/E bins still go to the wrapper's infeed at " +
    "its west end. The old receiving room is no longer needed: 1,200 ft² of spare floor.",
    function(v){
      v.variantLede = "Cooler across the whole 80 ft dock face and the pack room through the middle, with the harvest truck door opening straight into the pack room. The band along the far wall keeps the bathrooms, storage and break room; the old receiving floor is spare.";
      v.rooms.forEach(function(r){
        if (r.id === "recv"){
          r.name = "Spare floor"; r.short = "Spare"; r.tone = "--ink-3";
          r.note = "Harvest no longer comes in here. Free for storage, a bigger break room, or more pack floor.";
        }
      });
      v.openings.forEach(function(o){
        if (o.mark === "R1"){
          o.a = 30.5; o.b = 42.5; o.room = "Pack room";
          o.detail = "At grade on the north wall (site map), at the east end of the pack room against the cooler wall, 17 ft west of R2. Box trucks bringing cucumbers in from the grows, straight into the pack room. Auto";
        }
      });
      v.scale = [7, 36.5];
      v.stage = [[21.5, 34.5], [21.5, 39]];
      v.flowSpots = { scale: { x: 7, z: 36.5 }, stage: { x: 23.5, z: 37 } };
    });

  function ONE_ROW(v){
      v.variantLede = "Cooler across the dock face; harvest comes into the pack room at its east end by the cooler door, and the J/E wrapper runs east to west, boxing Js at its outfeed onto a pallet at the edge of the old receiving room. Boxes are stored and made on the pack room's west wall, and the Keiki tables form one row beside the wrapper.";
      v.rooms.forEach(function(r){
        if (r.id === "recv"){
          r.name = "J/E pallet and spare floor"; r.short = "J/E pallet"; r.tone = "--flow-dry";
          r.note = "Holds the J/E pallet space by the wrapper's outfeed pack table. The rest is spare floor.";
        }
      });
      v.openings.forEach(function(o){
        if (o.mark === "R1"){
          o.a = 30.5; o.b = 42.5; o.room = "Pack room";
          o.detail = "At grade on the north wall (site map), at the east end of the pack room by the cooler door. Box trucks bringing cucumbers in from the grows. Auto";
        }
      });
      v.lineFlip = true;
      v.feedFromStaging = true;   /* no infeed pallet: J/E bins go from harvest staging straight into the infeed conveyor */
      v.scale = [7, 36.5];
      v.stage = [[14, 36], [18.5, 36]];
      /* the row starts 3 ft off the cooler wall, next to harvest staging */
      v.tables = [[29, 35, 6, 3], [29, 42, 6, 3], [29, 49, 6, 3], [29, 56, 6, 3], [29, 63, 6, 3]];
      v.tablePoints = [[24.5, 35], [24.5, 42], [24.5, 49], [24.5, 56], [24.5, 63]];      /* bins in along the north side */
      v.tablePointsOut = [[33.5, 35], [33.5, 42], [33.5, 49], [33.5, 56], [33.5, 63]];   /* cases and empties out the south side */
      v.kpal = [[37.5, 42], [37.5, 56]];
      v.kempty = [37.5, 63];
      v.erector = [43, 72];     /* on the pack room's west wall, well south of the wrapper, toward R3 where boxes arrive */
      v.boxStage = [40, 59];    /* just east of the erector */
      v.jpal = [[14, 79]];
      v.flowSpots = {
        scale: { x: 7, z: 36.5 }, stage: { x: 16, z: 38 }, infeed: { x: 13, z: 41.5 },
        jpack: { x: 19.5, z: 75.5 }, jpalsp: { x: 18.5, z: 79 }, erector: { x: 36.5, z: 72 },
        kpalsp: { x: 37.5, z: 49 }, kempty: { x: 37.5, z: 66.5 }
      };
  }
  variant("ph80", "onerow", "Keiki tables in one row",
    "Harvest comes in at the east end of the pack room, by the cooler door: R1 on the north wall, the scale and harvest " +
    "staging just inside. The J/E wrapper turns end for end so its infeed is at that end, fed straight from staging, and its outfeed at the west end, " +
    "where the pack table boxes the wrapped Js onto one pallet space. The box erector and the day's boxes stand on the " +
    "pack room's west wall, beside the pack table and the end of the Keiki row. The five " +
    "Keiki tables line up in one row, fed along their north side, with two pallet spaces for packed cases and the " +
    "empty-bin pallet just south of them. Full pallets go through the wrapper beside the cooler door. The old receiving " +
    "room keeps only the J/E pallet space; the rest is spare.",
    ONE_ROW);


  /* the same row, with the break room, bathrooms and stores swapped end for end */
  variant("ph80", "onerowswap", "Keiki row, rooms swapped",
    "The one-row layout, with the break room moved to the old cucumber receiving end and the bathrooms flat on the " +
    "north wall with nothing behind them. A cleaning store sits beside them, and the old break room, bathroom and " +
    "storage band becomes an 800 ft² box, bag and label store holding about 28 pallets, open to the pack room with no " +
    "wall between so the forklift can set pallets straight down. Nothing to do with packing is left in the break room: " +
    "the J/E pallet space moves into the pack room beside the outfeed pack table.",
    function(v){
      ONE_ROW(v);
      v.variantLede = "Cooler across the dock face; harvest comes into the pack room at its east end by the cooler door and the J/E wrapper runs east to west. The Keiki tables form one row beside it, the break room and bathrooms take the old cucumber receiving end, and the old break room band becomes the box, bag and label store.";
      /* break room and bathrooms move to the old cucumber receiving end, bathrooms flat on the north wall with
         nothing behind them; the old break room, bathroom and storage band becomes the box, bag and label store */
      v.roomsWest = true;
      v.desks = [52, [62, 68, 74]];
      v.jpal = [[23.5, 71]];      /* out of the break room and hard against the J packing line, beside the outfeed pack table */
      v.boxStage = null;          /* no day's staging by the line: the box store is next to it, open to the pack floor */
      v.erector = [55, 80];       /* in the store, against the south side of the wall to the break room, with the cartons it feeds off */
      v.flowSpots = Object.assign({}, v.flowSpots, { erector: { x: 55, z: 74 } });
      v.flowSpots = Object.assign({}, v.flowSpots, { jpack: { x: 23.5, z: 66.5 }, jpalsp: { x: 27.5, z: 71 } });   /* both on the pack room side of the new wall */
      v.rooms = v.rooms.slice(0, 2).concat([
        { id: "bath1", name: "Bathroom 1", short: "Bath 1", tone: "--ink-3", x0: 0, x1: 8, z0: 75, z1: 83,
          note: "8 × 8 ft single-user bathroom on the north wall, door from the break room." },
        { id: "bath2", name: "Bathroom 2", short: "Bath 2", tone: "--ink-3", x0: 0, x1: 8, z0: 83, z1: 91,
          note: "8 × 8 ft single-user bathroom on the north wall, door from the break room." },
        { id: "clean", name: "Cleaning store", short: "Cleaning", tone: "--ink-3", x0: 0, x1: 8, z0: 91, z1: 100,
          note: "72 ft² for cleaning supplies and the mop sink, door from the break room." },
        { id: "break", name: "Break room", tone: "--survey", x0: 8, x1: 48, z0: 75, z1: 100,
          note: "1,000 ft² at the west end where cucumber receiving used to be, with the lockers along its west wall and staff entry P2 on the west wall." },
        { id: "store", name: "Box, bag and label store", short: "Box store", tone: "--flow-box", x0: 48, x1: 80, z0: 75, z1: 100,
          note: "800 ft² where the break room, bathrooms and storage used to be, open to the pack room with no wall between: the forklift comes in R3 and sets pallets straight down. A 2-deep lane of boxes and bags two high (28 pallets) off a 12 ft aisle, with shelving for labels and small supplies. The day's boxes still stage by the line." }
      ]);
      v.partitions = [
        { axis: "z", at: 75, from: 0, to: 48, h: 12, holes: [[20, 24, 0, 7]] },   /* break room door; the box store has no wall to the pack room */
        { axis: "x", at: 8, from: 75, to: 100, h: 12, holes: [[77, 80, 0, 7], [85, 88, 0, 7], [94, 97, 0, 7]] },
        { axis: "z", at: 83, from: 0, to: 8, h: 12, holes: [] },
        { axis: "z", at: 91, from: 0, to: 8, h: 12, holes: [] },
        { axis: "x", at: 48, from: 75, to: 100, h: 12, holes: [] }
      ];
      v.openings.forEach(function(o){ if (o.mark === "P2"){ o.a = 20; o.b = 23; o.room = "Break room"; o.detail = "Staff entry and egress into the break room"; } });
    });

  variant("fert80", "i1east", "I1 beside the dock",
    "I1 moves to the east end of the partition, in line with the D1 aisle, so fertiliser runs straight down from the dock. " +
    "The pick and build area moves with it. The lane along the partition shortens to stay clear of I1: 84 positions instead of 88.",
    function(v){
      v.partitions[0].holes = [[63, 73, 0, 10]];
      v.openings.forEach(function(o){ if (o.mark === "I1"){ o.a = 63; o.b = 73; } });
      v.rooms[1].note = v.rooms[1].note.replace("88 positions", "84 positions");
      v.fit = { lanes: [{ x0: 2, z0: 70.5, nx: 15, nz: 2, face: "+z" }, { x0: 54, z0: 90.5, nx: 6, nz: 2, face: "-z" }] };
      v.flowSpots = { pick: { x: 67, z: 84 } };
    });

  variant("fert80", "southfert", "Fert room along the south wall",
    "The fert room becomes a 20 ft strip along the whole south wall (2,000 ft², was 2,400) and dry storage the north 60 ft " +
    "(6,000 ft², was 5,600). D1 stays where it was, which puts it in the fert room: fertiliser goes straight in, and boxes " +
    "cross the east end of the fert room to I1, right beside the dock. The fert room's lane along the south wall holds 60 pallets two high, short " +
    "of the 71 a three-month stock needs; dry storage gains room, with 324 positions against 204. P2 moves to the west wall " +
    "and C1 to the east end of the south wall, clear of the stacks.",
    function(v){
      v.variantLede = "Dry storage takes the north 60 ft on standard counterbalance aisles, the fert room a 20 ft strip along the whole south wall behind a full-height partition. A 6,000 / 2,000 split.";
      v.rooms[0].x1 = 60; v.rooms[0].z1 = 100;
      v.rooms[0].note = "Six rack lines run east–west on 12 ft counterbalance aisles, 9 bays each, two high on the floor plus one shelf: 324 positions against 204 needed (three months after the expansion). Boxes come in from D1 through I1, off the aisle inside the east wall.";
      v.rooms[1].x0 = 60; v.rooms[1].z0 = 0;
      v.rooms[1].note = "A 20 ft strip along the whole south wall. One block-stacked lane along the wall, 2 deep and two high: 60 positions against 71 needed. Six tanks in two rows and the skid at the west end. Partition to the roof, no curb.";
      v.partitions = [{ axis: "x", at: 60, from: 0, to: 100, h: "eave", holes: [[3, 13, 0, 10]] }];
      v.openings.forEach(function(o){
        if (o.mark === "I1"){ o.a = 3; o.b = 13; }
        if (o.mark === "C1"){ o.a = 14.5; o.b = 17.5; }
        if (o.mark === "P2"){ o.face = "S"; o.a = 10; o.b = 13; o.detail = "Egress, on the west wall at the end of the north aisle"; }
      });
      v.fit = {
        lines: [2, 17.5, 21, 36.5, 40, 55.5], z0: 16, bays: 9,
        lanes: [{ x0: 72, z0: 18, nx: 2, nz: 15, face: "-x" }],
        tanks: [[64, 90.5], [70, 90.5], [76, 90.5], [64, 96.5], [70, 96.5], [76, 96.5]],
        skid: [75, 83, 8, 5]
      };
      v.flowSpots = { pick: { x: 76, z: 12 }, tanks: { x: 65, z: 84 } };   /* pick and build in the corner beside D1, clear of the dock */
    });
})(window.PH_LAYOUTS);
