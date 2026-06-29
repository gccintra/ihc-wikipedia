#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera páginas locais a partir de artigos REAIS da Wikipédia em português.
- Conteúdo e links reais (via API action=parse).
- Links internos cujo destino também foi gerado => link local clicável.
- Links fora do conjunto gerado => viram texto puro (nada quebra na página de teste).
- Cada página recebe a navegação dupla (trilha de histórico + categorias).

Uso:  python3 build_wiki.py
Saída: html/wiki/*.html  +  html/wiki/index.html
"""
import json, os, re, sys, time, urllib.parse, urllib.request, html as htmllib

API = "https://pt.wikipedia.org/w/api.php"
UA = "IHC-UnB-2026-prototipo/1.0 (uso academico; contato cintra.gucintra@hotmail.com)"
OUTDIR = os.path.join(os.path.dirname(__file__), "html", "wiki")

# Sementes — escolhidas para um grafo denso (esporte + Inglaterra + educação).
SEEDS = [
    "Futebol", "Rugby", "Winchester College",
    "Futebol de rugby", "Rugby School", "Escola pública (Reino Unido)",
    "Esporte", "FIFA", "Copa do Mundo FIFA",
    "Inglaterra", "Reino Unido", "Bola",
    "Pelé", "Seleção Brasileira de Futebol", "Futebol americano",
    "Críquete", "Eton College", "Universidade de Cambridge",
]
TARGET_TOTAL = 46          # teto de páginas geradas
PER_SEED_LINKS = 60        # quantos links coletar de cada semente

def norm(title):
    """Chave de comparação: underscores->espaço, 1ª letra maiúscula."""
    t = urllib.parse.unquote(title).replace("_", " ").strip()
    return t[:1].upper() + t[1:] if t else t

def fname(title):
    return urllib.parse.unquote(title).replace(" ", "_").replace("/", "-") + ".html"

def api(params):
    params = dict(params, format="json", formatversion="2")
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def fetch_summary(title):
    """Resumo + thumbnail via REST, para os hovercards. Retorna dict ou {}."""
    t = urllib.parse.quote(title.replace(" ", "_"), safe="")
    url = "https://pt.wikipedia.org/api/rest_v1/page/summary/" + t
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as r:
            d = json.load(r)
        return {"title": d.get("title", title),
                "extract": d.get("extract", ""),
                "thumb": (d.get("thumbnail") or {}).get("source", "")}
    except Exception:
        return {"title": title, "extract": "", "thumb": ""}

def fetch(title):
    """Retorna (titulo_canonico, html, [categorias]) ou None."""
    try:
        d = api({"action": "parse", "page": title, "redirects": 1,
                 "prop": "text|categories", "disableeditsection": 1,
                 "disabletoc": 1, "disablelimitreport": 1})
    except Exception as e:
        print("  ! erro", title, e); return None
    if "error" in d or "parse" not in d:
        print("  ! sem parse", title); return None
    p = d["parse"]
    cats = [c["category"].replace("_", " ") for c in p.get("categories", [])
            if not c.get("hidden")]
    return p["title"], p["text"], cats

LINK_RE = re.compile(r'<a\b([^>]*?)href="([^"]*)"([^>]*?)>(.*?)</a>', re.S)
HREF_WIKI = re.compile(r'^/wiki/([^#]*)')

def rewrite_links(htmltext, fileset):
    """fileset: dict norm_title -> filename. Reescreve <a>."""
    def repl(m):
        href = m.group(2)
        inner = m.group(4)
        mm = HREF_WIKI.match(href)
        if mm:
            raw = mm.group(1)
            title = urllib.parse.unquote(raw)
            if ":" in title:            # namespace (Categoria:, Ficheiro:, Ajuda:...) -> texto
                return inner
            key = norm(raw)
            f = fileset.get(key)
            if f:
                return '<a href="%s">%s</a>' % (f, inner)
            return inner                # fora do conjunto -> texto puro
        return inner                    # externo / citação / etc -> texto puro
    return LINK_RE.sub(repl, htmltext)

TEMPLATE = """<!DOCTYPE html>
<html lang="pt" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../../css/styles.css">
<link rel="stylesheet" href="wiki.css">
<title>{title} – Wikipédia, a enciclopédia livre</title>
</head>
<body>
<a class="mw-jump-link" href="#bodyContent">Ir para o conteúdo</a>
<div class="read-progress" id="readProgress"></div>

<header class="site-header"><div class="site-header__inner">
  <a class="brand" href="index.html" aria-label="Wikipédia">
    <img class="brand__icon" src="https://pt.wikipedia.org/static/images/icons/wikipedia.png" alt="Wikipédia" width="42" height="42">
    <span class="brand__text"><span class="brand__name">WIKIPÉDIA</span><span class="brand__tagline">A enciclopédia livre</span></span>
  </a>
  <div class="top-search" role="search"><form class="top-search__form" onsubmit="return false">
    <span class="top-search__icon">🔍</span>
    <input class="top-search__input" type="search" placeholder="Pesquisar na Wikipédia">
    <button class="top-search__button" type="button">Procurar</button>
  </form></div>
  <nav class="personal-tools"><a href="#">Doar</a><a href="#">Criar conta</a><a href="#">Iniciar sessão</a></nav>
</div></header>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar__section">
      <div class="sidebar__heading">Início</div>
      <ul class="sidebar__list"><li><a href="index.html">Índice de artigos</a></li></ul>
    </div>
    <div class="sidebar__section">
      <div class="sidebar__heading">Conteúdo desta página</div>
      <nav class="live-toc" id="liveToc" aria-label="Seções"></nav>
    </div>
  </aside>
  <main class="content"><div class="content__inner">
    <header class="page-titlebar"><h1>{title}</h1></header>
    <nav class="page-tabs"><div class="tabs-group"><ul>
      <li class="is-active"><a href="#">Artigo</a></li><li><a href="#">Discussão</a></li>
    </ul></div><div class="tabs-group"><ul>
      <li class="is-active"><a href="#">Ler</a></li><li><a href="#">Editar</a></li><li><a href="#">Ver histórico</a></li>
    </ul></div></nav>
    <div class="site-subtitle">Origem: Wikipédia, a enciclopédia livre.</div>
    <div class="reader-tools" aria-label="Ferramentas de leitura">
      <button data-act="theme" title="Alternar tema claro/escuro">🌙 Tema</button>
      <span class="rt-sep"></span>
      <span class="rt-group"><button data-act="font-dec" title="Diminuir texto">A−</button><button data-act="font-inc" title="Aumentar texto">A+</button></span>
      <span class="rt-sep"></span>
      <button data-act="width" title="Largura de leitura">↔ Largura</button>
      <button data-act="reading" title="Modo leitura / foco — esconde elementos que distraem">📖 Modo leitura</button>
    </div>
    <div id="navRail" class="nav-rail" aria-label="Navegação"></div>
    <div id="bodyContent" class="mw-content-text mw-parser-output clearfix">
{body}
    </div>
  </div></main>
</div>

<footer class="footer"><div class="footer__inner">
  <div>Conteúdo importado da Wikipédia em português (CC BY-SA). Protótipo acadêmico IHC · UnB 2026/1.</div>
</div></footer>

<script>
  window.WIKI_PAGE = {{
    title: {title_js},
    url: {url_js},
    categories: {cats_js}
  }};
</script>
<script src="../../js/telemetria.js"></script>
<script src="../../js/nav.js"></script>
<script src="../../js/ux.js"></script>
</body>
</html>
"""

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    pages = {}          # norm_title -> (canon_title, html, cats)
    linkcount = {}      # candidato norm -> freq

    print("== buscando sementes ==")
    seed_norms = []
    for s in SEEDS:
        r = fetch(s); time.sleep(0.1)
        if not r: continue
        canon, body, cats = r
        pages[norm(canon)] = (canon, body, cats)
        seed_norms.append(norm(canon))
        # coleta candidatos a partir dos links
        for mm in LINK_RE.finditer(body):
            hh = HREF_WIKI.match(mm.group(2))
            if not hh: continue
            t = urllib.parse.unquote(hh.group(1))
            if ":" in t: continue
            k = norm(t)
            if k and k not in pages:
                linkcount[k] = linkcount.get(k, 0) + 1
        print("  ok:", canon, "(%d links)" % len(list(LINK_RE.finditer(body))))

    # escolhe candidatos mais citados até o teto
    ranked = sorted(linkcount.items(), key=lambda kv: -kv[1])
    need = TARGET_TOTAL - len(pages)
    chosen = [k for k, _ in ranked[:max(need, 0)]]
    print("== buscando %d artigos ligados ==" % len(chosen))
    for k in chosen:
        r = fetch(k); time.sleep(0.1)
        if not r: continue
        canon, body, cats = r
        pages[norm(canon)] = (canon, body, cats)
        print("  ok:", canon)

    # conjunto final de arquivos
    fileset = {k: fname(v[0]) for k, v in pages.items()}

    print("== gerando HTML (%d páginas) ==" % len(pages))
    index_items = []
    for k, (canon, body, cats) in pages.items():
        body2 = rewrite_links(body, fileset)
        cat_objs = [{"title": c} for c in cats[:3]] + [{"title": canon}]
        out = TEMPLATE.format(
            title=htmllib.escape(canon),
            body=body2,
            title_js=json.dumps(canon, ensure_ascii=False),
            url_js=json.dumps(fname(canon), ensure_ascii=False),
            cats_js=json.dumps(cat_objs, ensure_ascii=False),
        )
        with open(os.path.join(OUTDIR, fname(canon)), "w", encoding="utf-8") as f:
            f.write(out)
        index_items.append((canon, fname(canon)))

    # índice/galeria
    index_items.sort(key=lambda x: x[0].lower())
    cards = "\n".join(
        '<a class="page-card" href="%s"><div class="page-card__title">%s</div></a>'
        % (f, htmllib.escape(t)) for t, f in index_items)
    idx = TEMPLATE.format(
        title="Índice de artigos (conteúdo real)",
        body='<p>%d artigos reais da Wikipédia, todos interligados — todos os links '
             'azuis abaixo e dentro dos artigos abrem páginas deste protótipo. '
             'Comece por <a href="%s">Futebol</a> e use a trilha de histórico para voltar.</p>'
             '<div class="page-grid">%s</div>'
             % (len(index_items), fileset.get("Futebol", "Futebol.html"), cards),
        title_js=json.dumps("Índice", ensure_ascii=False),
        url_js=json.dumps("index.html", ensure_ascii=False),
        cats_js=json.dumps([{"title": "Índice de artigos"}], ensure_ascii=False),
    )
    with open(os.path.join(OUTDIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(idx)

    # resumos para os hovercards (chaveados pelo nome de arquivo)
    print("== buscando resumos p/ hovercards ==")
    previews = {}
    for k, (canon, _b, _c) in pages.items():
        previews[fname(canon)] = fetch_summary(canon); time.sleep(0.05)
    with open(os.path.join(OUTDIR, "previews.json"), "w", encoding="utf-8") as f:
        json.dump(previews, f, ensure_ascii=False)
    print("== pronto: %d páginas + previews.json em %s ==" % (len(pages), OUTDIR))

if __name__ == "__main__":
    main()
