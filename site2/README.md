# Protótipo de validação — Redesign da Wikipédia (v2)
**Caminhada IHC · UnB 2026/1 · Fase 5 (Validação com usuários)**

Versão evoluída do protótipo, seguindo a **interface realista** já presente neste
diretório (clone fiel da skin Vector 2022) e a **abordagem do projeto
[ihc-spotify](https://github.com/Vitor-Trancoso/ihc-spotify)**: galeria de telas,
comparação controle × redesign e telemetria para análise.

## Como rodar / abrir
Ponto de entrada: `html/index.html`. Sem build, sem servidor obrigatório.
Fluxo de entrevista sugerido: **Esportes → Futebol → Copa do Mundo FIFA**, depois
usar a *trilha de histórico* para voltar.

```
site 2/
├─ html/
│  ├─ index.html              ← galeria/router e início da entrevista
│  ├─ esportes.html           ← artigo (raiz da cadeia de categorias)
│  ├─ futebol.html            ← artigo (nível intermediário)
│  └─ copa-do-mundo-fifa.html ← artigo completo (folha)
├─ css/styles.css             ← design system Vector 2022 + componentes novos
└─ js/
   ├─ nav.js                  ← navegação dupla (histórico + categorias) + toggle A/B
   └─ telemetria.js           ← log de eventos p/ análise (WIKITELE.dump())
```

## O foco: duas navegações

A entrevista qualitativa e o questionário apontaram o mesmo problema central
(**H2 — reconhecimento em vez de recordação**): o usuário **não sabe onde está
nem como voltar**. Q11 ("retornar a um artigo recente sem forçar a memória") =
**2,89 — CONFIRMADA**, e **44,3%** da pergunta aberta citam falta de
orientação/localização (maior categoria isolada). Por isso o redesign entrega
**duas listas de navegação complementares**:

### 1. Trilha de histórico — *"voltar entre os links"* (prioridade máxima)
Barra azul no topo do conteúdo que registra **a ordem real dos cliques** do
usuário (onde esteve → onde chegou), com botão **← Voltar**.

- Implementada em `js/nav.js`, persistida em `localStorage` (`wiki_nav_history`),
  então **funciona entre páginas diferentes**.
- Semântica de **pilha (back-stack)**: clicar num item anterior "volta" a ele e
  descarta o que vinha depois — igual ao botão Voltar do navegador, mas **visível
  e nomeado** ("você está aqui" no item atual).
- Responde diretamente a Q11 e aos 44,3% da pergunta aberta — é o item mais
  importante segundo a fala dos usuários.

### 2. Categorias macro — *onde isto se encaixa*
Trilha hierárquica `Esportes › Futebol › Copa do Mundo FIFA`, situando o assunto
em temas mais amplos. Dá o contexto "macro" pedido na pesquisa, complementando a
localização espacial. Renderizada a partir de `WIKI_PAGE.categories` em cada página.

> As duas barras ficam empilhadas e **rotuladas** ("↩ Você navegou por" e
> "🗂 Categorias") para não se confundirem — uma é o *caminho que você fez*, a
> outra é *a classificação do assunto*.

## Comparação Original × Redesign (toggle A/B)
Botão fixo no canto inferior direito (**Modo: Redesign / Original**). No modo
*Original*, toda a navegação nova é ocultada (`body.mode-original`), simulando a
Wikipédia atual — permite ao entrevistado comparar as duas experiências na mesma
tela, sem trocar de aba para o site real.

## Telemetria (para análise)
`js/telemetria.js` registra cada evento de navegação (`navegar`, `clique_trilha`,
`clique_voltar`, `clique_categoria`, `alternar_modo`) em `localStorage`.
No console do navegador: `WIKITELE.dump()` lista os eventos; `WIKITELE.reset()`
limpa. Útil para medir, na entrevista, quantas vezes o usuário usou a trilha para
voltar.

## Como cada página é configurada
Cada artigo define, antes de carregar `nav.js`:

```html
<div id="navRail" class="nav-rail"></div>   <!-- onde as barras são renderizadas -->
...
<script>
  window.WIKI_PAGE = {
    title: "Copa do Mundo FIFA",
    url: "copa-do-mundo-fifa.html",
    categories: [
      { title: "Esportes", url: "esportes.html" },
      { title: "Futebol",  url: "futebol.html" },
      { title: "Copa do Mundo FIFA" }     // último = atual, sem url
    ]
  };
</script>
<script src="../js/telemetria.js"></script>
<script src="../js/nav.js"></script>
```

Para adicionar uma nova tela: copie um artigo, ajuste conteúdo, `WIKI_PAGE` e os
links — a navegação dupla passa a funcionar automaticamente.

## Melhorias derivadas DOS DADOS (não dos protótipos do PDF)

Os protótipos do PDF foram desenhados **antes** da análise dos resultados. Relendo
os dados (n = 72), priorizamos melhorias que os números realmente sustentam — todas
implementadas nas 43 páginas reais (`js/ux.js` + `css/styles.css`) e **reversíveis
pelo toggle Original × Redesign** para comparação na entrevista.

| Melhoria | Evidência nos dados | O que faz |
|---|---|---|
| **Trilha de histórico + categorias** | Q11 **2,89** (confirmada) · **44,3%** da aberta citam orientação | Já descrito acima — navegação dupla. |
| **Pré-visualização de links (hovercards)** | Q18 **2,89** (confirmada, dica no momento) · reduz desorientação | Ao passar o mouse num link interno, mostra **resumo + foto** do artigo antes de clicar (`previews.json`, dados reais da API). Ajuda o leitor a decidir sem se perder. |
| **Modo leitura / foco** | **12,9%** da aberta = "excesso de links / poluição visual" (2º maior) · Q13/Q14 medianos | Recolhe sidebar, infobox, figuras e deixa os links discretos; centraliza e alarga o texto. Ataca a poluição visual diretamente. |
| **Progresso + seção atual (scrollspy)** | Q10 **3,01**, a **mais polarizada** (DP 1,25) — "onde estou" | Barra de progresso no topo + índice ao vivo na sidebar destacando a **seção atual** conforme rola. Resolve o "onde estou" *dentro* do artigo longo (a trilha resolve entre páginas). |
| **Controles de leitura (tema escuro, texto, largura)** | pedido de **modo escuro** (10% "outros") · amplia Q15 **3,82** (conforto, a maior força do site) | Botões reais de tema claro/escuro, A−/A+ e largura, com preferência salva. Transforma um ponto forte latente em recurso visível. |

### Por que NÃO seguimos algumas ideias do PDF
- **Toolbar condicional ao login / esconder "Ver código fonte"** (H3.1/H1.1): H3 e H1
  foram **refutadas** no questionário. Em vez de mexer na toolbar de edição (que 98%
  não usam), o **Modo leitura** resolve a poluição visual de forma mais ampla e
  alinhada ao que o leitor pediu.
- **Reestruturar a Central de Ajuda** (H4): refutada no agregado e a Wikipédia já tem
  ajuda madura. O sinal real era **Q18 (dica no momento)** — atendido pelos
  **hovercards**, ajuda contextual de verdade para quem só lê.

### Perguntas sugeridas para estas melhorias
1. Passando o mouse num link, a pré-visualização ajudou a decidir se valia a pena abrir?
2. O "Modo leitura" deixou a página mais agradável? Sentiu falta de algo que sumiu?
3. Durante a rolagem, o destaque da seção atual te ajudou a saber onde estava no artigo?
4. Você usaria o tema escuro / ajuste de texto? Em que situação?
5. (com o toggle em **Original**) Comparado a esta versão sem os recursos, o redesign ficou melhor ou pior? Por quê?

## Fidelidade ao design system
Mantida a skin **Vector 2022** já existente (cores Codex `#3366cc`/`#36c`,
títulos serifados, sidebar 250px com sumário recolhível, infobox, wikitables,
catlinks, footer). As únicas adições são os dois componentes de navegação e o
toggle — todos justificados pela pesquisa, sem redesenho do que não é problema.
