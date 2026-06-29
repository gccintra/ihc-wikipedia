// ============================================================
// Melhorias de leitura derivadas dos DADOS da pesquisa (n=72).
//  • Hovercards de link        — Q18 2,89 (dica no momento) + 44,3% orientação
//  • Modo leitura / foco       — 12,9% "excesso de links / poluição visual"
//  • Progresso + seção atual   — Q10 3,01 (mais polarizada, DP 1,25)
//  • Controles de leitura      — modo escuro (10% "outros") + Q15 3,82 conforto
// Funciona nas páginas geradas em html/wiki/. Inerte se faltarem elementos.
// ============================================================
(function () {
  var body = document.body;
  var content = document.getElementById('bodyContent');
  var isOriginal = function () { return body.classList.contains('mode-original'); };

  // ---------- Persistência simples de preferências --------------------------
  function pref(k, v) {
    if (v === undefined) return localStorage.getItem('wiki_' + k);
    localStorage.setItem('wiki_' + k, v);
  }

  // ---------- Controles de leitura (tema / fonte / largura / foco) ----------
  var scale = parseFloat(pref('scale')) || 1;
  function applyScale() { body.style.setProperty('--reader-scale', scale); }
  function applyPrefs() {
    body.classList.toggle('theme-dark', pref('theme') === 'dark');
    applyScale();
    syncButtons();
  }
  function syncButtons() {
    var t = document.querySelector('.reader-tools [data-act="theme"]');
    if (t) t.classList.toggle('on', body.classList.contains('theme-dark'));
    var r = document.querySelector('.reader-tools [data-act="reading"]');
    if (r) r.classList.toggle('on', body.classList.contains('reading-mode'));
  }
  var tools = document.querySelector('.reader-tools');
  if (tools) {
    tools.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'theme') { var d = !body.classList.contains('theme-dark'); body.classList.toggle('theme-dark', d); pref('theme', d ? 'dark' : 'light'); }
      else if (act === 'reading') { body.classList.toggle('reading-mode'); }
      else if (act === 'font-inc') { scale = Math.min(1.5, scale + 0.1); pref('scale', scale); applyScale(); }
      else if (act === 'font-dec') { scale = Math.max(0.8, scale - 0.1); pref('scale', scale); applyScale(); }
      syncButtons();
      if (window.WIKITELE) window.WIKITELE.log('leitura', { acao: act });
    });
  }
  applyPrefs();

  // ---------- Barra de progresso de leitura ---------------------------------
  var prog = document.getElementById('readProgress');
  function onScroll() {
    if (prog) {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      prog.style.width = Math.min(100, (h.scrollTop / max) * 100) + '%';
    }
    spy();
  }

  // ---------- Índice ao vivo + seção atual (scrollspy) ----------------------
  var tocBox = document.getElementById('liveToc');
  var heads = [];
  function headingId(h) {
    if (h.id) return h.id;
    var s = h.querySelector('[id]'); if (s) return s.id;
    var id = 'sec-' + (h.textContent || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    h.id = id; return id;
  }
  function buildToc() {
    if (!tocBox || !content) return;
    var hs = content.querySelectorAll('h2, h3');
    hs.forEach(function (h) {
      var txt = (h.textContent || '').replace(/\[.*?\]/g, '').trim();
      if (!txt) return;
      var id = headingId(h);
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = txt;
      a.className = (h.tagName === 'H3') ? 'lvl-3' : 'lvl-2';
      a.dataset.target = id;
      tocBox.appendChild(a);
      heads.push({ id: id, el: h, link: a });
    });
  }
  function spy() {
    if (!heads.length) return;
    var pos = window.scrollY + 120;
    var cur = heads[0];
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].el.offsetTop <= pos) cur = heads[i]; else break;
    }
    heads.forEach(function (h) { h.link.classList.toggle('active', h === cur); });
  }
  buildToc();

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hovercards (pré-visualização de link) -------------------------
  // Carrega o índice de resumos gerado no build (previews.json).
  var previews = null, card = null, hideTimer = null, curHref = null;
  function ensureCard() {
    if (card) return card;
    card = document.createElement('div');
    card.className = 'hovercard';
    document.body.appendChild(card);
    card.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    card.addEventListener('mouseleave', scheduleHide);
    return card;
  }
  function scheduleHide() { hideTimer = setTimeout(function () { if (card) card.classList.remove('show'); }, 200); }
  function showCard(a) {
    if (isOriginal() || !previews) return;
    var href = a.getAttribute('href');
    var data = previews[href];
    if (!data) return;
    curHref = href;
    var c = ensureCard();
    c.innerHTML =
      (data.thumb ? '<img class="hovercard__img" src="' + data.thumb + '" alt="">' : '') +
      '<div class="hovercard__body"><p class="hovercard__title">' + data.title + '</p>' +
      '<p class="hovercard__extract">' + (data.extract || 'Sem resumo disponível.') + '</p>' +
      '<div class="hovercard__hint">Clique para abrir o artigo</div></div>';
    var r = a.getBoundingClientRect();
    var top = window.scrollY + r.bottom + 6;
    var left = window.scrollX + r.left;
    left = Math.min(left, window.scrollX + document.documentElement.clientWidth - 332);
    c.style.top = top + 'px'; c.style.left = Math.max(8, left) + 'px';
    c.classList.add('show');
  }
  function wireHovercards() {
    if (!content) return;
    content.addEventListener('mouseover', function (e) {
      var a = e.target.closest('a[href$=".html"]');
      if (!a || !content.contains(a)) return;
      clearTimeout(hideTimer);
      showCard(a);
    });
    content.addEventListener('mouseout', function (e) {
      var a = e.target.closest('a[href$=".html"]');
      if (a) scheduleHide();
    });
  }
  fetch('previews.json').then(function (r) { return r.json(); })
    .then(function (j) { previews = j; wireHovercards(); })
    .catch(function () { /* sem previews: ignora */ });
})();
