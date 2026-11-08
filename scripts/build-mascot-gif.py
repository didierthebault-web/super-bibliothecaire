"""Assembler le GIF à partir de l'original et de l'image de clin d'œil créée avec Imagegen.

Usage : python scripts/build-mascot-gif.py chemin/imagegen.png
Pillow est nécessaire pour l'assemblage du GIF, pas pour l'application.
"""
from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops

root = Path(__file__).resolve().parents[1]
original = Image.open(root / 'assets/mascotte.png').convert('RGB')
source = Image.open(sys.argv[1]).convert('RGB').resize(original.size, Image.Resampling.LANCZOS)
# Montage des images clés : seule la petite région de l'œil générée par Imagegen
# est utilisée, pour éviter tout mouvement du visage, des lunettes ou du décor.
mask = Image.new('L', original.size, 0)
ImageDraw.Draw(mask).ellipse((122, 76, 156, 102), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(1))
closed = Image.composite(source, original, mask)
closed.save(root / 'assets/mascotte-clin-oeil.png')
assert ImageChops.difference(original, closed).getbbox() is not None
master = Image.new('RGB', (original.width * 2, original.height))
master.paste(original, (0, 0))
master.paste(closed, (original.width, 0))
palette = master.quantize(colors=256)
frames = [frame.quantize(palette=palette, dither=Image.Dither.NONE)
          for frame in (original, closed, original)]
destination = root / 'assets/mascotte-clin-oeil.gif'
# Pas d'extension loop : lecture unique, dernière image identique à la première.
frames[0].save(destination, save_all=True, append_images=frames[1:],
               duration=[700, 180, 600], optimize=False, disposal=1)
with Image.open(destination) as gif:
    assert gif.n_frames == 3 and 'loop' not in gif.info
    gif.seek(0)
    first = gif.convert('RGB')
    gif.seek(2)
    assert ImageChops.difference(first, gif.convert('RGB')).getbbox() is None
print(f'GIF : {original.width} × {original.height}, 3 images, 1,48 s, lecture unique, {destination.stat().st_size} octets')
