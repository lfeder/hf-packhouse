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
        note: "Six rack lines run the length on 9.3 ft reach-truck aisles, 11 bays each, two high on the floor plus one shelf: 396 positions against 357 needed. 16 ft staging behind the dock." },
      { id: "fert", name: "Fertigator and fert storage", short: "Fert room", tone: "--survey", x0: 0, x1: 50, z0: 118, z1: 160,
        note: "Six tanks in a line along the south wall, skid in the corner. Block-stacked lanes two-high, 90 positions against 77 needed. Bunded, partition to the roof." }
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
        detail: "Exterior only, containment curb at the threshold" },
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
      { id: "pack", name: "Pack room", tone: "--flow-crop", x0: 0, x1: 80, z0: 30, z1: 75,
        note: "Japanese / English packing machine (one machine for both) in the vendor's 36 × 36 ft cell in the north half of the room, infeed on the receiving side, with the five 8 × 4 ft Keiki tables and the box erector in the same half. A clear 28 × 16 ft palletizing area with the pallet wrapper in front of the cooler door, 3 desks on the north wall of the bathroom and storage block, hand-wash sinks at each entry. Epoxy floor." },
      { id: "recv", name: "Harvest receiving", short: "Receiving", tone: "--flow-dry", x0: 0, x1: 48, z0: 75, z1: 100,
        note: "Cucumber bins in off the box trucks through R1 on the north wall, buffered here before the line. Open to the pack room." },
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
        detail: "Pack room door on the south wall, straight onto the covered bin wash" }
    ],
    /* outdoor areas, local coords; x > W is outside the E face (south wall on the site map) */
    outdoor: [
      { id: "binwash", name: "Bin wash", x0: 80, x1: 110, z0: 16, z1: 82, roof: 14,
        note: "Covered bin wash, 66 ft along the south wall × 30 ft out (1,980 ft²) under an open awning, in the 50 ft gap between the packhouse and the fert building, leaving a 20 ft lane. Sloped pad to a trench drain, hot water. The pack room door opens onto it." }
    ]
  },

  fert80: {
    id: "fert80", building: "fert", shape: "A", name: "Fert Room & Storage", W: 80, D: 100, eave: 17, color: "#A9702B",
    rooms: [
      { id: "dry", name: "Dry storage", tone: "--flow-box", x0: 0, x1: 80, z0: 0, z1: 70,
        note: "Eight rack lines run north–south on 12 ft counterbalance aisles, 6 bays each, two high on the floor plus one shelf: 288 positions against 357 needed. 16 ft staging behind the dock." },
      { id: "fert", name: "Fertigator and fert storage", short: "Fert room", tone: "--survey", x0: 0, x1: 80, z0: 70, z1: 100,
        note: "Six tanks and the skid along the south wall. Block-stacked lanes two-high, 88 positions against 77 needed. Bunded, partition to the roof." }
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
        detail: "Exterior only, containment curb at the threshold" },
      { mark: "V1", type: "louvre", face: "E", a: 90, b: 94, h: 5, sill: 2, size: "4 × 3 ft", room: "Fert room",
        detail: "Low intake. High exhaust above it at 10–13 ft" },
      { mark: "V2", type: "louvre", face: "E", a: 90, b: 94, h: 13, sill: 10, size: "4 × 3 ft", room: "Fert room",
        detail: "High exhaust fan", hideTag: true },
      { mark: "I1", type: "internal", face: "I", a: 2, b: 12, h: 10, size: "10 × 10 ft", room: "Partition",
        detail: "Store to fert room, forklift route. Flagged pending the separation rating" }
    ]
  }
};
