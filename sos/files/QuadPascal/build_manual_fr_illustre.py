import fitz, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "Tao_Motor_TGA300F-01_T-Lander_300_Manuel_utilisateur_EN.pdf"
TR = ROOT / "Tao_Motor_TGA300F-01_T-Lander_300_Manuel_utilisateur_FR_source.txt"
OUT = ROOT / "Tao_Motor_TGA300F-01_T-Lander_300_Manuel_utilisateur_FR_illustre.pdf"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

text = TR.read_text(encoding="utf-8-sig")
pat = re.compile(r"(?m)^PAGE\s+(\d+)\s+—\s+(.+?)\s*$")
matches = list(pat.finditer(text))
fr = {}
for i, m in enumerate(matches):
    n = int(m.group(1))
    title = m.group(2).strip()
    start = m.end()
    end = matches[i+1].start() if i+1 < len(matches) else text.find("FIN DE LA TRADUCTION", start)
    if end < 0:
        end = len(text)
    fr[n] = (title, text[start:end].strip())

src = fitz.open(SRC)
if src.page_count != 95:
    raise RuntimeError(f"Expected 95 source pages, got {src.page_count}")
missing = [n for n in range(1, 96) if n not in fr]
if missing:
    raise RuntimeError(f"Missing translated pages: {missing}")

out = fitz.open()
W, H = 841.89, 595.28  # A4 landscape
margin, left_w, sep = 24, 330, 16
right_x = margin + left_w + sep
right_w = W - right_x - margin
body_bottom = H - 34

def fit_text(page, rect, content, start=8.4, minimum=4.7):
    size = start
    while size >= minimum:
        rc = page.insert_textbox(rect, content, fontsize=size, fontname="dv",
                                 color=(0.07, 0.07, 0.07), lineheight=1.08)
        if rc >= 0:
            return size
        size -= 0.25
    raise RuntimeError("Translated text does not fit on page")

for n in range(1, 96):
    title, body = fr[n]
    p = out.new_page(width=W, height=H)
    p.insert_font(fontname="dv", fontfile=FONT)
    p.insert_font(fontname="dvb", fontfile=FONT_BOLD)

    p.insert_text((margin, 28), "TAO MOTOR TGA300F-01 / T-LANDER 300",
                  fontsize=12, fontname="dvb")
    p.insert_text((margin, 46), f"Manuel bilingue EN / FR — original à gauche, traduction française à droite — page {n}/95",
                  fontsize=7.2, fontname="dv", color=(0.35, 0.35, 0.35))

    visual = fitz.Rect(margin, 62, margin + left_w, H - 36)
    p.draw_rect(visual, color=(0.82, 0.82, 0.82), width=0.7)
    p.show_pdf_page(visual + (5, 5, -5, -5), src, n-1, keep_proportion=True)
    p.insert_text((margin+4, H-22),
                  "Page originale constructeur en anglais — texte, illustrations et schémas conservés intégralement.",
                  fontsize=5.6, fontname="dv", color=(0.42, 0.42, 0.42))

    p.draw_line((right_x-8, 62), (right_x-8, H-36),
                color=(0.80, 0.80, 0.80), width=0.7)
    p.insert_textbox(fitz.Rect(right_x, 62, right_x+right_w, 92),
                     f"PAGE {n} - {title}", fontsize=10.2, fontname="dvb",
                     color=(0.02, 0.02, 0.02), lineheight=1.1)
    fit_text(p, fitz.Rect(right_x, 96, right_x+right_w, body_bottom), body)

out.set_metadata({
    "title": "Tao Motor TGA300F-01 / T-Lander 300 - Manuel bilingue EN / FR",
    "author": "Traduction française à partir du manuel constructeur Tao Motor",
    "subject": "Manuel utilisateur bilingue anglais / français - TGA300F-01",
    "keywords": "Tao Motor,TGA300F-01,T-Lander 300,quad,ATV,manuel,français"
})
out.save(OUT, garbage=4, deflate=True, clean=True)
out.close()
src.close()
print(f"Generated {OUT} ({OUT.stat().st_size} bytes)")
