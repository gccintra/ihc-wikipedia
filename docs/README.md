# Documentação — Redesign da Wikipédia (IHC · UnB 2026/1)
**Contexto completo para montar a apresentação ao professor.**

Esta pasta reúne **tudo**: os dados da pesquisa (n = 72), como os dados viraram as
soluções do protótipo, o que foi construído, como hospedar de graça e como analisar
os cliques na entrevista.

## Índice
| # | Documento | Para quê |
|---|---|---|
| 01 | [Pesquisa e dados](01-pesquisa-e-dados.md) | **Todos os dados do PDF**: heurísticas, Likert, Cronbach/Pearson, hipóteses, validação, pergunta aberta, recomendações, limitações |
| 02 | [Da análise às soluções](02-analise-dados-para-solucoes.md) | O **raciocínio**: dado → decisão de design; por que divergimos de parte do PDF |
| 03 | [Protótipo: funcionalidades](03-prototipo-funcionalidades.md) | O que foi construído, como roda, mapa de arquivos, como regenerar |
| 04 | [Deploy no GitHub Pages](04-deploy-github-pages.md) | Hospedar gratuitamente e compartilhar o link |
| 05 | [Coleta e análise da entrevista](05-coleta-e-analise-da-entrevista.md) | Telemetria de cliques + script de análise |
| 06 | [Roteiro de entrevista](06-roteiro-entrevista.md) | Tarefas e perguntas da fase 5 |

## Resumo em 6 frases (para abrir a apresentação)
1. Avaliamos a usabilidade da Wikipédia (Vetor 2022) com foco no **leitor casual** (98% do uso).
2. Triangulamos **inspeção heurística** (4 heurísticas de Nielsen) com **questionário Likert** (n = 72).
3. Os agregados Likert refutaram as 4 hipóteses, mas **Q11 e Q18 (2,89)** confirmaram itens e a **pergunta aberta** revelou as prioridades reais.
4. **44,3%** pediram orientação/localização e **12,9%** reclamaram de poluição visual — os dois maiores problemas declarados.
5. Construímos um protótipo de **conteúdo real** (43 artigos interligados) com 5 melhorias **derivadas dos dados**, não dos protótipos pré-pesquisa.
6. A fase 5 valida o redesign por **entrevista + telemetria** (Original × Redesign), repetindo a triangulação do projeto.

## As 5 melhorias e seu dado (uma linha cada)
- **Trilha de histórico** ← Q11 2,89 + 44,3% (orientação) — *a prioridade nº 1*.
- **Progresso + seção atual** ← Q10 3,01, a mais polarizada (DP 1,25).
- **Modo leitura/foco** ← 12,9% (poluição visual).
- **Hovercards** ← Q18 2,89 (dica no momento; leitores casuais 2,84).
- **Controles de leitura (tema escuro/texto/largura)** ← pedido de dark + Q15 3,82.

---

## Esqueleto sugerido de slides (apresentação final)
1. **Capa** — tema, equipe, n = 72.
2. **Problema e foco** — Wikipédia, 98% leitores, por que importa.
3. **Método** — triangulação (heurística + Likert), 4 heurísticas, critérios.
4. **Coleta** — 72 respondentes, perfil (77,8% 18–24; 80,6% só leem).
5. **Resultados Likert** — tabela das 12 questões; destacar Q11/Q18/Q10/Q15.
6. **Confiabilidade** — Cronbach > 0,7; Pearson sem correlação forte.
7. **Hipóteses × validação** — 2 itens confirmados, 4 agregados refutados.
8. **A virada analítica** — pergunta aberta: 44,3% orientação, 12,9% poluição
   (slide-chave: o que a média escondia).
9. **Das evidências às soluções** — tabela dado → melhoria (doc 02).
10. **Por que mudamos o plano do PDF** — H1/H3/H4 refutadas; foco em ler, não editar.
11. **Demo do protótipo** — conteúdo real + as 5 melhorias (Original × Redesign ao vivo).
12. **Validação (fase 5)** — roteiro + telemetria; o que vamos medir.
13. **Limitações e próximos passos** — viés de amostra; relatório final.
14. **Encerramento** — link do GitHub Pages + créditos.

> Dica: rode a **demo ao vivo** pelo link do Pages, alternando Original × Redesign
> em *Futebol*, mostrando trilha → hovercard → modo leitura → tema escuro.
