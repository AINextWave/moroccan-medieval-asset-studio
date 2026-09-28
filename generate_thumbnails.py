import os
import math
from PIL import Image, ImageDraw, ImageFont

output_dir = r"C:\Users\Hicham\Desktop\Moroccan Medieval ROBLOX\moroccan-medieval-studio\public\thumbnails"
os.makedirs(output_dir, exist_ok=True)

W, H = 512, 512

# Colors
NIGHT = (14, 42, 58)
ZELLIGE = (15, 107, 92)
ZELLIGE_LIGHT = (21, 138, 115)
TERRACOTTA = (201, 111, 74)
OR = (201, 162, 39)
OR_LIGHT = (224, 183, 48)
SABLE = (232, 220, 200)

def draw_background(draw):
    draw.rectangle([0, 0, W, H], fill=NIGHT)
    # Zellige pattern grid
    step = 40
    for x in range(0, W + step, step):
        for y in range(0, H + step, step):
            # Diamond
            poly = [(x, y - 12), (x + 12, y), (x, y + 12), (x - 12, y)]
            draw.polygon(poly, outline=(15, 107, 92, 40), fill=(14, 52, 70))
            draw.line([(x, y - 6), (x, y + 6)], fill=(201, 162, 39, 40), width=1)
            draw.line([(x - 6, y), (x + 6, y)], fill=(201, 162, 39, 40), width=1)

def draw_horseshoe_arch(draw, x_center=256, y_base=440, width=280, height=340, color=OR, fill_color=None):
    r = width // 2
    y_center = y_base - height + r
    
    if fill_color:
        # Fill arch interior
        arch_pts = []
        for deg in range(180, 361):
            rad = math.radians(deg)
            arch_pts.append((x_center + int(r * math.cos(rad)), y_center + int(r * math.sin(rad))))
        arch_pts.append((x_center + r, y_base))
        arch_pts.append((x_center - r, y_base))
        draw.polygon(arch_pts, fill=fill_color)
    
    # Outer horseshoe outline
    draw.arc([x_center - r, y_center - r, x_center + r, y_center + r], 170, 370, fill=color, width=4)
    draw.line([x_center - r, y_center, x_center - r + 15, y_base], fill=color, width=4)
    draw.line([x_center + r, y_center, x_center + r - 15, y_base], fill=color, width=4)
    
    # Inner decorative arch
    r_in = r - 16
    draw.arc([x_center - r_in, y_center - r_in + 8, x_center + r_in, y_center + r_in + 8], 175, 365, fill=ZELLIGE_LIGHT, width=2)

def create_thumb_batch_renamer():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_horseshoe_arch(draw, 256, 440, 300, 360, OR, fill_color=(12, 36, 50))
    
    # Plugin Icon / Visual: Code Tags + Replacement symbol
    draw.rounded_rectangle([150, 160, 362, 230], radius=10, fill=ZELLIGE, outline=OR, width=2)
    draw.rounded_rectangle([150, 250, 362, 320], radius=10, fill=ZELLIGE_LIGHT, outline=OR_LIGHT, width=2)
    
    # Arrow between tags
    draw.polygon([(240, 235), (272, 235), (256, 248)], fill=OR)
    
    # Text banner at bottom
    draw.rectangle([0, 430, W, 512], fill=(10, 30, 42))
    draw.line([0, 430, W, 430], fill=OR, width=2)
    
    draw.text((256, 195), "Instance_01", fill=SABLE, anchor="mm")
    draw.text((256, 285), "Zellige_Arch_01", fill=SABLE, anchor="mm")
    draw.text((256, 460), "BATCH RENAMER PRO", fill=OR, anchor="mm")
    draw.text((256, 485), "Luau Plugin · Roblox Studio", fill=ZELLIGE_LIGHT, anchor="mm")
    
    path = os.path.join(output_dir, "thumb-batch-rename-pro.png")
    img.save(path)
    print("Created:", path)

def create_thumb_weld_master():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_horseshoe_arch(draw, 256, 440, 300, 360, OR, fill_color=(12, 36, 50))
    
    # Welding blocks & constraints
    # Block A
    draw.rectangle([140, 190, 230, 280], fill=TERRACOTTA, outline=OR, width=3)
    # Block B
    draw.rectangle([282, 190, 372, 280], fill=ZELLIGE, outline=OR, width=3)
    
    # Weld beam / link
    draw.line([230, 235, 282, 235], fill=OR_LIGHT, width=6)
    
    # Sparks / star
    cx, cy = 256, 235
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        ex = cx + int(18 * math.cos(rad))
        ey = cy + int(18 * math.sin(rad))
        draw.line([cx, cy, ex, ey], fill=OR_LIGHT, width=2)
    
    # Text banner
    draw.rectangle([0, 430, W, 512], fill=(10, 30, 42))
    draw.line([0, 430, W, 430], fill=OR, width=2)
    draw.text((256, 460), "WELD MASTER", fill=OR, anchor="mm")
    draw.text((256, 485), "Instant WeldConstraint · Luau", fill=ZELLIGE_LIGHT, anchor="mm")
    
    path = os.path.join(output_dir, "thumb-weld-master.png")
    img.save(path)
    print("Created:", path)

def create_thumb_moroccan_pack():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_horseshoe_arch(draw, 256, 430, 320, 380, OR, fill_color=(15, 45, 60))
    
    # Tagine base + cone
    # Plate base
    draw.ellipse([160, 270, 352, 320], fill=TERRACOTTA, outline=OR, width=2)
    # Cone top
    draw.polygon([(256, 170), (190, 285), (322, 285)], fill=TERRACOTTA, outline=OR, width=2)
    draw.circle((256, 165), 10, fill=OR)
    
    # Hanging Fanous Lantern
    lx, ly = 256, 90
    draw.line([lx, 0, lx, ly], fill=OR, width=2)
    # Lantern body
    draw.polygon([(lx, ly), (lx + 24, ly + 25), (lx + 15, ly + 65), (lx, ly + 75), (lx - 15, ly + 65), (lx - 24, ly + 25)], fill=(201, 162, 39, 200), outline=OR, width=2)
    # Glow in center
    draw.circle((lx, ly + 35), 8, fill=(255, 240, 180))
    
    # Small star shield on left
    draw.circle((130, 220), 28, fill=ZELLIGE, outline=OR, width=2)
    draw.circle((130, 220), 10, fill=OR)
    
    # Brass teapot on right
    draw.ellipse([350, 210, 400, 250], fill=OR, outline=OR_LIGHT, width=2)
    draw.arc([385, 205, 415, 245], 270, 90, fill=OR, width=3)
    
    # Banner
    draw.rectangle([0, 430, W, 512], fill=(10, 30, 42))
    draw.line([0, 430, W, 430], fill=OR, width=2)
    draw.text((256, 460), "MOROCCAN MEDIEVAL PACK", fill=OR, anchor="mm")
    draw.text((256, 485), "10 Low-Poly Props · Zellige & Laiton · 2 864 tris", fill=ZELLIGE_LIGHT, anchor="mm")
    
    path = os.path.join(output_dir, "thumb-moroccan-medieval-pack.png")
    img.save(path)
    print("Created:", path)

def create_thumb_medieval_archive():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, H], fill=(25, 28, 32))
    
    # Muted arch
    draw_horseshoe_arch(draw, 256, 430, 280, 340, (100, 110, 120), fill_color=(20, 22, 26))
    
    # Generic sword & shield
    draw.polygon([(256, 160), (290, 200), (290, 260), (256, 300), (222, 260), (222, 200)], fill=(70, 75, 80), outline=(120, 130, 140), width=2)
    draw.line([256, 170, 256, 290], fill=(160, 170, 180), width=3)
    draw.line([235, 200, 277, 200], fill=(160, 170, 180), width=3)
    
    # ARCHIVE stamp
    draw.rounded_rectangle([130, 330, 382, 380], radius=8, fill=(40, 45, 50), outline=(150, 150, 150), width=2)
    draw.text((256, 355), "[ ARCHIVÉ ]", fill=(180, 180, 180), anchor="mm")
    
    # Banner
    draw.rectangle([0, 430, W, 512], fill=(18, 20, 24))
    draw.line([0, 430, W, 430], fill=(80, 90, 100), width=2)
    draw.text((256, 460), "MEDIEVAL PROPS PACK", fill=(180, 180, 180), anchor="mm")
    draw.text((256, 485), "Archive générique · Remplacé par Moroccan Medieval", fill=(120, 125, 130), anchor="mm")
    
    path = os.path.join(output_dir, "thumb-medieval-props-pack.png")
    img.save(path)
    print("Created:", path)

if __name__ == "__main__":
    create_thumb_batch_renamer()
    create_thumb_weld_master()
    create_thumb_moroccan_pack()
    create_thumb_medieval_archive()
    print("All thumbnails generated successfully!")
