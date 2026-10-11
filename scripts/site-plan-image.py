"""Build site-plan-option5.jpg, the background of site-placement.html, in the packhouse folder.

Source: sources/site-map-plan.pdf, also in the Supabase `expansion` bucket (CEAd 1725 · 101 · A2 · Option 5).
Render it first with macOS Quick Look:  qlmanage -t -s 8000 -o <dir> sources/site-map-plan.pdf
Then:  python3 scripts/site-plan-image.py <dir>/site-map-plan.pdf.png

At 8000 px tall the sheet is 4.104 px/ft. The crop origin (900, 250) is the (0, 0) of the feet
coordinates in site-placement.html, and the output is scaled 0.45.

The Option 5 SUPPORT block (the old packhouse drawing), its dock bumps and the parked trucks are
erased: the building area is filled with the graded pad that surrounds it and the trucks on the
road are painted road grey.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None
src = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else str(Path(__file__).resolve().parent.parent / "site-plan-option5.jpg")
im = Image.open(src).convert("RGB")
a = np.asarray(im).copy()

# 1. building footprint: SUPPORT block plus its outline and door ticks, filled with the pad
#    around it. White read as a hole in the sheet, so the block is inpainted instead: a Laplace
#    solve carries the neighbouring ground in from the west, north and south (the east edge is the
#    road, which keeps its own hard line), and grain at the surroundings' amplitude keeps the
#    patch from reading as a flat sticker.
X0, X1, Y0, Y1 = 2948, 3393, 2228, 2950
W, H = X1 - X0, Y1 - Y0

def edge(band):
    """median down a boundary band, then a running mean so drawn lines don't print through"""
    v = np.median(band, axis=1)
    k = 41
    c = np.cumsum(np.pad(v, ((k // 2, k // 2), (0, 0)), mode="edge"), axis=0)
    return (c[k:] - c[:-k]) / k

def resample(v, n):
    idx = (np.arange(n) + .5) * len(v) / n
    return np.stack([np.interp(idx, np.arange(len(v)), v[:, c]) for c in range(3)], 1).astype(np.float32)

west = edge(a[Y0:Y1, X0 - 34:X0 - 6].astype(np.float32))
north = edge(a[Y0 - 34:Y0 - 6, X0:X1].astype(np.float32).transpose(1, 0, 2))
south = edge(a[Y1 + 6:Y1 + 34, X0:X1].astype(np.float32).transpose(1, 0, 2))

STEP = 8                                                   # solve coarse: the field is smooth
cw, ch = W // STEP, H // STEP
cwest, cnorth, csouth = resample(west, ch), resample(north, cw), resample(south, cw)
f = np.tile(cwest[:, None, :], (1, cw, 1))
for _ in range(1500):
    p = np.pad(f, ((1, 1), (1, 1), (0, 0)), mode="edge")   # east edge free
    p[0, 1:-1], p[-1, 1:-1], p[1:-1, 0] = cnorth, csouth, cwest
    f = (p[:-2, 1:-1] + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]) / 4
    f[0], f[-1], f[:, 0] = cnorth, csouth, cwest
fill = np.asarray(Image.fromarray(f.clip(0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)).astype(np.float32)

grain = np.random.default_rng(7).normal(128, 40, (H, W)).clip(0, 255).astype(np.uint8)
grain = np.asarray(Image.fromarray(grain).filter(ImageFilter.GaussianBlur(3.0))).astype(np.float32)
grain = (grain - grain.mean()) / grain.std()
FEATHER = 30                                               # grain fades out at the seams
tx = np.clip(np.minimum(np.arange(W), np.arange(W)[::-1]) / FEATHER, 0, 1)
ty = np.clip(np.minimum(np.arange(H), np.arange(H)[::-1]) / FEATHER, 0, 1)
a[Y0:Y1, X0:X1] = (fill + grain[:, :, None] * 7.5 * np.minimum(tx[None, :], ty[:, None])[:, :, None]).clip(0, 255)

# 2. trucks, dock bumps and wall ticks on the road east of the block (north of the block's south wall only)
RX0, RX1, RY0, RY1 = 3393, 3660, 2380, 2950
reg = a[RY0:RY1, RX0:RX1]
g = reg.mean(axis=2)
road = np.median(reg[(g > 110) & (g < 150)], axis=0)
light = Image.fromarray(((g > 150) * 255).astype(np.uint8))
big = light.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(9))    # trucks, not thin lines
mask = np.asarray(big.filter(ImageFilter.MaxFilter(15))) > 0                     # and their outlines
white = Image.fromarray(((g > 225) * 255).astype(np.uint8))
mask |= np.asarray(white.filter(ImageFilter.MaxFilter(9))) > 0                  # leftover cab fragments
mask[:, :40] |= g[:, :40] > 150                                                   # sawtooth dock edge
reg[mask] = road
a[RY0:RY1, RX0:RX1] = reg
tick = a[2228:2950, 3393:3412]
tick[tick.mean(axis=2) < 90] = road                                               # wall ticks on the road edge

# 3. the "AVERAGE FLATTENED AREA ELEV: 2,586.08'" label east of Grow 3, a white box over the ground and the
#    road. The ground is inpainted from the top, bottom and east edges (the west edge is the grow's blue line),
#    then the road is carried straight through between where it enters and leaves the box: grey bed, a light
#    shoulder stripe and the dark edge line, as drawn either side.
LX0, LX1, LY0, LY1 = 3593, 3978, 3886, 4050
lw, lh = LX1 - LX0, LY1 - LY0
top = a[LY0 - 8:LY0 - 2, LX0:LX1].astype(np.float32).mean(axis=0)
bot = a[LY1 + 2:LY1 + 8, LX0:LX1].astype(np.float32).mean(axis=0)
east = a[LY0:LY1, LX1 + 2:LX1 + 8].astype(np.float32).mean(axis=1)
f = np.linspace(0, 1, lh)[:, None, None] * (bot - top)[None] + top[None]
for _ in range(3000):
    p = np.pad(f, ((1, 1), (1, 1), (0, 0)), mode="edge")    # west edge free
    p[0, 1:-1], p[-1, 1:-1], p[1:-1, -1] = top, bot, east
    f = (p[:-2, 1:-1] + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]) / 4
g2 = np.random.default_rng(11).normal(0, 1, (lh, lw))
g2 = np.asarray(Image.fromarray(((g2 * 40) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5.0))).astype(np.float32)
g2 = (g2 - g2.mean()) / g2.std()
patch = (f + g2[:, :, None] * 2.5).clip(0, 255)
L0, R0, L1, R1 = 3836, 3884, 3772, 3828                       # grey bed at the box's top and bottom edges
for y in range(lh):
    t = (y + 0.5) / lh
    l, r = round(L0 + (L1 - L0) * t) - LX0, round(R0 + (R1 - R0) * t) - LX0
    patch[y, l:r + 1] = 128
    patch[y, l - 3:l - 1] = (185, 177, 185); patch[y, r + 1:r + 3] = (185, 177, 185)
    patch[y, l - 5:l - 3] = (50, 48, 49); patch[y, r + 3:r + 5] = (50, 48, 49)
a[LY0:LY1, LX0:LX1] = patch

c = Image.fromarray(a).crop((900, 250, 5400, 7000))
c = c.resize((int(c.width * 0.45), int(c.height * 0.45)), Image.LANCZOS)
c.save(out, quality=78, optimize=True)
Image.fromarray(a).crop((2800, 2100, 3800, 3250)).resize((500, 575)).save(out.replace(".jpg", "-check.png"))
print("wrote", out)
