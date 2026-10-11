"""Render packhouse-spec.md to spec.html, the Spec tab next to the site map and 3D models.

Run after editing the spec, from anywhere:  python3 scripts/build-spec.py
"""
import re
from pathlib import Path
import markdown

HERE = Path(__file__).resolve().parent.parent   # the repo root

NAV = '''<nav class="tabs" aria-label="Packhouse pages">
  <a href="site-placement.html">Site map</a><a href="packhouses-3d.html">3D models</a><a href="grades.html">Grades</a><a href="dock-detail.html">Dock detail</a><a href="spec.html" aria-current="page">Spec</a><a href="storage.html">Storage</a>
</nav>'''

md = (HERE / "packhouse-spec.md").read_text(encoding="utf-8")
md = re.sub(r"^(\*\*[^*\n]+:\*\*.*)$", r"\1  ", md, flags=re.M)   # keep the metadata lines on their own lines
md = re.sub(r"^- \[ \] ", "- <span class=\"box\"></span>", md, flags=re.M)
md = re.sub(r"^- \[x\] ", "- <span class=\"box on\"></span>", md, flags=re.M)
body = markdown.markdown(md, extensions=["tables", "sane_lists"])
body = body.replace("<table>", '<div class="tbl"><table>').replace("</table>", "</table></div>")
# a cell's "– " lines get a hanging indent, so a wrapped line lines up with the text, not the dash
def hang(m):
    parts = re.split(r"<br ?/?>", m.group(2))
    if not any(p.startswith("– ") for p in parts): return m.group(0)
    return m.group(1) + "".join('<span class="%s">%s</span>' % ("hang" if p.startswith("– ") else "line", p) for p in parts) + "</td>"
body = re.sub(r"(<td[^>]*>)(.*?)</td>", hang, body, flags=re.S)
title = re.search(r"^# (.+)$", md, re.M).group(1)

page = f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Packhouse Spec</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
:root{{
  --paper:#F5F5F1; --vellum:#FFFFFF; --vellum-2:#EDEEE8;
  --ink:#15181C; --ink-2:#565D64; --ink-3:#848C92;
  --rule:#D3D6CE; --rule-2:#BFC3B9; --survey:#B23A2B;
}}
@media (prefers-color-scheme: dark){{
  :root:not([data-theme="light"]){{
    --paper:#131519; --vellum:#1A1D22; --vellum-2:#22262C;
    --ink:#E7E9E3; --ink-2:#9CA3AA; --ink-3:#767E86;
    --rule:#2C3138; --rule-2:#3A4148; --survey:#E4796A;
  }}
}}
:root[data-theme="dark"]{{
  --paper:#131519; --vellum:#1A1D22; --vellum-2:#22262C;
  --ink:#E7E9E3; --ink-2:#9CA3AA; --ink-3:#767E86;
  --rule:#2C3138; --rule-2:#3A4148; --survey:#E4796A;
}}
body{{background:var(--paper);color:var(--ink);font-family:"Archivo","Helvetica Neue",Arial,sans-serif;font-size:15px;line-height:1.6}}
.wrap{{max-width:1080px;margin:0 auto;padding-block:22px 70px;padding-left:20px;padding-right:20px}}
.tabs{{display:flex;gap:0;border-bottom:1px solid var(--rule-2);margin-bottom:22px}}
.tabs a{{font:700 12px/1 "Archivo Narrow",Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);
  text-decoration:none;padding:12px 16px 10px;border-bottom:3px solid transparent}}
.tabs a:hover{{color:var(--ink)}}
.tabs a[aria-current="page"]{{color:var(--ink);border-bottom-color:var(--ink)}}
.tabs a:focus-visible{{outline:2px solid var(--survey);outline-offset:2px}}
h1{{font-family:"Archivo Narrow","Arial Narrow",Arial,sans-serif;font-weight:700;font-size:clamp(26px,4vw,38px);line-height:1.05;margin:0 0 14px;text-wrap:balance}}
h2{{font:700 13px/1.3 "Archivo Narrow",Arial,sans-serif;text-transform:uppercase;letter-spacing:.13em;margin:38px 0 10px;padding-top:14px;border-top:1.5px solid var(--ink)}}
h3{{font:700 12px/1.3 "Archivo Narrow",Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-2);margin:26px 0 8px}}
p,li{{max-width:72ch;color:var(--ink-2)}}
p strong,li strong,td strong{{color:var(--ink)}}
hr{{border:0;margin:0}}
code{{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.88em;background:var(--vellum-2);padding:1px 5px}}
.tbl{{overflow-x:auto;margin:10px 0 6px}}
table{{border-collapse:collapse;width:100%;min-width:620px;font-size:13.5px}}
th,td{{text-align:left;padding:8px 14px 8px 0;border-bottom:1px solid var(--rule);vertical-align:top}}
th{{font:600 10.5px/1.3 "Archivo Narrow",Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);border-bottom:1px solid var(--rule-2)}}
td:first-child{{color:var(--ink);font-weight:600}}
td .hang,td .line{{display:block}}
td .hang{{padding-left:1em;text-indent:-1em}}
td[align="right"],th[align="right"]{{font-family:"IBM Plex Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums}}
ul{{padding-left:0;list-style:none}}
ul li{{padding:7px 0 7px 26px;border-bottom:1px solid var(--rule);position:relative}}
ul li .box{{position:absolute;left:2px;top:12px;width:10px;height:10px;border:1.5px solid var(--rule-2)}}
ul li .box.on{{background:var(--ink)}}
footer{{margin-top:40px;padding-top:12px;border-top:1px solid var(--rule-2);color:var(--ink-3);font-size:12px}}
</style>

<div class="wrap">
{NAV}
{body}

</div>
'''
(HERE / "spec.html").write_text(page, encoding="utf-8")
print("wrote", HERE / "spec.html", "-", title)
