# Roteiro de entrevista de UX — Redesign da Wikipédia
**Caminhada IHC · UnB 2026/1 · Fase 5**

Duração estimada: **25–35 min** por participante. Perfil alvo: **leitor casual**
(usa a Wikipédia só para ler/pesquisar, nunca editou).

Estrutura: comparação **original × protótipo**. Sempre que possível, peça que o
participante **pense em voz alta** (think-aloud). Não conduza nem sugira respostas.

---

## 0. Abertura (2 min)

- Explique que avaliamos a *interface*, não a pessoa — não há resposta errada.
- Peça consentimento para gravar tela/áudio.
- Pergunte o aquecimento:
  1. Com que frequência você usa a Wikipédia? Para quê?
  2. Você já editou ou só lê artigos?
  3. Em qual dispositivo costuma acessar?

> *(Mapeia o respondente aos perfis e à frequência do questionário — 80,6% só leem.)*

---

## 1. Linha de base no original (5 min) — `pt.wikipedia.org`

Antes de mostrar o protótipo, observe o comportamento na Wikipédia real.

**Tarefa A — Localização (testa H2 / S2.1):**
> "Abra o artigo da Madonna, depois navegue até um tema mais amplo relacionado
> (ex.: música ou cultura). Como você faria isso?"

Observe: o usuário sente falta de uma trilha? Usa o quê para se localizar?

Perguntas:
1. Em uma palavra, você sabe dizer "onde está" dentro da Wikipédia agora?
2. Se quisesse voltar a um artigo que viu há pouco, como faria?

**Tarefa B — Toolbar (testa H3.1 / S3.1):**
> "Olhando a barra de abas e ferramentas no topo do artigo, o que dessas opções
> você usaria como leitor?"

3. Alguma dessas opções te parece desnecessária ou confusa para quem só lê?

---

## 2. Protótipo — Artigo (10 min) — `artigo.html`

Deixe o participante explorar livre por ~30 s antes de tarefas.

**Tarefa C — Breadcrumb (S2.1, prioridade máxima):**
> "Usando só esta tela, vá de Madonna até o tema 'Música'."

4. Você reparou na trilha no topo? Para que serve, na sua leitura?
5. Comparado ao site original, ficou mais fácil saber onde você está? Por quê?
6. O último item em negrito ("Madonna") comunica algo? O quê?

**Tarefa D — Toolbar condicional (S3.1):**
> "Imagine que você só quer ler. Olhe a barra de ações."  
> *(Depois, ative o toggle "Simular usuário logado" e mostre o menu "···".)*

7. A barra enxuta para leitor te parece melhor ou pior que a do site atual?
8. Esconder as ferramentas técnicas no "···" te incomodaria em algum momento?

**Tarefa E — Ajuda contextual (Q18 / H4):**
> "Você quer entender como editar. O que faria nesta tela?"  
> *(Observe se clica no botão "Editar" e vê o tooltip de 3 passos, no FAB "?" ou
> no banner de onboarding.)*

9. A dica que apareceu no botão "Editar" foi útil no momento certo?
10. O botão flutuante "?" no canto — você o usaria? Em que situação?
11. O banner de boas-vindas ajudaria um iniciante ou atrapalharia?

**Tarefa F — Proteção / label (S1.1):**
12. O selo "🔒 Página semiprotegida" ficou claro? Você entendeu por que algumas
    páginas não podem ser editadas livremente?

---

## 3. Protótipo — Página de Discussão (6 min) — `discussao.html`

> "Entre na aba Discussão. Imagine que quer entender uma conversa sobre o artigo."

13. As regras ficaram recolhidas no topo — isso ajudou a focar na conversa, ou
    você preferiria vê-las abertas?
14. Você consegue dizer quem respondeu a quem? O que indica isso?
15. Comparando com a Discussão do site original (mostre lado a lado), qual te
    parece mais convidativa para participar? Por quê?

---

## 4. Fechamento e comparação geral (5 min)

16. Se pudesse manter **só uma** mudança do protótipo, qual seria? *(replica a
    pergunta aberta do questionário — 44,3% pediram orientação/breadcrumb.)*
17. Houve algo no protótipo que te confundiu ou que você achou desnecessário?
18. Em nota de 0 a 10, quão mais fácil de navegar o protótipo ficou em relação
    ao original? Por quê essa nota?
19. Sentiu falta de alguma coisa que o site original tem e o protótipo não?

---

## Mapa pergunta → evidência (para análise)

| Perguntas | Hipótese / Item | Evidência de origem |
|---|---|---|
| 1, 2, 4–6 | H2 / S2.1 | Q10 (3,01), Q11 (2,89 ✓), 44,3% pergunta aberta |
| 3, 7, 8 | H3.1 / S3.1 | toolbar exposta a 98% leitores; 12,9% "poluição" |
| 9, 10, 11 | H4 / ajuda contextual | Q18 (2,89 ✓), leitores casuais 2,84 |
| 12 | H1.1 / S1.1 | label muda sem aviso (refutada, cosmética) |
| 13–15 | H3.2 / S3.2 | boilerplate + sidebar + threads sem hierarquia |
| 16–19 | geral | triangulação Likert × qualitativo |

✓ = item individualmente CONFIRMADO no questionário (média < 3,0).

## Lembretes ao entrevistador
- Não explique o componente antes de perguntar — veja se o usuário descobre sozinho.
- Anote **falhas de descoberta** (não viu o breadcrumb, não achou o "···").
- Registre citações textuais para a análise qualitativa do relatório final (jul/2026).
