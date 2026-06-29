# 01 — Pesquisa e dados (Avaliação Heurística da Wikipédia)
**Caminhada IHC · UnB 2026/1 · Apresentação final (26/05/2026) · n = 72**

Documento-fonte: *"Caminhada — Avaliação Heurística da Wikipédia · IHC UnB 2026"* (22 slides).
Aqui está **todo o conteúdo da pesquisa** consolidado para uso na apresentação.

## Equipe
Anderson Fernandes da Silva (232000679) · Arthur Soares Parente (232036770) ·
Gustavo da Costa Cintra (232037786) · Gustavo Silva Rodrigues (232036887) ·
Italo Alves Sampaio de Oliveira (232037937).

---

## 1. Tema e objetivo
Avaliação e **redesign da Wikipédia em português**, com foco no público que usa a
enciclopédia **apenas para ler**. Combina inspeção heurística (especialista) com
pesquisa por questionário (usuário), nas versões **desktop (Vetor 2022)** e
**mobile (Minerva)**.

**Objeto de estudo**
| Atributo | Valor |
|---|---|
| Site | pt.wikipedia.org |
| Idioma | Português brasileiro |
| Versões | Vetor 2022 (desktop) + Minerva (mobile) |
| Artigos | ~1,17 milhão |
| Perfil principal | Leitor casual (98%) |
| Recorte | Homepage, artigo, discussão, ajuda |

**Objetivos**
1. Identificar problemas de usabilidade na interface atual.
2. Propor soluções de redesign baseadas nas heurísticas de Nielsen.
3. Validar os achados com questionário aplicado a usuários reais.
4. Prototipar as melhorias.

**Por que a Wikipédia:** um dos sites mais visitados do mundo; +20 anos de decisões
de design acumuladas; 98% dos visitantes só leem, mas a interface expõe ferramentas
de edição para todos; inconsistências herdadas de múltiplas comunidades.

---

## 2. Fluxo de trabalho (5 etapas)
| Etapa | Fase | Envolve | Status |
|---|---|---|---|
| 1 | Nielsen | Selecionar heurísticas e inspecionar a interface | ✓ Concluída |
| 2 | Questionário | Instrumento com 20 perguntas (14–26/05) | ✓ Concluída — n = 72 |
| 3 | Análise | Médias, desvios, Cronbach, Pearson; pergunta aberta | ✓ Concluída |
| 4 | Prototipação | Protótipos em média/alta fidelidade | ↻ Refinamento com dados |
| 5 | Validação | Entrevistar público comparando original × protótipo | ⧗ Em andamento (este protótipo) |

> A coleta superou em 2× a meta original (~30 → **72**).

---

## 3. Público-alvo
| Perfil | Descrição |
|---|---|
| **Leitores casuais** (foco) | Pesquisa/consulta pontual; nunca editaram |
| Leitores frequentes | Acessam semanalmente, predominante desktop |
| Editores ocasionais | Leem e às vezes corrigem |
| Usuários mobile | Acessam por celular/tablet |

Recorte demográfico: 18 a 55+ anos · ensino médio a pós · português (BR) ·
desktop/mobile/tablet · **foco em leitores casuais (98%)**.

---

## 4. Heurísticas escolhidas (de Nielsen)
| # | Heurística | Por que foi escolhida |
|---|---|---|
| **H1** | Consistência e padrões | Label da aba de edição muda silenciosamente entre páginas comuns e protegidas |
| **H2** | Reconhecimento em vez de recordação | **Zero breadcrumbs** — sem indicação visual de onde o usuário está |
| **H3** | Estética e design minimalista | Toolbar de edição exposta a leitores; Discussão com ~40 linhas de boilerplate + sidebar técnica |
| **H4** | Ajuda e documentação | Ajuda no menu hambúrguer; falta onboarding e ajuda contextual |

> **Nota sobre H4:** a Wikipédia já oferece 8 mecanismos de ajuda para logados.
> H4 ficou sob reavaliação — Q15/Q16/Q17 decisivas. Nenhum esforço de prototipação
> foi dedicado a H4 inicialmente.

## 5. Critérios de qualidade de uso
| Critério | Definição | Como aplicamos |
|---|---|---|
| **Usabilidade** | Eficiência + eficácia + satisfação | Likert sobre navegação, clareza, satisfação |
| **Experiência do usuário** | Sentimentos durante a interação | Conforto visual, distração, poluição |
| Acessibilidade | Acesso universal | Contraste, hierarquia de headings, ARIA |
| Comunicabilidade | Clareza de propósito/uso | Terminologia, labels, breadcrumbs, ajuda |

Prioridade: **usabilidade e UX primeiro** (foco no leitor); acessibilidade e
comunicabilidade em paralelo, com peso menor.

## 6. Principais decisões da equipe
- **D1** Wikipédia como objeto (familiaridade + 20 anos de design + 2 públicos na mesma interface).
- **D2** Duas fontes: inspeção heurística (gera hipóteses) + questionário Likert (valida/refuta). Triangulação aumenta confiabilidade.
- **D3** Foco no leitor, não no editor (98% dos visitantes). Edição só entra quando gera ruído visual.
- **D4** Reavaliar o escopo com base nas descobertas (ex.: possível remoção de H4).

---

## 7. Coleta — visão geral
| Métrica | Valor |
|---|---|
| Respondentes | **72** (meta ~30) |
| Dias de coleta | 12 (14–26/05/2026) |
| Respostas válidas à pergunta aberta | 70 |
| Alpha de Cronbach | **> 0,7** em todas as 4 heurísticas |

**Instrumento:** Google Forms · 14–26/05/2026 · 20 perguntas (5 perfil · 12 Likert ·
1 aberta) · escala Likert 1–5 · análise por Média, DP, Cronbach, Pearson.

**Achados em uma frase:** pela Likert, as 4 hipóteses **agregadas foram REFUTADAS**
(limiar média < 3,0). Mas **Q11 (2,89)** e **Q18 (2,89)** ficaram abaixo do limiar.
**44,3%** das respostas abertas citam falta de breadcrumb/orientação — maior
categoria isolada. **H2 segue como prioridade máxima** pelo peso qualitativo.

---

## 8. Perfil dos respondentes
**Idade**
| Faixa | n | % |
|---|---|---|
| 18–24 | 56 | 77,8 |
| 25–34 | 14 | 19,4 |
| 35–44 | 1 | 1,4 |
| 45–54 | 1 | 1,4 |

**Frequência de uso**
| Frequência | n | % |
|---|---|---|
| Algumas vezes por semana | 27 | 37,5 |
| Algumas vezes por mês | 23 | 31,9 |
| Raramente / quase nunca | 16 | 22,2 |
| Diariamente | 6 | 8,3 |

**Escolaridade**
| Nível | n | % |
|---|---|---|
| Superior (em curso) | 64 | 88,9 |
| Superior (completo) | 4 | 5,6 |
| Ensino médio | 3 | 4,2 |
| Pós-graduação | 1 | 1,4 |

**Uso e dispositivo**
| Atributo | n | % |
|---|---|---|
| Apenas leitura / pesquisa | 58 | 80,6 |
| Leitura + edição ocasional | 11 | 15,3 |
| Computador / notebook | 29 | 40,3 |
| Computador + celular | 23 | 31,9 |
| Celular / smartphone | 20 | 27,8 |

---

## 9. Estatísticas descritivas — escala Likert
Limiar de validação: **média < 3,0 confirma a hipótese (problema)**.

| # | Questão (resumida) | Média | DP | Heur. |
|---|---|---|---|---|
| Q7 | Menus/botões/links seguem padrão visual previsível | 3,56 | 1,05 | H1 |
| Q8 | Terminologia clara e consistente | 3,28 | 1,09 | H1 |
| Q9 | Resultado do clique é o esperado | 3,67 | 0,92 | H1 |
| Q10 | Interface mostra onde estou no site | **3,01** | **1,25** | H2 |
| Q11 | Fácil retornar a artigo recente sem forçar memória | **2,89** | 1,01 | H2 |
| Q12 | Opções de navegação/ferramentas sempre visíveis | 3,14 | 1,15 | H2 |
| Q13 | Visual limpo, livre de informação desnecessária | 3,29 | 1,16 | H3 |
| Q14 | Links e sidebars não distraem da leitura | 3,38 | 1,12 | H3 |
| Q15 | Fonte, espaçamento e contraste confortáveis | **3,82** | 1,03 | H3 |
| Q16 | Fácil encontrar a seção de ajuda | 3,12 | 1,21 | H4 |
| Q17 | Páginas de ajuda fáceis de entender | 3,29 | 1,12 | H4 |
| Q18 | Sistema oferece dicas no momento da tarefa | **2,89** | 1,11 | H4 |

- **Pior avaliadas:** Q11 e Q18 (2,89) — únicos itens confirmados individualmente.
- **Melhor avaliada:** Q15 (conforto de leitura, 3,82).
- **Mais polarizada:** Q10 (DP 1,25) — divergência entre quem se localiza e quem não.

## 10. Confiabilidade e correlação
**Alpha de Cronbach** (limiar 0,7)
| Heur. | Itens | Alpha | Interpretação |
|---|---|---|---|
| H1 | 3 | 0,814 | Boa consistência |
| H2 | 3 | 0,724 | Boa consistência |
| H3 | 3 | 0,746 | Boa consistência |
| H4 | 3 | 0,785 | Boa consistência |

Todos > 0,7 → instrumento internamente consistente, resultados confiáveis.

**Correlação de Pearson**
| Par | r | Interpretação |
|---|---|---|
| Q10 × Q11 | 0,41 | Desprezível |
| Q13 × Q14 | 0,67 | Fraca |
| Q16 × Q17 | 0,55 | Fraca |
| Q10 × Q12 | 0,57 | Fraca |

Nenhum par forte → usuários tratam cada aspecto como dimensão independente
(esperado em público heterogêneo).

---

## 11. Hipóteses do time
- **H1.1** — Label da aba muda conforme proteção: artigos "Editar"; Página Principal "Ver código fonte". Sem indicador de proteção. (Q7, Q8)
- **H2.1** — Zero breadcrumbs em todas as páginas; único indicador é o título. (Q9 → na validação, vínculo é Q10/Q11/Q12)
- **H3.1** — Toolbar de edição ("Ler | Editar | Ver histórico" + "Ferramentas") visível a 100% dos visitantes, inclusive os 98% que só leem. (Q13)
- **H3.2** — Página de Discussão com ~40 linhas de boilerplate + sidebar de 10+ links técnicos + threads sem hierarquia. (Q13, Q14)
- **H4.1** — Ajuda escondida no menu hambúrguer, sem ícone de interrogação. (Q16)
- **H4.2** — Zero ajuda contextual no fluxo de edição (sem tooltip/popover/instrução inline). (Q17)

## 12. Validação por heurística
| Heur. | Item | Média | DP | Resultado |
|---|---|---|---|---|
| H1 | Q7 padrão visual | 3,56 | 1,05 | REFUTADA |
| | Q8 terminologia | 3,28 | 1,09 | REFUTADA |
| | Q9 clique esperado | 3,67 | 0,92 | REFUTADA |
| | **Agregado H1** | **3,50** | 1,03 | **REFUTADA** |
| H2 | Q10 mostra onde estou | 3,01 | 1,25 | REFUTADA |
| | Q11 retornar sem memorizar | **2,89** | 1,01 | **CONFIRMADA** |
| | Q12 navegação visível | 3,14 | 1,15 | REFUTADA |
| | **Agregado H2** | **3,01** | 1,14 | **REFUTADA (no limite)** |
| H3 | Q13 visual limpo | 3,29 | 1,16 | REFUTADA |
| | Q14 não distrai | 3,38 | 1,12 | REFUTADA |
| | Q15 conforto | 3,82 | 1,03 | REFUTADA |
| | **Agregado H3** | **3,50** | 1,12 | **REFUTADA** |
| H4 | Q16 achar ajuda | 3,12 | 1,21 | REFUTADA |
| | Q17 ajuda compreensível | 3,29 | 1,12 | REFUTADA |
| | Q18 dicas no momento | **2,89** | 1,11 | **CONFIRMADA** |
| | **Agregado H4** | **3,10** | 1,15 | **REFUTADA** |

→ **2 itens confirmados (Q11, Q18)**, 4 agregados refutados.

## 13. Análise qualitativa — pergunta aberta
*"Se você pudesse mudar apenas uma coisa no visual ou no funcionamento da
Wikipédia, o que seria?"* — 70 respostas válidas.

| Categoria | n | % |
|---|---|---|
| **Breadcrumb / Localização / Orientação** | **31** | **44,3** |
| Nada / satisfeito com a interface | 15 | 21,4 |
| **Excesso de links / Poluição visual** | **9** | **12,9** |
| Ajuda / Tutoriais / Tooltips | 4 | 5,7 |
| Interface antiga / Modernização | 2 | 2,9 |
| Simplificar textos / conteúdo | 2 | 2,9 |
| Outros (abas, **modo escuro**, busca…) | 7 | 10,0 |

**Achado principal:** mesmo com a Likert refutando H2 no agregado, **44,3%** citam
orientação espacial — isolado, o **maior problema declarado**.

Cruzamento Q18 por uso: leitores puros **2,84** · editores ocasionais 3,09 ·
editores frequentes 3,00 → **leitores casuais são os mais afetados** pela falta de
ajuda contextual.

---

## 14. Recomendações finais do PDF (priorização)
| # | Solução | Prioridade |
|---|---|---|
| 1 | S2.1 — Breadcrumb por categorias, último item em negrito | **MÁXIMA** |
| 2 | Ajuda contextual — tooltip no "Editar", onboarding, FAB | MÉDIA |
| 3 | S3.1 + S3.2 — toolbar condicionada ao perfil + Discussão com boilerplate colapsável | MÉDIA-BAIXA |
| 4 | S1.1 — Consistência de labels (H1 refutada) | COSMÉTICA |

**Limitações do estudo**
- Amostra concentrada (77,8% têm 18–24 anos; 88,9% universitários).
- Limiar média < 3,0 é conservador → falsos negativos (H2 quase confirmada).
- Wikipédia tem boa reputação → possível viés de desejabilidade social.

**Nota metodológica:** H2 seria CONFIRMADA com limiar ≤ 3,0 (agregado 3,01).
Combinada aos 44,3% da aberta, a triangulação sustenta prioridade máxima de H2
mesmo com Likert "no limite".

---

> Próximo documento: **[02-analise-dados-para-solucoes.md](02-analise-dados-para-solucoes.md)** —
> como esses dados viraram as soluções do protótipo.
