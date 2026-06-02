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