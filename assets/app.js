(function () {
  var fmt = function (n) { return Math.round(n).toLocaleString('en-US') + '$'; };

  // Listings: status tabs + search form
  var cards = Array.prototype.slice.call(document.querySelectorAll('#cards .card'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [data-filter]'));
  var form = document.getElementById('search');
  var noResults = document.getElementById('no-results');
  var state = { status: 'all', type: '', area: '', budget: '' };

  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (state.status === 'all' || c.dataset.status === state.status) &&
        (!state.type || c.dataset.type === state.type) &&
        (!state.area || c.dataset.area === state.area) &&
        (!state.budget || (c.dataset.price && Number(c.dataset.price) <= Number(state.budget)));
      c.hidden = !ok;
      if (ok) shown++;
    });
    if (noResults) noResults.hidden = shown > 0;
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
      state.status = t.dataset.filter;
      apply();
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      state.type = form.type.value;
      state.area = form.area.value;
      state.budget = form.budget.value;
      apply();
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Installment calculator
  var price = document.getElementById('price');
  if (price) {
    var down = document.getElementById('down');
    var years = document.getElementById('years');
    var calc = function () {
      var p = Number(price.value), d = Number(down.value), y = Number(years.value);
      var dv = p * d / 100;
      document.getElementById('o-price').textContent = fmt(p);
      document.getElementById('o-down').textContent = d + '%';
      document.getElementById('o-years').textContent = y + (y > 2 ? ' سنوات' : y === 2 ? ' سنتين' : ' سنة');
      document.getElementById('o-downval').textContent = fmt(dv);
      document.getElementById('o-monthly').textContent = fmt((p - dv) / (y * 12));
    };
    [price, down, years].forEach(function (el) { el.addEventListener('input', calc); });
    calc();
  }

  // Property gallery
  var main = document.getElementById('gallery-main');
  if (main) {
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.thumbs button'));
    var counter = document.getElementById('gallery-counter');
    thumbs.forEach(function (b, i) {
      b.addEventListener('click', function () {
        main.src = b.dataset.src;
        main.alt = b.dataset.alt;
        thumbs.forEach(function (x) { x.setAttribute('aria-current', x === b ? 'true' : 'false'); });
        counter.textContent = (i + 1) + ' / ' + thumbs.length;
      });
    });
  }
})();
