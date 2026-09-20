/* DMC – Deutscher Malinois-Club e.V. · behaviour layer (no dependencies)
   Everything here is progressive enhancement: the site reads and navigates without it. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  /* document-level listeners are tracked so the script can be re-run after a client-side page swap (preview build) */
  if (window.__dmcOff) window.__dmcOff();
  var offs = [];
  window.__dmcOff = function () { offs.forEach(function (f) { f(); }); };
  function on(t, type, fn, cap) { t.addEventListener(type, fn, cap); offs.push(function () { t.removeEventListener(type, fn, cap); }); }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- images: fall back gracefully when a file is missing ---------- */
  function broken(img) {
    var f = img.closest('.fig, .kennel__logo');
    if (f) { f.classList.add('is-broken'); f.classList.remove('has-img'); }
  }
  on(document, 'error', function (e) {
    if (e.target && e.target.tagName === 'IMG') broken(e.target);
  }, true);
  $$('img').forEach(function (i) { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) broken(i); });

  /* ---------- mobile menu ---------- */
  var menu = $('#menu'), openBtn = $('#menu-open'), closeBtn = $('#menu-close');
  function openMenu() { menu.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; closeBtn.focus(); }
  function closeMenu(silent) { if (!menu || menu.hidden) return; menu.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; if (!silent) openBtn.focus(); }
  if (menu && openBtn && closeBtn) {
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', function () { closeMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(true); });
  }
  window.DMC_closeMenu = closeMenu;

  /* ---------- desktop dropdowns (disclosure pattern) ---------- */
  function closeSubs(except) {
    $$('.nav li.open').forEach(function (li) {
      if (li === except) return;
      li.classList.remove('open');
      var b = $('.sub-btn', li); if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  $$('.nav .sub-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.closest('li'), on = !li.classList.contains('open');
      closeSubs(li); li.classList.toggle('open', on); b.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  });
  on(document, 'click', function (e) { if (!e.target.closest('.nav')) closeSubs(null); });
  on(document, 'keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openLi = $('.nav li.open'); closeMenu(false);
    if (openLi) { var b = $('.sub-btn', openLi); closeSubs(null); if (b) b.focus(); }
  });

  /* ---------- generic table filter ---------- */
  $$('[data-filter-table]').forEach(function (inp) {
    var tbl = document.getElementById(inp.getAttribute('data-filter-table'));
    if (!tbl) return;
    var rows = $$('tbody tr', tbl), wrap = tbl.closest('.tbl-wrap');
    var count = document.getElementById(inp.getAttribute('data-count'));
    var empty = document.getElementById(inp.getAttribute('data-empty'));
    var qEl = empty && $('.q', empty);
    var idx = rows.map(function (r) { return r.textContent.toLowerCase().replace(/\s+/g, ' '); });
    function run() {
      var v = inp.value.trim().toLowerCase(), n = 0;
      rows.forEach(function (r, i) { var hit = !v || idx[i].indexOf(v) > -1; r.hidden = !hit; if (hit) n++; });
      if (count) count.textContent = (v ? n + ' von ' : '') + rows.length + (rows.length === 1 ? ' Eintrag' : ' Einträge');
      if (empty) { empty.hidden = n !== 0; if (qEl) qEl.textContent = inp.value.trim(); }
      if (wrap) wrap.hidden = n === 0;
    }
    inp.addEventListener('input', run);
    var reset = empty && $('[data-reset]', empty);
    if (reset) reset.addEventListener('click', function () { inp.value = ''; run(); inp.focus(); });
    run();
  });

  /* ---------- documents filter (accordion lists) ---------- */
  $$('[data-filter-docs]').forEach(function (inp) {
    var root = document.getElementById(inp.getAttribute('data-filter-docs'));
    if (!root) return;
    var items = $$('li[data-doc]', root), dets = $$('details', root);
    var empty = document.getElementById(inp.getAttribute('data-empty'));
    var qEl = empty && $('.q', empty);
    var count = document.getElementById(inp.getAttribute('data-count'));
    var state = dets.map(function (d) { return d.open; });
    function run() {
      var v = inp.value.trim().toLowerCase(), n = 0;
      items.forEach(function (li) { var hit = !v || li.textContent.toLowerCase().indexOf(v) > -1; li.hidden = !hit; if (hit) n++; });
      dets.forEach(function (d, i) {
        var any = !!$('li[data-doc]:not([hidden])', d) || !$('li[data-doc]', d);
        d.hidden = !any; if (v) d.open = any; else d.open = state[i];
      });
      $$('.grp', root).forEach(function (g) {
        var nxt = g.nextElementSibling, vis = false;
        while (nxt && !nxt.classList.contains('grp')) { if (nxt.tagName === 'DETAILS' && !nxt.hidden) vis = true; nxt = nxt.nextElementSibling; }
        g.hidden = !vis;
      });
      if (count) count.textContent = v ? n + ' Treffer' : '';
      if (empty) { empty.hidden = n !== 0; if (qEl) qEl.textContent = inp.value.trim(); }
    }
    inp.addEventListener('input', run);
    var reset = empty && $('[data-reset]', empty);
    if (reset) reset.addEventListener('click', function () { inp.value = ''; run(); inp.focus(); });
  });
  $$('[data-toggle-all]').forEach(function (b) {
    b.addEventListener('click', function () {
      var root = document.getElementById(b.getAttribute('data-toggle-all')), open = b.getAttribute('data-mode') === 'open';
      $$('details', root).forEach(function (d) { if (!d.hidden) d.open = open; });
    });
  });
  /* deep link: open the accordion that a #hash points to */
  function openHash() {
    var h = location.hash && location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (h && h.tagName === 'DETAILS') { h.open = true; }
  }
  on(window, 'hashchange', openHash); openHash();

  /* ---------- Veranstaltungen: Meldestatus + Filter nach Art ---------- */
  function fmtD(iso) { return iso.slice(8) + '.' + iso.slice(5, 7) + '.' + iso.slice(0, 4); }
  function statusInit() {
    var today;
    try { today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' }); } catch (e) { return; }
    $$('.status[data-close]').forEach(function (el) {
      var o = el.getAttribute('data-open'), c = el.getAttribute('data-close'), en = el.getAttribute('data-end'), t = $('.status__t', el), st, txt;
      if (today > en) { st = 'done'; txt = 'Beendet'; }
      else if (today > c) { st = 'closed'; txt = 'Meldeschluss abgelaufen'; }
      else if (today < o) { st = 'soon'; txt = 'Meldung ab ' + fmtD(o); }
      else {
        st = 'open';
        var days = Math.round((Date.parse(c) - Date.parse(today)) / 86400000);
        txt = 'Meldung offen · bis ' + fmtD(c) + (days <= 7 ? (days === 0 ? ' (heute)' : ' (noch ' + days + (days === 1 ? ' Tag)' : ' Tage)')) : '');
      }
      el.setAttribute('data-state', st); if (t) t.textContent = txt;
      var li = el.closest('.ev'); if (li && st === 'done') li.classList.add('is-done');
    });
  }
  statusInit();
  var calEl = $('#cal');
  if (calEl) {
    var chips = $$('.chip', calEl), items = $$('.ev', calEl), months = $$('[data-month]', calEl), cnt = $('#cal-n');
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        var cat = ch.getAttribute('data-cat'), n = 0;
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === ch ? 'true' : 'false'); });
        items.forEach(function (li) { var on = cat === 'all' || li.getAttribute('data-cat') === cat; li.hidden = !on; if (on) n++; });
        months.forEach(function (m) { m.hidden = !$$('.ev', m).some(function (li) { return !li.hidden; }); });
        if (cnt) cnt.textContent = n + (n === 1 ? ' Termin' : ' Termine');
      });
    });
  }

  /* ---------- Landesgruppen: "Mein Bundesland" ---------- */
  var sel = $('#lg-select');
  if (sel) {
    var lgs = $$('.lg'), out = $('#lg-out');
    sel.addEventListener('change', function () {
      var v = sel.value, hit = null;
      lgs.forEach(function (l) {
        var on = !!v && (l.getAttribute('data-states') || '').split('|').indexOf(v) > -1;
        l.setAttribute('data-hit', on ? 'true' : 'false'); if (on) hit = l;
      });
      if (out) out.textContent = v ? (hit ? hit.querySelector('h3').textContent + ' ist für ' + v + ' zuständig.' : 'Für ' + v + ' ist keine Landesgruppe hinterlegt.') : '';
      if (hit) hit.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---------- Geschäftsstelle: open right now? (Mo + Do, 10–15 Uhr, Europe/Berlin) ---------- */
  function updateOpen() {
    var badge = $('#open-badge'), txt = $('#open-text');
    if (!badge || !txt) return;
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var wd = f.filter(function (p) { return p.type === 'weekday'; })[0].value;
      var hh = +f.filter(function (p) { return p.type === 'hour'; })[0].value % 24;
      var mm = +f.filter(function (p) { return p.type === 'minute'; })[0].value;
      var idx = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd], mins = hh * 60 + mm;
      var open = (idx === 1 || idx === 4) && mins >= 600 && mins < 900;
      badge.setAttribute('data-open', open ? 'true' : 'false');
      if (open) { txt.textContent = 'Jetzt geöffnet · bis 15:00 Uhr'; return; }
      var names = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'], next = null;
      for (var i = 0; i <= 7; i++) { var d = (idx + i) % 7; if ((d === 1 || d === 4) && !(i === 0 && mins >= 600)) { next = (i === 0 ? 'heute' : names[d]); break; } }
      txt.textContent = 'Geschlossen · nächste Sprechzeit: ' + next + ' ab 10:00 Uhr';
    } catch (e) { badge.style.display = 'none'; }
  }
  window.DMC_updateOpen = updateOpen; updateOpen();

  /* ---------- history: collapse the chapter list on small screens ---------- */
  var tocd = $('.tocd');
  if (tocd && window.matchMedia && matchMedia('(max-width:959px)').matches) tocd.open = false;

  /* ---------- history: highlight the chapter you are reading ---------- */
  var toc = $$('.hist__toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {}; toc.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { toc.forEach(function (a) { a.removeAttribute('aria-current'); }); var a = map[en.target.id]; if (a) a.setAttribute('aria-current', 'true'); } });
    }, { rootMargin: '-15% 0px -75% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
