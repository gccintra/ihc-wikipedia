# 02 — Da análise dos dados às soluções do protótipo
**Como saímos dos números (n = 72) para o redesign que será validado na entrevista.**

Este documento mostra o **raciocínio**: por que cada solução existe, qual evidência
a sustenta, e — importante — **por que divergimos de parte dos protótipos do PDF**
(eles foram desenhados *antes* da análise dos resultados).

---

## 1. Princípio do método
A equipe usou **triangulação** (D2): a inspeção heurística gera hipóteses
fundamentadas em Nielsen; o questionário Likert as confirma ou refuta com dado real.
A regra de leitura dos dados foi:

- **Confirmado individualmente (média < 3,0)** → problema real, prioridade alta.
- **Refutado, mas com sinal qualitativo forte** → reavaliar; a fala do usuário
  (pergunta aberta) pode pesar mais que o agregado Likert.
- **Refutado e sem sinal qualitativo** → baixar prioridade ou descartar.

O ponto-chave da análise: **o agregado Likert refutou as 4 hipóteses, mas isso é
enganoso**. O limiar < 3,0 é conservador, e dois itens (Q11 e Q18) ficaram abaixo
dele. Mais decisivo: a **pergunta aberta** revelou prioridades que a média escondia.

## 2. Mapa evidência → decisão
| Sinal nos dados | Força | Decisão de design |
|---|---|---|
| **Q11 = 2,89 (confirmada)** "retornar sem memorizar" + **44,3% da aberta** citam orientação | 🔴 Muito forte | **Navegação dupla** (trilha de histórico + categorias) |
| **Q10 = 3,01, DP 1,25** (mais polarizada) "onde estou" | 🟠 Forte | **Progresso + seção atual (scrollspy)** dentro do artigo |
| **12,9% da aberta** "excesso de links / poluição" (2º maior) + Q13/Q14 medianos | 🟠 Forte | **Modo leitura / foco** |
| **Q18 = 2,89 (confirmada)** "dica no momento"; leitores casuais 2,84 | 🟠 Forte | **Hovercards** (pré-visualização de link) |
| **Modo escuro** citado (10% "outros") + **Q15 = 3,82** (maior força) | 🟡 Médio | **Controles de leitura** (tema escuro, texto, largura) |
| H1 agregado 3,50 (refutada) | ⚪ Fraco | Não priorizado (ver §4) |
| H3.1 agregado 3,50 (refutada) | ⚪ Fraco | Substituído pelo Modo leitura (ver §4) |
| H4 agregado 3,10 (refutada), Wikipédia já tem ajuda madura | ⚪ Fraco | Não reestruturar ajuda; só atender Q18 via hovercards |

## 3. As soluções, uma a uma

### 3.1 Navegação dupla — a prioridade nº 1
**Evidência:** Q11 (2,89, confirmada) + 44,3% da pergunta aberta (maior categoria).
A H2 só foi "refutada" no agregado por causa do limiar conservador — a nota
metodológica do próprio PDF diz que com limiar ≤ 3,0 ela seria confirmada.

**Solução (duas listas complementares):**
1. **Trilha de histórico** — registra a ordem real dos cliques ("onde eu estava →
   onde cheguei"), com botão **← Voltar** e marcação "você está aqui". Resolve
   diretamente Q11 (retornar a um artigo recente sem memorizar). Persiste entre
   páginas (localStorage), semântica de pilha.
2. **Categorias macro** — situa o assunto na hierarquia (Esportes › Futebol › …),
   atende o "onde estou" no nível conceitual.

> Por que **duas** e não só o breadcrumb do PDF: o breadcrumb por categorias resolve
> "em que assunto estou", mas **não** resolve "como volto ao que eu estava lendo" —
> que é literalmente o enunciado de Q11. A trilha de histórico é a resposta exata ao
> dado mais forte que temos.

### 3.2 Progresso + seção atual (scrollspy)
**Evidência:** Q10 (3,01) foi a questão **mais polarizada** (DP 1,25) — metade se
localiza, metade não. Em artigos reais (longos, 40+ seções), "onde estou" é tanto
*entre páginas* (resolvido pela trilha) quanto *dentro da página*.
**Solução:** barra de progresso de leitura no topo + índice ao vivo na sidebar que
**destaca a seção atual** conforme o usuário rola. Dá orientação contínua intra-artigo.

### 3.3 Modo leitura / foco
**Evidência:** "excesso de links / poluição visual" foi o **2º maior** problema
declarado (12,9%); Q13 (3,29) e Q14 (3,38) ficaram medianos.
**Solução:** um modo que recolhe sidebar, infobox e figuras, deixa os links
discretos e centraliza/alarga o texto. Ataca a poluição diretamente e **amplia a
maior força do site** (Q15 = 3,82, conforto de leitura).

### 3.4 Hovercards (pré-visualização de link)
**Evidência:** Q18 (2,89, confirmada) — falta "ajuda/dica no momento da tarefa";
para quem **só lê**, a "tarefa" é decidir o que abrir sem se perder (liga-se a H2).
**Solução:** ao passar o mouse num link interno, um card mostra **resumo + foto** do
artigo de destino. É ajuda contextual real, no exato momento da decisão — e usa
dados reais (resumos da própria Wikipédia). Recurso moderno, já existente na
Wikipédia (Page Previews), aqui tornado central.

### 3.5 Controles de leitura (tema escuro, texto, largura)
**Evidência:** "modo escuro" aparece entre os pedidos (categoria "outros", 10%);
Q15 (3,82) mostra que conforto de leitura é o que o usuário mais valoriza.
**Solução:** botões reais e visíveis de tema claro/escuro, tamanho de fonte e
largura, com preferência salva. Transforma um recurso escondido no menu "Aparência"
em algo descoberto e usável.

## 4. Por que NÃO seguimos parte dos protótipos do PDF
Os protótipos S1.1, S3.1 e S3.2 foram criados na fase de inspeção, **antes** de ler
os resultados. Os dados pedem outra coisa:

- **S1.1 (label consistente)** — H1 foi refutada (Q7/Q8/Q9 todas ≥ 3,28). É problema
  cosmético; não justifica esforço de validação. **Descartado da priorização.**
- **S3.1 (toolbar condicionada ao login)** — H3 refutada (agregado 3,50). Mexer na
  toolbar de edição beneficia pouco os 98% que só leem. O dado real de poluição
  (12,9%) é mais bem atendido por um **Modo leitura** amplo. **Substituído.**
- **S3.2 / reestruturar a Central de Ajuda (H4)** — H4 refutada (3,10) e a Wikipédia
  já tem 8 mecanismos de ajuda maduros. O único sinal real é **Q18 (dica no
  momento)**, atendido pelos **hovercards**. **Não reestruturamos a ajuda.**

> Resumo da virada analítica: **menos "consertar a edição" (que quase ninguém usa) e
> mais "potencializar a leitura"** (que é 98% do uso e onde estão os dados fortes:
> orientação, poluição, dica no momento, conforto).

## 5. Comparação na entrevista (A/B)
Cada recurso é **reversível** por um botão **Original × Redesign**. No modo
*Original*, todos os recursos novos somem e a página fica como a Wikipédia atual —
permitindo ao entrevistado comparar as duas experiências na mesma tela, sem trocar
para o site real. A telemetria (ver doc 05) registra qual modo estava ativo e como
o usuário navegou.

## 6. Rastreabilidade (resumo de uma linha)
| Solução | Heurística | Itens/sinais | Status do dado |
|---|---|---|---|
| Trilha de histórico | H2 | Q11 + 44,3% aberta | confirmado/forte |
| Categorias macro | H2 | Q10/Q12 + orientação | suporte |
| Scrollspy + progresso | H2 | Q10 (DP 1,25) | polarizado/forte |
| Modo leitura | H3 | 12,9% aberta + Q13/Q14 | qualitativo forte |
| Hovercards | H4/H2 | Q18 (2,84 leitores) | confirmado |
| Controles de leitura | H3 | modo escuro + Q15 | médio/amplifica força |

> Próximo: **[03-prototipo-funcionalidades.md](03-prototipo-funcionalidades.md)** —
> o que foi construído e como roda.
