document.addEventListener('DOMContentLoaded', function () {

  /* MENU HAMBURGER */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
})

    if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

  /* TROCA DE TEMA */
  var themeBtns = document.querySelectorAll('.theme-btn');

    themeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var theme = btn.getAttribute('data-theme');
      document.body.classList.remove('tema-branco', 'tema-preto');
      if (theme === 'branco') document.body.classList.add('tema-branco');
      if (theme === 'preto')  document.body.classList.add('tema-preto');
      themeBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });