document.addEventListener("DOMContentLoaded", () => {

  /* MENU HAMBURGER */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* TROCA DE TEMA */
  const themeBtns = document.querySelectorAll(".theme-btn");

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;

      document.body.classList.remove("tema-branco", "tema-preto");

      if (theme === "branco") {
        document.body.classList.add("tema-branco");
      }

      if (theme === "preto") {
        document.body.classList.add("tema-preto");
      }

      themeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  /* SLIDESHOW */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slide-dot");

  let currentSlide = 0;
  let autoSlide;

  function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  const nextBtn = document.getElementById("slideNext");
  const prevBtn = document.getElementById("slidePrev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  if (slides.length > 0) {
    startAutoSlide();
  }

  /* FORMULÁRIO */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    function showError(input, message) {
      input.classList.add("error");

      const error = input.parentElement.querySelector(".form-error");

      if (error) {
        error.textContent = message;
        error.classList.add("visible");
      }
    }

    function clearError(input) {
      input.classList.remove("error");

      const error = input.parentElement.querySelector(".form-error");

      if (error) {
        error.textContent = "";
        error.classList.remove("visible");
      }
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.querySelectorAll("input, textarea, select").forEach(el => {
      el.addEventListener("input", () => clearError(el));
      el.addEventListener("change", () => clearError(el));
    });

    contactForm.addEventListener("submit", e => {

      e.preventDefault();

      let valid = true;

      const name = document.getElementById("formName");
      const email = document.getElementById("formEmail");
      const empresa = document.getElementById("formEmpresa");
      const setor = document.getElementById("formSetor");
      const mensagem = document.getElementById("formMsg");

      if (name.value.trim().length < 3) {
        showError(name, "Nome deve ter ao menos 3 caracteres.");
        valid = false;
      }

      if (!validateEmail(email.value.trim())) {
        showError(email, "E-mail inválido.");
        valid = false;
      }

      if (empresa.value.trim() === "") {
        showError(empresa, "Informe a empresa.");
        valid = false;
      }

      if (setor.value === "") {
        showError(setor, "Selecione um setor.");
        valid = false;
      }

      if (mensagem.value.trim().length < 20) {
        showError(mensagem, "Mensagem deve ter ao menos 20 caracteres.");
        valid = false;
      }

      if (valid) {
        const success = document.getElementById("formSuccess");

        contactForm.reset();
        contactForm.style.display = "none";

        if (success) {
          success.classList.add("visible");
        }
      }
    });
  }

  /* QUIZ SIMPLES */

  const btnStartQuiz = document.getElementById("btnStartQuiz");

  if (btnStartQuiz) {

    btnStartQuiz.addEventListener("click", () => {

      document.getElementById("quizStart").style.display = "none";
      document.getElementById("quizBody").style.display = "block";

      document.getElementById("quizQuestion").innerText =
        "Qual tecnologia é utilizada pelo InfraWatch para monitoramento em campo?";

      document.getElementById("quizOptions").innerHTML = `
        <button class="quiz-option">Arduino e Sensores IoT</button>
        <button class="quiz-option">Impressora 3D</button>
        <button class="quiz-option">Drone Agrícola</button>
        <button class="quiz-option">Bluetooth Speaker</button>
      `;

      document.querySelectorAll(".quiz-option").forEach(btn => {

        btn.addEventListener("click", () => {

          document.getElementById("quizFeedback").innerHTML =
            btn.innerText === "Arduino e Sensores IoT"
              ? "✅ Resposta correta!"
              : "❌ Resposta incorreta.";

        });

      });

    });

  }

});