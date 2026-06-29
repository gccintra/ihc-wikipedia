# Protótipos de validação — Redesign da Wikipédia
**Caminhada IHC · UnB 2026/1 · Fase 5 (Validação com usuários)**

Este pacote contém protótipos **HTML interativos** do redesign da Wikipédia em
português, construídos a partir das evidências do estudo (avaliação heurística +
questionário Likert, n = 72). Servem para a entrevista de UX em que o usuário
compara a **interface original** (`pt.wikipedia.org`) com o **protótipo**.

## Como rodar

Abra `index.html` no navegador (não precisa de servidor). A partir dele acesse:

| Arquivo | Tela | O que demonstra |
|---|---|---|
| `artigo.html` | Artigo (Madonna) | Breadcrumb, toolbar condicional, ajuda contextual, onboarding, FAB |
| `discussao.html` | Página de Discussão | Boilerplate colapsável, threads hierárquicas, sidebar removida |
| `ajuda.html` | Central de Ajuda | Destino da ajuda contextual (H4 com escopo reduzido) |

> Dica para a entrevista: no header do artigo há um toggle **"Simular usuário
> logado"** para demonstrar ao vivo a toolbar condicional (S3.1).

---

## Design system seguido — Vector 2022

Os protótipos replicam a skin **Vector 2022** (desktop), atual padrão do
`pt.wikipedia.org`, para que a comparação com o original seja justa. Tokens
recriados em `css/wikipedia.css`:

- **Cores**: link `#3366cc`, link visitado `#795cb2`, link vermelho `#d33`,
  borda de seção `#a2a9b1`, fundo de caixa `#f8f9fa`, botão progressivo `#36c`
  (tokens Codex, o design system oficial da Wikimedia).
- **Tipografia**: títulos em serifada (`Linux Libertine`/Georgia), corpo em
  sans-serif do sistema a 14px — exatamente o contraste da Vector 2022.
- **Layout**: header fixo com logo + busca, sidebar de 176px à esquerda, abas de
  namespace ("Artigo / Discussão") e ações ("Ler / Editar / Histórico").

A regra foi: **mudar o mínimo**. Tudo que não é problema apontado pela pesquisa
permanece idêntico ao original. As alterações abaixo são as únicas, e cada uma
responde a uma evidência específica.

---

## Alterações e por quê (rastreável à pesquisa)

### 1. Breadcrumb por categorias — `S2.1` · prioridade **MÁXIMA**
**Onde:** topo de toda página (`artigo.html`, `discussao.html`).
**O quê:** trilha `Início › Cultura › Música › Cantores › Madonna`, gerada das
categorias do artigo (Wikidata), com o último item em negrito ("você está aqui").

**Por quê:**
- **H2.1** — avaliação heurística achou *zero breadcrumbs* em todas as páginas;
  único indicador de localização era o título (Nielsen #6, reconhecimento > recordação).
- **Q11** (retornar a artigo sem memorizar) = **2,89**, abaixo do limiar 3,0 → **CONFIRMADA**.
- **44,3%** da pergunta aberta citam falta de orientação/localização — a maior
  categoria isolada. A triangulação Likert + qualitativo sustenta prioridade máxima.

### 2. Toolbar condicional ao perfil — `S3.1` · prioridade média-baixa
**Onde:** barra de ações do artigo.
**O quê:** para visitantes (98% só leem), só aparecem **Ler · Editar · Histórico**.
As ferramentas técnicas (Páginas afluentes, Hiperligação permanente…) ficam num
menu **"···"** sob demanda, visível apenas para usuários logados.

**Por quê:**
- **H3.1** — toolbar de edição exposta a 100% dos visitantes gera ruído cognitivo
  (Nielsen #8, estética e design minimalista). H3 foi *refutada* no agregado (3,50),
  por isso prioridade reduzida, mas a solução é barata e alinhada a "excesso de
  links / poluição visual" (12,9% da pergunta aberta).

### 3. Label consistente + estado de proteção — `S1.1` · **cosmética**
**Onde:** botão de edição e subtítulo do artigo.
**O quê:** o label é sempre **"Editar"** (nunca troca para "Ver código fonte"); a
proteção é comunicada por um selo `🔒 Página semiprotegida` + tooltip, em vez de
mudar silenciosamente o rótulo.

**Por quê:**
- **H1.1** — label mudava de "Editar" para "Ver código fonte" sem aviso em páginas
  protegidas (Nielsen #4, consistência). H1 foi *refutada* (Q7 3,56 · Q8 3,28 ·
  Q9 3,67), então fica como melhoria cosmética — incluída por ser baixo custo.

### 4. Ajuda contextual — prioridade **MÉDIA** (H4, escopo reduzido)
Três peças, todas respondendo à **Q18** (dicas no momento da tarefa) = **2,89** →
único item de H4 **CONFIRMADO**. Leitores casuais são os mais afetados (Q18 = 2,84).

- **Tooltip de 3 passos no botão "Editar"** — ajuda inline no fluxo, sem sair da página.
- **Banner de onboarding** ("2 minutos") para visitantes novos.
- **FAB "?" persistente** em qualquer página.

> H4 foi *refutada* no agregado (3,10) e a Wikipédia já tem ecossistema maduro de
> ajuda para logados — por isso **não** reestruturamos a central de ajuda; só
> adicionamos ajuda **proativa/contextual**, exatamente o gap dos dados.

### 5. Página de Discussão enxuta — `S3.2` · prioridade média-baixa
**O quê:** boilerplate institucional (~40 linhas) vira bloco **colapsável**
("Regras e boas práticas"); threads ganham **avatares e indentação** mostrando
quem respondeu a quem; CTA **"+ Adicionar tópico"**; **sidebar técnica removida**.

**Por quê:**
- **H3.2** — boilerplate excessivo + sidebar técnica + threads sem hierarquia
  competem com o conteúdo e desincentivam a participação (Nielsen #8).

---

## O que deliberadamente *não* foi alterado

- Estrutura do header, sidebar, infobox e tipografia — fora do escopo de problemas.
- Central de ajuda não foi reestruturada (H4 refutada + ecossistema já maduro).
- Nada baseado em hipótese sem suporte de dado foi adicionado — o estudo tem viés
  de amostra (77,8% com 18–24 anos; possível desejabilidade social), então
  preferimos poucas mudanças bem fundamentadas a um redesign especulativo.
