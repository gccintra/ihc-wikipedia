# 05 — Coleta e análise da entrevista (telemetria de cliques)
**Como o protótipo registra o comportamento do usuário e como analisar depois.**

Inspirado na abordagem do projeto de referência (ihc-spotify, que loga interações),
o protótipo tem um módulo de **telemetria** que registra cada ação de navegação e
leitura. Isso permite, na fase de validação, **medir** o comportamento — não só ouvir
a opinião do usuário.

---

## 1. O que é registrado
Tudo fica em `localStorage` (chave `wiki_telemetria`), em ordem cronológica.
Cada evento tem `ts` (ISO) + `action` + campos próprios.

| `action` | Quando dispara | Campos extras |
|---|---|---|
| `navegar` | Página carrega / usuário chega num artigo | `para`, `via` (avancar/voltar/recarregar), `profundidade` |
| `clique_trilha` | Clica num item da trilha de histórico | `de`, `para` |
| `clique_voltar` | Clica no botão **← Voltar** | `de`, `para` |
| `clique_categoria` | Clica numa categoria macro | `de`, `para` |
| `alternar_modo` | Usa o toggle Original × Redesign | `modo` |
| `leitura` | Usa controles de leitura/modo foco | `acao` (theme/width/reading/font-inc/font-dec) |

> Extensível: para logar hovercards, basta chamar `WIKITELE.log('hovercard', {...})`
> dentro do `ux.js` — o pipeline de análise abaixo já agrega qualquer `action`.

## 2. Comandos no console do navegador (F12)
```js
WIKITELE.resumo()    // tabela com contagem por ação
WIKITELE.dump()      // array completo de eventos
WIKITELE.download()  // baixa um .json com tudo (use ao FIM de cada entrevista)
WIKITELE.reset()     // limpa (use ANTES de começar cada participante)
```

## 3. Fluxo recomendado de coleta (por participante)
1. **Antes:** abra a galeria, rode `WIKITELE.reset()` (ou clique "Limpar histórico e
   telemetria" na entrada). Garante que cada participante começa do zero.
2. **Durante:** conduza as tarefas do roteiro (doc 06). Peça think-aloud.
3. **Depois:** rode `WIKITELE.download()` e salve como `p01.json`, `p02.json`, …
   numa pasta (ex.: `analise/dados/`).

> A telemetria fica no navegador do participante. Em entrevista **presencial** ou por
> **compartilhamento de tela**, você mesmo roda o `download()`. Em entrevista remota
> sem acesso, peça ao participante para rodar o comando e enviar o arquivo.

## 4. O que medir (métricas → hipótese)
| Métrica | Como calcular | Valida |
|---|---|---|
| **Uso da trilha para voltar** | nº de `clique_trilha` + `clique_voltar` | H2 / Q11 (retornar sem memorizar) |
| Profundidade média de navegação | média de `profundidade` em `navegar` | engajamento / desorientação |
| Reincidência (voltar) | quantos `navegar` com `via=voltar` | quanto a trilha foi usada |
| Adoção do modo leitura | `leitura` com `acao=reading` | H3 / poluição visual (12,9%) |
| Adoção de tema escuro / fonte | `leitura` com `acao=theme/font-*` | conforto (Q15) / pedido de dark |
| Preferência Original × Redesign | sequência de `alternar_modo` + falas | comparação geral |

## 5. Script de análise (agrega vários participantes)
Coloque os `.json` exportados em `analise/dados/` e rode:

```python
# analise/analisar.py  — só biblioteca padrão
import json, glob, os
from collections import Counter, defaultdict

arquivos = glob.glob(os.path.join(os.path.dirname(__file__), "dados", "*.json"))
por_acao = Counter()
voltar_total = 0
profundidades = []
modos = []

for arq in arquivos:
    eventos = json.load(open(arq, encoding="utf-8"))
    for e in eventos:
        por_acao[e["action"]] += 1
        if e["action"] in ("clique_voltar", "clique_trilha"):
            voltar_total += 1
        if e["action"] == "navegar" and "profundidade" in e:
            profundidades.append(e["profundidade"])
        if e["action"] == "alternar_modo":
            modos.append(e.get("modo"))

print("Participantes:", len(arquivos))
print("Eventos por ação:", dict(por_acao))
print("Usos da trilha p/ voltar:", voltar_total,
      "(média/part.: %.1f)" % (voltar_total / max(1, len(arquivos))))
if profundidades:
    print("Profundidade média de navegação: %.1f" % (sum(profundidades)/len(profundidades)))
print("Alternâncias de modo:", Counter(modos))
```

Saída típica (exemplo ilustrativo):
```
Participantes: 8
Eventos por ação: {'navegar': 71, 'clique_trilha': 19, 'leitura': 22, ...}
Usos da trilha p/ voltar: 24 (média/part.: 3.0)
Profundidade média de navegação: 3.4
Alternâncias de modo: Counter({'original': 8, 'redesign': 8})
```

## 6. Como cruzar com o qualitativo
A telemetria responde **"o que" o usuário fez**; o think-aloud e as perguntas do
roteiro respondem **"por quê"**. Na análise final, combine:
- número de usos da trilha (quantitativo) **+** falas sobre "consegui voltar fácil"
  (qualitativo) → evidência para H2.
- adoção do modo leitura **+** comentários sobre poluição → evidência para H3.

Isso repete, na fase 5, a mesma **triangulação** (especialista + número + usuário)
que guiou todo o projeto.

> Próximo: **[06-roteiro-entrevista.md](06-roteiro-entrevista.md)** — tarefas e
> perguntas para conduzir a sessão.
