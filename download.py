import os
import subprocess
import sys

files = {
    "css": "13of1VZTAMP0V_B_uWfW6YfJUyQ3sc51-",
    "js": "1cRICXNd6DEekA20MfYa8RuKlggFNhC2b",
    "cart.html": "1HKcY00XswP7jxVnJROo35YRBpcryDPIz",
    "index.html": "1dy-GU0kNdmPrVfzkPH79JPqkkHrafrTn",
    "menu.html": "1WYnLDQjb-H5vA3EPIkTHuDJ46UOmdhMo",
    "order.html": "1tKXjp15q581Dh7HHuqKIEoQ0rpBgE1Kk",
    "README.md": "19fm_3IA0q9RMNcevtdnq_Uif43-b5TMA",
    "restaurants.html": "1wdE1x-E7LPD7oQ1ZphPbDLyhTSaa3XKE",
    "server.js": "1qPEj1jJ770SXaW6NHEwvpbmxcWIRiC-8"
}

for name, fid in files.items():
    if name in ["css", "js"]:
        subprocess.run([sys.executable, "-m", "gdown", "--folder", fid, "-O", name])
    else:
        subprocess.run([sys.executable, "-m", "gdown", fid, "-O", name])
