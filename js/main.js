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

  /*  SLIDESHOW  */
  var slides       = document.querySelectorAll('.slide');
  var dots         = document.querySelectorAll('.slide-dot');
  var currentSlide = 0;
  var autoSlideTimer;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
   function startAuto() {
    autoSlideTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 4500);
  }

  function stopAuto() {
    clearInterval(autoSlideTimer);
  }

  var btnNext = document.getElementById('slideNext');
  var btnPrev = document.getElementById('slidePrev');

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      stopAuto(); goToSlide(currentSlide + 1); startAuto();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      stopAuto(); goToSlide(currentSlide - 1); startAuto();
    });
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopAuto(); goToSlide(i); startAuto();
    });
  });
