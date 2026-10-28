"""Render the raster storefront icon used by the plugin marketplace.

The source artwork is original and generated locally with Pillow. The vector
counterpart shipped as `icon.svg` is the plugin's display icon.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets"
OUT.mkdir(exist_ok=True)
S = 1024
SCALE = 4


def lerp(a: int, b: int, t: float) -> int:
    return round(a + (b - a) * t)


def vertical_gradient(size: int) -> Image.Image:
    top = (12, 48, 52)
    bottom = (4, 19, 22)
    image = Image.new("RGB", (1, size))
    pixels = image.load()
    for y in range(size):
        t = y / max(1, size - 1)
        pixels[0, y] = tuple(lerp(top[i], bottom[i], t) for i in range(3))
    return image.resize((size, size))


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


base = vertical_gradient(S).convert("RGBA")

# Ambient radial highlights.
glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((40, -120, 780, 560), fill=(94, 234, 212, 38))
gd.ellipse((520, -120, 1080, 360), fill=(56, 189, 248, 25))
glow = glow.filter(ImageFilter.GaussianBlur(110))
base = Image.alpha_composite(base, glow)

c = S / 2
face_r = 300
rim_w = 17

# Soft halo behind the watch.
halo = Image.new("RGBA", (S, S), (0, 0, 0, 0))
hd = ImageDraw.Draw(halo)
hd.ellipse((c - face_r - 35, c - face_r - 35, c + face_r + 35, c + face_r + 35),
           outline=(94, 234, 212, 160), width=30)
halo = halo.filter(ImageFilter.GaussianBlur(45))
base = Image.alpha_composite(base, halo)

draw = ImageDraw.Draw(base)
# Outer rim and face.
draw.ellipse((c - face_r - rim_w, c - face_r - rim_w, c + face_r + rim_w, c + face_r + rim_w),
             fill=(15, 70, 70, 255), outline=(94, 234, 212, 210), width=5)
draw.ellipse((c - face_r, c - face_r, c + face_r, c + face_r),
             fill=(7, 27, 30, 255), outline=(56, 189, 248, 190), width=5)
draw.ellipse((c - face_r + 34, c - face_r + 34, c + face_r - 34, c + face_r - 34),
             outline=(143, 247, 232, 52), width=3)

# Minute ticks.
for index in range(60):
    angle = math.radians(index * 6 - 90)
    major = index % 5 == 0
    outer = face_r - 38
    inner = face_r - (76 if major else 62)
    width = 8 if major else 3
    color = (215, 255, 249, 225 if major else 110)
    x1, y1 = c + math.cos(angle) * inner, c + math.sin(angle) * inner
    x2, y2 = c + math.cos(angle) * outer, c + math.sin(angle) * outer
    draw.line((x1, y1, x2, y2), fill=color, width=width)

# Quarter-hour numerals as bold geometric marks.
for angle in (0, 90, 180, 270):
    rad = math.radians(angle - 90)
    x, y = c + math.cos(rad) * (face_r - 115), c + math.sin(rad) * (face_r - 115)
    r = 18
    draw.ellipse((x - r, y - r, x + r, y + r), fill=(215, 255, 249, 215))

# Hands: 10:08 is the classic watch-ad pose.
def hand(angle_deg: float, length: float, width: int, color: tuple[int, int, int, int]) -> None:
    angle = math.radians(angle_deg - 90)
    x, y = c + math.cos(angle) * length, c + math.sin(angle) * length
    draw.line((c, c, x, y), fill=color, width=width)
    draw.ellipse((x - width // 2, y - width // 2, x + width // 2, y + width // 2), fill=color)


hand(304, face_r - 155, 24, (236, 255, 252, 255))  # hour hand
hand(48, face_r - 72, 15, (94, 234, 212, 255))     # minute hand
hand(215, face_r - 45, 6, (56, 189, 248, 230))     # second hand

# Center cap and a subtle glass highlight.
draw.ellipse((c - 34, c - 34, c + 34, c + 34), fill=(94, 234, 212, 255))
draw.ellipse((c - 13, c - 13, c + 13, c + 13), fill=(7, 25, 27, 255))

glass = Image.new("RGBA", (S, S), (0, 0, 0, 0))
glass_draw = ImageDraw.Draw(glass)
glass_draw.ellipse((c - face_r + 26, c - face_r + 18, c + face_r - 40, c + face_r - 120),
                   fill=(255, 255, 255, 16))
glass = glass.filter(ImageFilter.GaussianBlur(32))
base = Image.alpha_composite(base, glass)

# Rounded app-icon silhouette.
mask = rounded_mask(S, 228)
out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
out.paste(base, (0, 0), mask)

# A hairline rim keeps the icon legible on dark storefront cards.
draw = ImageDraw.Draw(out)
draw.rounded_rectangle((3, 3, S - 4, S - 4), radius=226, outline=(142, 247, 232, 70), width=4)

out.resize((512, 512), Image.Resampling.LANCZOS).save(OUT / "icon.png", optimize=True)
out.resize((180, 180), Image.Resampling.LANCZOS).save(OUT / "icon-180.png", optimize=True)
print(OUT / "icon-180.png")
print(OUT / "icon.png")
