/* Forjar Para el Futuro — interacciones compartidas */
document.addEventListener('DOMContentLoaded', function () {

  /* Año del pie */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Menú móvil */
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  /* Reveal al hacer scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });

  /* Contador de estadísticas */
  var nums = document.querySelectorAll('.stat-num');
  if (nums.length) {
    var fmt = function (n) { return n.toLocaleString('es-CO'); };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el     = e.target;
        var target = +el.dataset.count;
        var start  = performance.now();
        var dur    = 1600;
        (function step(now) {
          var p    = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = fmt(target);
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach(function (n) { cio.observe(n); });
  }

});
