(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var header = document.getElementById('site-header');
  if (header) {
    var toggleHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });
  }

  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  if (!reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      });
    });
  }
})();
