// Telemetria leve — registra eventos de navegação para análise da entrevista.
// Inspirado na abordagem do repositório ihc-spotify (telemetria.js).
// Guarda em localStorage e espelha no console. Sem dependências.
(function (w) {
  var KEY = 'wiki_telemetria';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function write(arr) { try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {} }

  w.WIKITELE = {
    log: function (action, data) {
      var ev = Object.assign({ ts: new Date().toISOString(), action: action }, data || {});
      var arr = read(); arr.push(ev); write(arr);
      if (w.console) console.debug('[telemetria]', ev);
    },
    dump: function () { return read(); },          // ver no console: WIKITELE.dump()
    reset: function () { write([]); },
    resumo: function () {                            // contagem por ação: WIKITELE.resumo()
      var c = {}; read().forEach(function (e) { c[e.action] = (c[e.action] || 0) + 1; });
      if (w.console) console.table(c);
      return c;
    },
    download: function () {                          // baixa JSON p/ análise: WIKITELE.download()
      var blob = new Blob([JSON.stringify(read(), null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'telemetria-' + new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-') + '.json';
      a.click(); URL.revokeObjectURL(a.href);
    }
  };
})(window);
