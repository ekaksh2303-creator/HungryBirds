import os
import glob
import shutil

project_dir = r"C:\Users\EKAKSH\.gemini\antigravity\scratch\project"

# 1. Copy the logo
img_dir = os.path.join(project_dir, "img")
os.makedirs(img_dir, exist_ok=True)
logo_src = r"C:\Users\EKAKSH\.gemini\antigravity\brain\68debdf5-46f0-44ea-bc5a-bf7fe2d50cea\.user_uploaded\media_1791492199114_e9135cf6.png"
logo_dest = os.path.join(img_dir, "logo.png")
shutil.copy(logo_src, logo_dest)

# 2. Files to process
html_files = glob.glob(os.path.join(project_dir, "*.html"))
js_files = glob.glob(os.path.join(project_dir, "js", "*.js"))
css_files = glob.glob(os.path.join(project_dir, "css", "*.css"))
readme = os.path.join(project_dir, "README.md")

all_files = html_files + js_files + css_files + [readme]

for file_path in all_files:
    if not os.path.exists(file_path): continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    content = content.replace('EatSoul', 'HungryBirds')
    content = content.replace('eatsoul', 'hungrybirds')
    content = content.replace('Eat<span class="accent">Soul</span>', 'Hungry<span class="accent">Birds</span>')
    content = content.replace('EATSOUL', 'HUNGRYBIRDS')
    
    import re
    # Logo replacement
    old_logo_pattern = r'<div class="brand-icon">.*?</div>'
    new_logo_html = '<img src="img/logo.png" alt="Logo" class="brand-icon-img" style="height: 32px; width: auto; margin-right: 8px;">'
    content = re.sub(old_logo_pattern, new_logo_html, content)
    # Wait, the search result showed: `<div class="brand-icon">T"</div>` which is likely an emoji that didn't print well.
    # It might be 🍔.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done replacing.")
