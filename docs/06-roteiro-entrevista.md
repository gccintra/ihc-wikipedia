# 06 — Roteiro de entrevista de UX (fase 5)
**Validação do redesign com leitores casuais · ~25–35 min/participante.**

Conduza por **think-aloud** (pensar em voz alta). Não sugira respostas. Use o toggle
**Original × Redesign** para comparações na mesma tela. Rode `WIKITELE.reset()` no
início e `WIKITELE.download()` no fim (ver doc 05).

---

## 0. Abertura (2 min)
- Avaliamos a *interface*, não a pessoa. Não há resposta errada. Pode gravar?
- Aquecimento: 1) Com que frequência usa a Wikipédia e para quê? 2) Já editou ou só
  lê? 3) Em qual dispositivo?

## 1. Linha de base — modo Original (5 min)
Deixe o toggle em **Original** (recursos novos escondidos).
> **Tarefa A:** "Abra *Futebol*, vá até *Rugby* e depois até outro artigo ligado.
> Agora volte ao primeiro que você abriu."

Observe: como tenta voltar? Usa o botão do navegador? Se perde?
1. Você sabe dizer onde está dentro da Wikipédia agora?
2. Foi fácil voltar ao artigo anterior? Como fez?
3. Algo na tela te parece poluído ou com links demais?

## 2. Redesign — navegação (8 min)
Alterne para **Redesign**.
> **Tarefa B:** "Refaça o caminho de antes e volte usando a barra azul no topo."
4. Reparou na **trilha de histórico**? Para que serve?
5. Comparado ao Original, ficou mais fácil voltar? Por quê?
6. E a barra **🗂 Categorias** — ajudou a entender em que assunto você estava?
7. (rolando um artigo longo) O **destaque da seção atual** no índice e a barra de
   progresso te ajudaram a saber onde estava na página?

## 3. Redesign — leitura e ajuda (8 min)
> **Tarefa C:** "Antes de clicar num link, descubra do que ele trata."
8. A **pré-visualização (hovercard)** ajudou a decidir se valia abrir? Usaria isso?
> **Tarefa D:** "Deixe a página mais confortável para ler um texto longo."
9. O que você fez? (observe se acha **Modo leitura**, **tema escuro**, tamanho de fonte)
10. O **Modo leitura** deixou melhor? Sentiu falta de algo que sumiu?
11. Você usaria o **tema escuro** / ajuste de texto? Em que situação?

## 4. Comparação e fechamento (6 min)
12. Alternando **Original × Redesign**: qual experiência é melhor para *ler*? Por quê?
13. Se pudesse manter **só uma** das novidades, qual seria? *(replica a pergunta
    aberta do questionário)*
14. Algo confundiu ou pareceu desnecessário?
15. Nota 0–10: quão mais fácil de navegar/ler ficou o Redesign? Por quê essa nota?
16. Sentiu falta de algo que a Wikipédia real tem e o protótipo não?

---

## Mapa pergunta → evidência (para a análise)
| Perguntas | Recurso testado | Dado de origem |
|---|---|---|
| 1, 2, 4–6 | Trilha de histórico + categorias | Q11 2,89 · 44,3% aberta |
| 7 | Progresso + seção atual | Q10 3,01 (DP 1,25) |
| 8 | Hovercards | Q18 2,89 (leitores 2,84) |
| 9, 10 | Modo leitura | 12,9% poluição visual |
| 11 | Controles de leitura | modo escuro (10%) · Q15 3,82 |
| 12–16 | Geral / comparação | triangulação |

## Lembretes ao entrevistador
- Não explique o recurso antes de perguntar — veja se o usuário descobre sozinho.
- Anote **falhas de descoberta** (não viu a trilha, não achou o modo leitura).
- Registre **citações textuais** para a análise qualitativa do relatório final.
- Combine os números da telemetria (doc 05) com as falas — triangulação.

> Volta ao índice: **[README.md](README.md)**.
