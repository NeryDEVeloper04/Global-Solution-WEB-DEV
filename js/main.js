

document.addEventListener('DOMContentLoaded', function () {

  /*  MENU HAMBURGER  */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /*  TROCA DE TEMA  */
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

  /*  FORMULÁRIO COM VALIDAÇÃO  */
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

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid   = true;
      var nameEl  = document.getElementById('formName');
      var emailEl = document.getElementById('formEmail');
      var empEl   = document.getElementById('formEmpresa');
      var setorEl = document.getElementById('formSetor');
      var msgEl   = document.getElementById('formMsg');

      if (!nameEl.value.trim()) {
        showError(nameEl, 'Informe seu nome.'); valid = false;
      } else if (nameEl.value.trim().length < 3) {
        showError(nameEl, 'Nome deve ter ao menos 3 caracteres.'); valid = false;
      }

      if (!emailEl.value.trim()) {
        showError(emailEl, 'Informe seu e-mail.'); valid = false;
      } else if (!validateEmail(emailEl.value.trim())) {
        showError(emailEl, 'E-mail inválido.'); valid = false;
      }

      if (!empEl.value.trim()) {
        showError(empEl, 'Informe a empresa ou instituição.'); valid = false;
      }

      if (!setorEl.value) {
        showError(setorEl, 'Selecione o setor.'); valid = false;
      }

      if (!msgEl.value.trim()) {
        showError(msgEl, 'Escreva sua mensagem.'); valid = false;
      } else if (msgEl.value.trim().length < 20) {
        showError(msgEl, 'Mensagem muito curta (mínimo 20 caracteres).'); valid = false;
      }

      if (valid) {
        contactForm.style.display = 'none';
        var successEl = document.getElementById('formSuccess');
        if (successEl) successEl.classList.add('visible');
        contactForm.reset();
      }
    });
  }

  /*  QUIZ  */
  var quizData = [
    {
      q: 'Qual é a porcentagem aproximada de água tratada perdida no Brasil antes de chegar à população?',
      opts: ['15%', '24%', '37%', '52%'],
      correct: 2,
      exp: 'Segundo o Instituto Trata Brasil, cerca de 37% da água tratada é perdida — principalmente por vazamentos.'
    },
    {
      q: 'Qual microcontrolador é utilizado pelo LeakTrack para a coleta de dados dos sensores IoT?',
      opts: ['Raspberry Pi', 'Arduino', 'ESP32', 'STM32'],
      correct: 1,
      exp: 'O Arduino é o microcontrolador IoT utilizado para integrar os sensores de campo.'
    },
    {
      q: 'Qual tipo de sensor o LeakTrack utiliza para monitoramento estrutural?',
      opts: ['Sensor de temperatura', 'Sensor de pressão', 'Sensor de vibração', 'Sensor de luminosidade'],
      correct: 2,
      exp: 'O sensor de vibração monitora a integridade estrutural das infraestruturas.'
    },
    {
      q: 'O que são "dados orbitais" no contexto do LeakTrack?',
      opts: [
        'Dados coletados por drones',
        'Dados de satélites usados para sensoriamento remoto',
        'Dados armazenados em servidores na nuvem',
        'Leituras cíclicas dos sensores de campo'
      ],
      correct: 1,
      exp: 'Dados orbitais vêm de satélites e complementam a análise dos sensores físicos em campo.'
    },
    {
      q: 'Qual é o principal objetivo do LeakTrack?',
      opts: [
        'Automatizar reparos de vazamentos remotamente',
        'Substituir funcionários de manutenção por robôs',
        'Detectar anomalias hídricas preventivamente',
        'Medir a qualidade química da água'
      ],
      correct: 2,
      exp: 'O LeakTrack busca detectar sinais de vazamento antes que causem danos visíveis.'
    },
    {
      q: 'Qual ferramenta é utilizada para simulação de circuitos no projeto?',
      opts: ['Tinkercad', 'Wokwi', 'Proteus', 'Fritzing'],
      correct: 1,
      exp: 'O Wokwi é a ferramenta de simulação de circuitos utilizada no desenvolvimento do projeto.'
    },
    {
      q: 'A manutenção preventiva é, em média, quanto mais barata do que a reativa?',
      opts: ['2x', '5x', 'Igual em custo', 'Até 10x'],
      correct: 3,
      exp: 'A manutenção preventiva pode custar até 10x menos do que reparos emergenciais com danos secundários.'
    },
    {
      q: 'Qual é o intervalo de monitoramento dos sensores do LeakTrack?',
      opts: ['Uma vez por dia', 'A cada 6 horas', '24/7 contínuo', 'Somente horário comercial'],
      correct: 2,
      exp: 'Os sensores coletam leituras de forma contínua, 24 horas por dia, 7 dias por semana.'
    },
    {
      q: 'Quais são os dois tipos de sensores físicos utilizados pelo LeakTrack?',
      opts: [
        'Temperatura e pH',
        'Umidade e vibração',
        'Pressão e fluxo',
        'Luminosidade e temperatura'
      ],
      correct: 1,
      exp: 'O LeakTrack utiliza sensores de umidade (anomalias hídricas) e vibração (monitoramento estrutural).'
    },
    {
      q: 'Qual é a sigla que representa a Internet das Coisas, tecnologia central do LeakTrack?',
      opts: ['IDA', 'TIC', 'IoT', 'I2C'],
      correct: 2,
      exp: 'IoT (Internet of Things) conecta os sensores físicos à plataforma de análise.'
    }
  ];

  var quizCurrent  = 0;
  var quizScore    = 0;
  var quizAnswered = false;

  var quizStartEl   = document.getElementById('quizStart');
  var quizBodyEl    = document.getElementById('quizBody');
  var quizResultEl  = document.getElementById('quizResult');
  var quizCounterEl = document.getElementById('quizCounter');
  var quizQEl       = document.getElementById('quizQuestion');
  var quizOptsEl    = document.getElementById('quizOptions');
  var quizFbEl      = document.getElementById('quizFeedback');
  var quizNextBtn   = document.getElementById('quizNext');
  var quizFillEl    = document.getElementById('quizProgressFill');
  var btnStartQuiz  = document.getElementById('btnStartQuiz');
  var btnRestartQ   = document.getElementById('btnRestartQuiz');

  if (!btnStartQuiz) return; // quiz not on page

  function renderQuestion() {
    var q = quizData[quizCurrent];
    quizAnswered = false;
    quizCounterEl.textContent = 'Pergunta ' + (quizCurrent + 1) + ' de ' + quizData.length;
    quizQEl.textContent = q.q;
    quizFbEl.textContent = '';
    quizFbEl.style.color = '';
    quizNextBtn.classList.remove('visible');
    quizFillEl.style.width = ((quizCurrent / quizData.length) * 100) + '%';

    quizOptsEl.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    q.opts.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.type = 'button';
      btn.innerHTML = '<span class="option-letter">' + letters[i] + '</span>' + opt;
      btn.addEventListener('click', function () { selectAnswer(i, btn); });
      quizOptsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btn) {
    if (quizAnswered) return;
    quizAnswered = true;

    var q = quizData[quizCurrent];
    var allBtns = quizOptsEl.querySelectorAll('.quiz-option');

    allBtns.forEach(function (b) { b.disabled = true; });
    allBtns[q.correct].classList.add('correct');

    if (index === q.correct) {
      quizScore++;
      quizFbEl.textContent = '✓ Correto! ' + q.exp;
      quizFbEl.style.color = 'var(--color-accent-2)';
    } else {
      btn.classList.add('wrong');
      quizFbEl.textContent = '✗ Incorreto. ' + q.exp;
      quizFbEl.style.color = '#FF6B7A';
    }

    quizNextBtn.classList.add('visible');
  }

  function showResult() {
    quizBodyEl.style.display = 'none';
    quizResultEl.classList.add('visible');
    quizFillEl.style.width = '100%';

    var pct = Math.round((quizScore / quizData.length) * 100);
    document.getElementById('quizScoreNum').textContent = quizScore + '/' + quizData.length;

    var title, msg;
    if (pct >= 90) {
      title = 'Excelente! 🚀';
      msg = 'Você domina o LeakTrack. Score: ' + pct + '% — praticamente um especialista.';
    } else if (pct >= 70) {
      title = 'Muito bom! 💡';
      msg = 'Bom conhecimento. Score: ' + pct + '% — revise os pontos errados para fixar o conteúdo.';
    } else if (pct >= 50) {
      title = 'Regular 📖';
      msg = 'Score: ' + pct + '% — você tem a base, mas precisa revisar as tecnologias e métricas do projeto.';
    } else {
      title = 'Precisa melhorar 🔧';
      msg = 'Score: ' + pct + '% — releia as seções Tecnologia, Benefícios e Aplicação.';
    }

    document.getElementById('quizResultTitle').textContent = title;
    document.getElementById('quizResultMsg').textContent = msg;
  }

  btnStartQuiz.addEventListener('click', function () {
    quizStartEl.style.display = 'none';
    quizBodyEl.style.display = 'block';
    quizCurrent = 0;
    quizScore = 0;
    renderQuestion();
  });

  quizNextBtn.addEventListener('click', function () {
    quizCurrent++;
    if (quizCurrent < quizData.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  btnRestartQ.addEventListener('click', function () {
    quizResultEl.classList.remove('visible');
    quizBodyEl.style.display = 'none';
    quizStartEl.style.display = 'block';
    quizFillEl.style.width = '0%';
    quizCurrent = 0;
    quizScore = 0;
  });

}); 