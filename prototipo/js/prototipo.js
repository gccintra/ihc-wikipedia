// Interações dos protótipos de entrevista UX — Wikipédia redesign
// Mínimo necessário para a navegação ser real durante a entrevista.

document.addEventListener('DOMContentLoaded', function () {

  // --- S3.1: toolbar condicional ao perfil ---------------------------------
  // Deslogado (98% dos visitantes): toolbar enxuta. Logado: ferramentas completas.
  var loginToggle = document.getElementById('loginToggle');
  var toolsMenu   = document.getElementById('toolsMenu');
  var authLink    = document.getElementById('authLink');
  function applyProfile() {
    var logged = loginToggle && loginToggle.checked;
    if (toolsMenu) toolsMenu.style.display = logged ? '' : 'none'; // técnicas só p/ logados
    if (authLink) authLink.textContent = logged ? 'Sua conta' : 'Criar conta';
  }
  if (loginToggle) { loginToggle.addEventListener('change', applyProfile); applyProfile(); }

  // --- Dropdown "···" de ferramentas técnicas ------------------------------
  var toolsBtn = document.getElementById('toolsBtn');
  if (toolsBtn) {
    toolsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toolsMenu.classList.toggle('open');
    });
    document.addEventListener('click', function () { toolsMenu.classList.remove('open'); });
  }

  // --- Ajuda contextual: tooltip de 3 passos no "Editar" (Q18) --------------
  var editBtn = document.getElementById('editBtn');
  var tip     = document.getElementById('editTooltip');
  var tipClose= document.getElementById('tipClose');
  function positionTip() {
    if (!tip || !editBtn) return;
    tip.style.top  = (editBtn.offsetHeight + 10) + 'px';
    tip.style.left = '0px';
  }
  if (editBtn && tip) {
    editBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      positionTip();
      tip.classList.toggle('show');
    });
    tipClose.addEventListener('click', function (e) { e.stopPropagation(); tip.classList.remove('show'); });
    document.addEventListener('click', function (ev) {
      if (tip.classList.contains('show') && !tip.contains(ev.target) && ev.target !== editBtn) tip.classList.remove('show');
    });
  }

  // --- Banner de onboarding -------------------------------------------------
  var onb      = document.getElementById('onboarding');
  var onbClose = document.getElementById('onbClose');
  var onbStart = document.getElementById('onbStart');
  if (onbClose) onbClose.addEventListener('click', function () { onb.style.display = 'none'; });
  if (onbStart) onbStart.addEventListener('click', function () {
    onb.style.display = 'none';
    var fab = document.getElementById('fabPanel');
    if (fab) fab.classList.add('show');
  });

  // --- FAB de ajuda persistente --------------------------------------------
  var fabHelp  = document.getElementById('fabHelp');
  var fabPanel = document.getElementById('fabPanel');
  if (fabHelp && fabPanel) {
    fabHelp.addEventListener('click', function (e) { e.stopPropagation(); fabPanel.classList.toggle('show'); });
    document.addEventListener('click', function (ev) {
      if (fabPanel.classList.contains('show') && !fabPanel.contains(ev.target) && ev.target !== fabHelp) fabPanel.classList.remove('show');
    });
  }

  // --- S3.2: boilerplate colapsável da Página de Discussão ------------------
  var boiler = document.getElementById('boilerToggle');
  if (boiler) {
    boiler.addEventListener('click', function () {
      var body = document.getElementById('boilerBody');
      var open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      boiler.querySelector('.chev').textContent = open ? '▸' : '▾';
    });
  }
});
