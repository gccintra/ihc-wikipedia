# 03 — O protótipo: funcionalidades e arquitetura
**O que foi construído, como funciona e onde está cada coisa.**

O protótipo de validação é um **clone fiel da Wikipédia (skin Vetor 2022)** com
**conteúdo real** importado da própria Wikipédia, acrescido das melhorias derivadas
dos dados (ver doc 02). Roda 100% no navegador, sem backend.

---

## 1. O que o avaliador vê
- **43 artigos reais e interligados** (Futebol, Rugby, Winchester College, FIFA,
  Copa do Mundo e suas edições, seleções, países etc.).
- Texto, infobox, imagens e **links reais** — a navegação entre links funciona
  exatamente como na Wikipédia: todo link azul abre outra página do protótipo.
- Sobre essa base, **5 melhorias** (todas reversíveis pelo toggle Original × Redesign).

## 2. Funcionalidades (e onde aparecem)
| Funcionalidade | Onde / como usar | Arquivo |
|---|---|---|
| **Trilha de histórico** | Barra azul "↩ Você navegou por" acima do conteúdo; clique nos itens ou em **← Voltar** | `js/nav.js` |
| **Categorias macro** | Barra "🗂 Categorias" logo abaixo | `js/nav.js` |
| **Hovercards** | Passe o mouse sobre qualquer link interno → card com resumo + foto | `js/ux.js` + `wiki/previews.json` |
| **Modo leitura / foco** | Botão "📖 Modo leitura" na barra de leitura | `js/ux.js` |
| **Progresso + seção atual** | Barra fina no topo + índice "Conteúdo desta página" que destaca a seção atual ao rolar | `js/ux.js` |
| **Controles de leitura** | Botões "🌙 Tema", "A− / A+", "↔ Largura" | `js/ux.js` |
| **Toggle Original × Redesign** | Botão fixo no canto inferior direito | `js/nav.js` |
| **Telemetria** | Invisível; registra eventos. Console: `WIKITELE.resumo()` | `js/telemetria.js` |

## 3. Como rodar localmente
Precisa de um servidor HTTP simples (por causa do `fetch` do `previews.json` e dos
caminhos relativos — abrir o arquivo direto via `file://` desativa os hovercards).

```bash
cd "site 2"
python3 -m http.server 8000
# abrir: http://localhost:8000/html/wiki/Futebol.html
# ou a galeria: http://localhost:8000/html/index.html
```

**Fluxo sugerido na entrevista:** Futebol → Rugby → Winchester College (ou clique
livre) → usar a trilha para voltar → testar modo leitura, tema escuro, hovercards.

## 4. Arquitetura de arquivos
```
site 2/
├─ build_wiki.py          ← gera as páginas a partir da Wikipédia (ver §5)
├─ README.md              ← visão geral + mapeamento à pesquisa
├─ css/
│  └─ styles.css          ← design system Vetor 2022 + componentes novos + tema escuro
├─ js/
│  ├─ nav.js              ← navegação dupla (trilha + categorias) + toggle A/B
│  ├─ ux.js               ← hovercards, modo leitura, scrollspy, controles de leitura
│  └─ telemetria.js       ← log de eventos (dump/resumo/download/reset)
└─ html/
   ├─ index.html          ← galeria/entrada da entrevista
   ├─ esportes/futebol/copa…  ← demo enxuta antiga (3 telas resumidas, opcional)
   └─ wiki/
      ├─ index.html        ← índice dos 43 artigos
      ├─ previews.json     ← resumos+thumbs p/ hovercards (dados reais)
      ├─ wiki.css          ← ajustes do HTML real importado
      └─ *.html            ← 43 artigos reais
```

> A pasta `prototipo/` na raiz do repositório é a **v1** (tela única "Madonna",
> feita antes do conteúdo real). Pode ser arquivada/ignorada — o entregável é `site 2`.

## 5. Como as páginas são geradas (`build_wiki.py`)
Script Python (só biblioteca padrão) que:
1. Busca artigos reais via **API da Wikipédia** (`action=parse`) a partir de uma
   lista de sementes + os links mais citados (teto de ~46 páginas).
2. **Reescreve os links:** destino dentro do conjunto gerado → link local clicável;
   destino fora → vira texto puro. **Garante zero links quebrados** na página de teste.
3. Embrulha o conteúdo no template Vetor 2022 (header, sidebar, abas, navegação
   dupla, barra de leitura, rodapé) e injeta `WIKI_PAGE` (título, url, categorias).
4. Busca **resumos + thumbnails** (REST summary) e grava `wiki/previews.json` para
   os hovercards.

Regenerar / expandir o conjunto:
```bash
cd "site 2" && python3 build_wiki.py
# editar SEEDS e TARGET_TOTAL no topo do script para mudar quais/quantos artigos
```

## 6. Design system (fidelidade ao Vetor 2022)
- Cores Codex: link `#3366cc`, progressivo `#36c`, bordas `#a2a9b1`, caixas `#f8f9fa`.
- Títulos serifados (Georgia), corpo sans-serif 0,875–0,95rem.
- Header fixo com busca, sidebar 250px com índice recolhível, infobox, wikitables,
  catlinks, rodapé Wikimedia.
- As únicas adições são os componentes de navegação/leitura — nada do que **não** é
  problema na pesquisa foi redesenhado.

## 7. Licença / créditos do conteúdo
O texto e as imagens vêm da Wikipédia em português, sob **CC BY-SA**. O protótipo é
acadêmico (IHC · UnB · 2026/1). O rodapé de cada página credita a origem.

> Próximos: **[04-deploy-github-pages.md](04-deploy-github-pages.md)** (hospedar de
> graça) e **[05-coleta-e-analise-da-entrevista.md](05-coleta-e-analise-da-entrevista.md)**
> (telemetria e análise dos cliques).
