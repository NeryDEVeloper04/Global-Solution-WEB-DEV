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
   var slideshowWrap = document.querySelector('.slideshow-wrap');
  var touchStartX = 0;

  if (slideshowWrap) {
    slideshowWrap.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slideshowWrap.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        if (diff > 0) goToSlide(currentSlide + 1);
        else          goToSlide(currentSlide - 1);
        startAuto();
      }
    });
  }

  if (slides.length > 0) startAuto();

  /* FORMULÁRIO COM VALIDAÇÃO*/
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    function showError(inputEl, msg) {
      inputEl.classList.add('error');
      var errEl = inputEl.closest('.form-group').querySelector('.form-error');
      if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
    }

    function clearError(inputEl) {
      inputEl.classList.remove('error');
      var errEl = inputEl.closest('.form-group').querySelector('.form-error');
      if (errEl) errEl.classList.remove('visible');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('input',  function () { clearError(el); });
      el.addEventListener('change', function () { clearError(el); });
    });
  }
