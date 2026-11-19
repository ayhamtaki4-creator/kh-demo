#!/usr/bin/env python3
"""
KH Real Estate – static build.

Run after editing assets/data.js:
    python3 tools/build.py

What it does:
  * writes one page per property (property-<id>.html) with real <title>,
    description, Open Graph / Twitter tags and JSON-LD, so links shared on
    WhatsApp / Facebook / Telegram show a photo, title and price;
  * draws a 1200x630 share image per property in assets/og/;
  * fills the share tags of index.html and listings.html.

Change SITE_URL in tools/site.json when the site moves to its own domain.
Needs: node (to read data.js) and Pillow.
"""
import html, json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SITE = json.load(open('tools/site.json'))['url'].rstrip('/') + '/'

# ---------- data ----------
js = ("const fs=require('fs'),vm=require('vm');const w={};"
      "vm.runInNewContext(fs.readFileSync('assets/data.js','utf8'),{window:w});"
      "process.stdout.write(JSON.stringify(w.KH));")
K = json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))

STATUS = {'sale': 'للبيع', 'rent': 'للإيجار', 'sold': 'تم البيع'}
STATUS_EN = {'sale': 'FOR SALE', 'rent': 'FOR RENT', 'sold': 'SOLD'}
esc = lambda s: html.escape(str(s or ''), quote=True)

def money(n): return f"{n:,}$"
def price_text(l):
    if l['status'] == 'sold': return 'تم البيع'
    if l.get('price') is None: return l.get('priceNote') or 'السعر عند الطلب'
    return money(l['price']) + (' ' + l['priceUnit'] if l.get('priceUnit') else '')
def size_text(l):
    if not l.get('size'): return ''
    return ('~' if l.get('sizeApprox') else '') + f"{l['size']:,} م²" + (' ' + l['sizeNote'] if l.get('sizeNote') else '')
def place(l): return ' · '.join(x for x in [l.get('area'), l.get('sub')] if x)

# ---------- share images ----------
FONT_DIR = '/usr/share/fonts/truetype'
def font(names, size):
    for n in names:
        for base, _, files in os.walk(FONT_DIR):
            if n in files: return ImageFont.truetype(os.path.join(base, n), size)
    return ImageFont.load_default()
F_SERIF = lambda s: font(['Lora-Variable.ttf'], s)
F_SANS = lambda s: font(['Poppins-SemiBold.ttf', 'Poppins-Medium.ttf', 'Poppins-Regular.ttf'], s)
F_SANS_L = lambda s: font(['Poppins-Light.ttf', 'Poppins-Regular.ttf'], s)
F_AR = lambda s: font(['DejaVuSans-Bold.ttf', 'DejaVuSans.ttf'], s)
NAVY, GOLD, WHITE, SOFT = (13, 27, 46), (184, 148, 90), (255, 255, 255), (183, 194, 211)

def og_image(photo, out, price=None, status=None, area=None):
    W, H, PW = 1200, 630, 470
    im = Image.new('RGB', (W, H), NAVY)
    if photo and os.path.exists(photo):
        ph = ImageOps.fit(Image.open(photo).convert('RGB'), (W - PW, H), Image.LANCZOS, centering=(0.5, 0.5))
        im.paste(ph, (PW, 0))
    d = ImageDraw.Draw(im)
    d.rectangle([PW - 4, 0, PW - 1, H], fill=GOLD)
    x = 56
    d.rectangle([x, 56, x + 76, 132], outline=GOLD, width=2)
    d.text((x + 38, 94), 'KH', font=F_SERIF(38), fill=WHITE, anchor='mm')
    d.text((x, 168), 'KH  REAL  ESTATE', font=F_SANS(26), fill=WHITE)
    d.text((x, 206), 'Karim & Haffar Group · Damascus', font=F_SANS_L(19), fill=SOFT)
    if status:
        d.text((x, 330), status, font=F_SANS(22), fill=GOLD)
    maxw = PW - 2 * x
    def fit(txt, mk, size, **kw):
        while size > 14:
            f = mk(size)
            if d.textlength(txt, font=f, **kw) <= maxw: return f
            size -= 2
        return mk(size)
    if price:
        d.text((x, 362), price, font=fit(price, F_SANS, 64), fill=WHITE)
    if area:
        kw = dict(direction='rtl', language='ar')
        d.text((PW - 56, 520), area, font=fit(area, F_AR, 28, **kw), fill=SOFT, anchor='ra', **kw)
    d.line([x, 568, PW - 56, 568], fill=(30, 51, 84), width=2)
    d.text((x, 582), '+963 967 113 344', font=F_SANS_L(20), fill=SOFT)
    im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)

os.makedirs('assets/og', exist_ok=True)
og_image('assets/img/hero.jpg', 'assets/og/home.jpg', status='DAMASCUS PROPERTIES', price='Buy · Rent · Invest', area='دمشق وريفها')
for l in K['listings']:
    ph = f"assets/img/{l['photos'][0]}.jpg" if l.get('photos') else 'assets/img/hero.jpg'
    p = 'SOLD' if l['status'] == 'sold' else (money(l['price']) if l.get('price') else 'Price on request')
    if l.get('priceUnit') and l.get('price'): p += ' /yr'
    og_image(ph, f"assets/og/{l['id']}.jpg", price=p, status=STATUS_EN[l['status']], area=place(l))

# ---------- meta blocks ----------
def meta(title, desc, url, image, kind='website', extra=''):
    return ('<!--OG-->\n'
            f'<meta name="description" content="{esc(desc)}">\n'
            f'<link rel="canonical" href="{esc(url)}">\n'
            f'<meta property="og:type" content="{kind}">\n'
            '<meta property="og:site_name" content="KH Real Estate">\n'
            '<meta property="og:locale" content="ar_SY">\n'
            f'<meta property="og:title" content="{esc(title)}">\n'
            f'<meta property="og:description" content="{esc(desc)}">\n'
            f'<meta property="og:url" content="{esc(url)}">\n'
            f'<meta property="og:image" content="{esc(image)}">\n'
            '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
            f'<meta property="og:image:alt" content="{esc(title)}">\n'
            '<meta name="twitter:card" content="summary_large_image">\n'
            f'<meta name="twitter:title" content="{esc(title)}">\n'
            f'<meta name="twitter:description" content="{esc(desc)}">\n'
            f'<meta name="twitter:image" content="{esc(image)}">\n'
            f'{extra}<!--/OG-->')

def put(text, block):
    return re.sub(r'<!--OG-->.*?<!--/OG-->', lambda m: block, text, count=1, flags=re.S)

def write_if_changed(path, text):
    old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != text:
        open(path, 'w', encoding='utf-8').write(text)
        return True
    return False

v = lambda path: f"{SITE}{path}"
home_desc = 'شقق وبيوت للبيع والإيجار، بيوت دمشقية تراثية، ومشاريع على المخطط في دمشق وريفها. KH Real Estate – Karim & Haffar Group.'
changed = []
for f, title in [('index.html', 'KH Real Estate | عقارات دمشق وريفها'), ('listings.html', 'عقارات للبيع والإيجار في دمشق | KH Real Estate')]:
    t = open(f, encoding='utf-8').read()
    if write_if_changed(f, put(t, meta(title, home_desc, v(f if f != 'index.html' else ''), v('assets/og/home.jpg')))): changed.append(f)

tpl = open('property.html', encoding='utf-8').read()
for l in K['listings']:
    pid, url = l['id'], v(f"property-{l['id']}.html")
    pt = price_text(l)
    title = f"{l['title']} – {pt}"
    bits = [STATUS[l['status']], size_text(l), place(l) + '، دمشق' if l['area'] != 'دمشق' else 'دمشق']
    desc = ' · '.join(b for b in bits if b) + '. ' + ((l.get('desc') or [''])[0][:150])
    ld = {
        '@context': 'https://schema.org', '@type': 'RealEstateListing', 'name': l['title'], 'url': url,
        'description': ' '.join(l.get('desc') or []) or l['title'],
        'image': [v(f"assets/img/{p}.jpg") for p in l.get('photos', [])] or [v('assets/og/home.jpg')],
        'offers': {'@type': 'Offer', 'priceCurrency': 'USD',
                   'availability': 'https://schema.org/SoldOut' if l['status'] == 'sold' else 'https://schema.org/InStock',
                   **({'price': l['price']} if l.get('price') and l['status'] != 'sold' else {})},
        'address': {'@type': 'PostalAddress', 'addressLocality': 'دمشق', 'addressRegion': l['area'], 'addressCountry': 'SY'}
    }
    extra = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>\n'
    page = put(tpl, meta(title, desc, url, v(f'assets/og/{pid}.jpg'), 'article', extra))
    page = page.replace('<title>عقار | KH Real Estate</title>', f'<title>{esc(title)} | KH Real Estate</title>', 1)
    page = page.replace('<!--ID-->', f'<script>window.KH_ID = {json.dumps(pid)};</script>', 1)
    first = f'<img src="assets/img/{l["photos"][0]}.jpg" alt="{esc(l["title"])}" style="width:100%;max-height:60vh;object-fit:cover">' if l.get('photos') else ''
    fallback = (f'<main id="main">{first}<div class="container" style="padding:24px 20px">'
                f'<p>{esc(STATUS[l["status"]])} · {esc(place(l))}</p><h1 class="pd-title">{esc(l["title"])}</h1>'
                f'<p class="pd-price"><b>{esc(pt)}</b></p>' + ''.join(f'<p>{esc(p)}</p>' for p in l.get('desc') or []) +
                '</div></main>')
    page = page.replace('<main id="main"></main>', fallback, 1)
    if write_if_changed(f'property-{pid}.html', page): changed.append(f'property-{pid}.html')

# old link from the first demo
write_if_changed('property-195.html', '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="robots" content="noindex">'
                 '<meta http-equiv="refresh" content="0; url=property-kh-195.html"><link rel="canonical" href="property-kh-195.html">'
                 '<title>KH Real Estate</title></head><body><a href="property-kh-195.html">انتقل لصفحة العقار</a></body></html>\n')

ids = {f"property-{l['id']}.html" for l in K['listings']}
stale = [f for f in os.listdir('.') if re.fullmatch(r'property-kh-.+\.html', f) and f not in ids]
for f in stale: os.remove(f)
print(f"site: {SITE}\nlistings: {len(K['listings'])}\nupdated: {', '.join(changed) or 'nothing'}" + (f"\nremoved: {', '.join(stale)}" if stale else ''))
