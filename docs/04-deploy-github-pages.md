# 04 — Hospedar de graça no GitHub Pages
**Passo a passo para colocar o protótipo no ar (gratuito) e compartilhar o link.**

O protótipo é 100% estático (HTML/CSS/JS + `previews.json`), então o **GitHub Pages**
hospeda sem custo e sem servidor. O link fica público — ótimo para a entrevista
remota e para a apresentação.

---

## ⚠️ Antes de tudo: remover o espaço do nome da pasta
A pasta se chama **`site 2`** (com espaço). Em URL isso vira `site%202`, que funciona
mas é feio e dá problema fácil. **Renomeie para `site2`:**

```bash
git mv "site 2" site2     # se já estiver no git
# ou, fora do git:
mv "site 2" site2
```

Depois disso, **regenere** para garantir caminhos certos (opcional, só se mexer):
```bash
cd site2 && python3 build_wiki.py
```

## Passo 1 — Criar o repositório e subir os arquivos
Se ainda não é um repositório git:
```bash
cd /root/code_projects/ihc_prototipo
git init
git add .
git commit -m "Protótipo de validação — redesign Wikipédia (IHC UnB 2026)"
```

Crie o repositório no GitHub (pelo site ou `gh`):
```bash
gh repo create ihc-wikipedia-redesign --public --source=. --remote=origin --push
# sem gh: crie pelo site, depois:
# git remote add origin https://github.com/SEU_USUARIO/ihc-wikipedia-redesign.git
# git branch -M main && git push -u origin main
```

## Passo 2 — Evitar processamento Jekyll
Crie um arquivo vazio chamado **`.nojekyll`** na raiz (impede o GitHub de ignorar
arquivos/pastas e garante que tudo seja servido como está):
```bash
touch .nojekyll
git add .nojekyll && git commit -m "Add .nojekyll" && git push
```

## Passo 3 — Página de entrada na raiz (link limpo)
Para o link não terminar em `.../site2/html/wiki/...`, crie um `index.html` na **raiz**
do repositório que redireciona para a galeria:
```html
<!DOCTYPE html>
<meta charset="utf-8">
<title>Protótipo — Redesign Wikipédia · IHC UnB 2026</title>
<meta http-equiv="refresh" content="0; url=site2/html/index.html">
<a href="site2/html/index.html">Abrir o protótipo</a>
```
```bash
git add index.html && git commit -m "Index de entrada" && git push
```

## Passo 4 — Ativar o Pages
No GitHub: **Settings → Pages**
- **Source:** *Deploy from a branch*
- **Branch:** `main` · **Folder:** `/ (root)` → **Save**

Aguarde ~1 minuto. O endereço aparece no topo da página:
```
https://SEU_USUARIO.github.io/ihc-wikipedia-redesign/
```
- Entrada (galeria): `https://SEU_USUARIO.github.io/ihc-wikipedia-redesign/`
- Artigo direto: `.../site2/html/wiki/Futebol.html`

## Passo 5 — Testar no ar
Abra o link e confira:
- [ ] Artigos carregam com imagens.
- [ ] Links internos navegam (trilha de histórico cresce).
- [ ] **Hovercards** aparecem ao passar o mouse (depende do `previews.json` ter subido).
- [ ] Tema escuro, modo leitura, scrollspy e toggle Original × Redesign funcionam.

> Se os hovercards não aparecerem, confirme que `site2/html/wiki/previews.json` está
> no repositório (não foi para `.gitignore`).

---

## Alternativa: pasta `/docs` como fonte
O GitHub Pages também pode servir a partir de `/docs`. Como já usamos `docs/` para a
**documentação** (estes Markdowns), **não** recomendo apontar o Pages para `/docs`
aqui — deixe o Pages na raiz e mantenha o protótipo em `site2/`.

## Atualizar o site depois
Qualquer mudança é publicada com um novo push:
```bash
git add -A && git commit -m "ajustes" && git push
```
O Pages reconstrói sozinho em ~1 min.

> Próximo: **[05-coleta-e-analise-da-entrevista.md](05-coleta-e-analise-da-entrevista.md)** —
> como capturar e analisar os cliques do usuário.
