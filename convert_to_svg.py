import os
import base64

def png_to_svg(png_path, svg_path):
    with open(png_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode('utf-8')
    
    # Get dimensions (placeholder or actual if needed)
    # For simplicity, we'll use a standard viewBox or wrap it
    svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">\n'
    svg_content += f'  <image width="1024" height="1024" xlink:href="data:image/png;base64,{encoded_string}"/>\n'
    svg_content += '</svg>'
    
    with open(svg_path, "w") as f:
        f.write(svg_content)

images = [
    "ayachi_logo.png",
    "hero_image.png",
    "icon_18plus.png",
    "icon_educational.png",
    "icon_safe_secure.png",
    "prize_pool.png",
    "team_selection.png"
]

public_dir = "/home/ubuntu/ayachi-fantasy-cricket/client/public"

for img in images:
    png_path = os.path.join(public_dir, img)
    svg_path = os.path.join(public_dir, img.replace(".png", ".svg"))
    if os.path.exists(png_path):
        print(f"Converting {img} to SVG...")
        png_to_svg(png_path, svg_path)
