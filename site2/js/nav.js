// ============================================================
// Navegação dupla do redesign da Wikipédia
//  (1) Trilha de histórico — "voltar entre os links" (H2 / Q11 / 44,3% aberta)
//  (2) Categorias macro — onde isto se encaixa na enciclopédia
//
// Cada página define antes de carregar este script:
//   window.WIKI_PAGE = {
//     title: "Copa do Mundo FIFA",
//     url: "copa-do-mundo-fifa.html",
//     categories: [ {title:"Esportes",url:"esportes.html"}, ... ]  // último = atual
//   }
// e contém um <div id="navRail" class="nav-rail"></div> onde tudo é renderizado.
// ============================================================
(function () {
  var HKEY = 'wiki_nav_history';   // trilha de visitas (back-stack)
  var MKEY = 'wiki_mode';          // 'redesign' | 'original'
  var page = window.WIKI_PAGE;
  var rail = document.getElementById('navRail');
  if (!page || !rail) return;

  function readHist() { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } }
  function writeHist(h) { try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch (e) {} }

  // --- Registra a página atual com semântica de pilha (back-stack) ----------
  // Se a página já está na trilha, "voltamos" a ela: corta tudo o que vinha depois.
  // Se é nova, empilha no fim.
  function registerCurrent() {
    var h = readHist();
    var idx = h.findIndex(function (e) { return e.url === page.url; });
    var action;
    if (idx === -1) { h.push({ title: page.title, url: page.url }); action = 'avancar'; }
    else { h = h.slice(0, idx + 1); action = (idx === h.length - 1 && idx === readHist().length - 1) ? 'recarregar' : 'voltar'; }
    writeHist(h);
    if (window.WIKITELE) window.WIKITELE.log('navegar', { para: page.title, via: action, profundidade: h.length });
    return h;
  }

  // --- Renderização ---------------------------------------------------------
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function renderHistory(h) {
    var line = el('div', 'nav-line nav-history');
    line.appendChild(el('span', 'nav-line__label', '↩ Você navegou por'));
    if (h.length <= 1) {
      line.appendChild(el('span', 'crumb empty', 'início da navegação — clique nos links para criar sua trilha'));
    }
    h.forEach(function (item, i) {
      if (i > 0) line.appendChild(el('span', 'sep', '›'));
      var isCurrent = (i === h.length - 1);
      if (isCurrent) {
        var c = el('span', 'crumb current', item.title + ' <small>(você está aqui)</small>');
        line.appendChild(c);
      } else {
        var a = el('a', 'crumb');
        a.href = item.url;
        a.textContent = item.title;
        a.addEventListener('click', function () {
          if (window.WIKITELE) window.WIKITELE.log('clique_trilha', { de: page.title, para: item.title });
        });
        line.appendChild(a);
      }
    });
    // Botão "Voltar" — vai um passo atrás na trilha
    var back = el('button', 'back-btn', '← Voltar');
    if (h.length >= 2) {
      var prev = h[h.length - 2];
      back.addEventListener('click', function () {
        if (window.WIKITELE) window.WIKITELE.log('clique_voltar', { de: page.title, para: prev.title });
        location.href = prev.url;
      });
    } else { back.disabled = true; }
    line.appendChild(back);
    return line;
  }

  function renderCategories() {
    var line = el('div', 'nav-line nav-categories');
    line.appendChild(el('span', 'nav-line__label', '🗂 Categorias'));
    var cats = page.categories || [];
    cats.forEach(function (item, i) {
      if (i > 0) line.appendChild(el('span', 'sep', '›'));
      var isLast = (i === cats.length - 1);
      if (isLast) {
        line.appendChild(el('span', 'current', item.title));
      } else if (!item.url) {
        line.appendChild(el('span', 'cat-plain', item.title));   // categoria-pai sem página própria
      } else {
        var a = document.createElement('a');
        a.href = item.url; a.textContent = item.title;
        a.addEventListener('click', function () {
          if (window.WIKITELE) window.WIKITELE.log('clique_categoria', { de: page.title, para: item.title });
        });
        line.appendChild(a);
      }
    });
    return line;
  }

  // --- Toggle Original × Redesign (A/B da entrevista) -----------------------
  function applyMode(mode) {
    document.body.classList.toggle('mode-original', mode === 'original');
  }
  function buildToggle() {
    var mode = localStorage.getItem(MKEY) || 'redesign';
    applyMode(mode);
    var box = el('div', 'mode-toggle');
    var lbl = el('span', null, 'Modo: <strong id="modeLabel">' + (mode === 'original' ? 'Original' : 'Redesign') + '</strong>');
    var btn = el('button', null, 'Alternar');
    btn.addEventListener('click', function () {
      mode = (document.body.classList.contains('mode-original')) ? 'redesign' : 'original';
      localStorage.setItem(MKEY, mode);
      applyMode(mode);
      document.getElementById('modeLabel').textContent = (mode === 'original' ? 'Original' : 'Redesign');
      if (window.WIKITELE) window.WIKITELE.log('alternar_modo', { modo: mode });
    });
    box.appendChild(lbl); box.appendChild(btn);
    document.body.appendChild(box);
  }

  // --- Boot -----------------------------------------------------------------
  var hist = registerCurrent();
  rail.appendChild(renderHistory(hist));
  rail.appendChild(renderCategories());
  buildToggle();
})();
