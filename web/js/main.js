document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle Logic
  const themeToggleBtn = document.querySelector(".theme-toggle-btn");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }

  // Initialize
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  themeToggleBtn?.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  });


  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (!icon) return;
      icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  /* =========================
    projetos modal
  ========================= */

  //open/close portfolio modals
  const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

  portfolioCardsWithModals.forEach((portfolioCardsWithModals) => {
    const portfolioCard = portfolioCardsWithModals.querySelector(".portfolio-card");
    const portfolioBackdrop = portfolioCardsWithModals.querySelector(".portfolio-modal-backdrop");
    const portfolioModal = portfolioCardsWithModals.querySelector(".portfolio-modal");
    const modalCloseBtn = portfolioCardsWithModals.querySelector(".modal-close-btn");


    portfolioCard.addEventListener("click", () => {
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
        portfolioBackdrop.classList.add("active");
      }, 300);

      setTimeout(() => {
        portfolioModal.classList.add("active");
      }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
        portfolioBackdrop.style.display = "none";
      }, 500);

      setTimeout(() => {
        portfolioBackdrop.classList.remove("active");
        portfolioModal.classList.remove("active");
      }, 100);
    });
  });



  // Certificates Carousel Logic
  const track = document.querySelector('.certificates-track');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const cards = document.querySelectorAll('.cert-card');

  if (track && prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;

    function getCardsPerView() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      const gap = 1.5 * 16; // 1.5rem gap
      const moveDistance = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${moveDistance}px)`;

      // Update button states
      const maxIndex = Math.max(0, cards.length - getCardsPerView());
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, cards.length - getCardsPerView());
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Resize handling
    window.addEventListener('resize', () => {
      const maxIndex = Math.max(0, cards.length - getCardsPerView());
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateCarousel();
    });

    // Initial state
    setTimeout(updateCarousel, 100);
  }


  // Scroll Down Button
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const projectsSection = document.getElementById('footer');
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const bottomNavContainer = document.querySelector('.bottom-nav-container');
  const menuShowBtn = document.querySelector('.menu-show-btn');
  const menuHideBtn = document.querySelector('.menu-hide-btn');

  if (bottomNavContainer && menuShowBtn && menuHideBtn) {
    menuHideBtn.addEventListener('click', () => {
      bottomNavContainer.classList.add('closed');
    });

    menuShowBtn.addEventListener('click', () => {
      bottomNavContainer.classList.remove('closed');
    });
  }


  // Hide Bottom Nav when footer appears
  const footer = document.querySelector('.yago-footer');
  if (footer && bottomNavContainer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) bottomNavContainer.classList.add('hidden-by-footer');
        else bottomNavContainer.classList.remove('hidden-by-footer');
      });
    }, { threshold: 0.15 });

    footerObserver.observe(footer);
  }

  // Scroll Up Button
  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  if (scrollUpBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) scrollUpBtn.classList.add('visible');
      else scrollUpBtn.classList.remove('visible');
    });

    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const sidebars = document.querySelectorAll('.hero-side-left, .hero-side-right');
  if (sidebars.length > 0) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        sidebars.forEach(s => s.classList.add('hidden-sidebar'));
      } else {
        sidebars.forEach(s => s.classList.remove('hidden-sidebar'));
      }
    });
  }

  // Typing effect (loop)
  const phrases = [
    "Cloud Developer Jr",
    "Web • Cloud • Suporte"
  ];

  const typingEl = document.getElementById("typing");

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 90;
  const deletingSpeed = 50;
  const pauseAfterTyping = 1400;
  const pauseAfterDeleting = 300;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // digitando
      typingEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), pauseAfterTyping);
      }
    } else {
      // apagando letra por letra
      typingEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(() => { }, pauseAfterDeleting);
      }
    }

    setTimeout(
      typeLoop,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

  typeLoop();


  // Experience Timeline (line grows on scroll + cards reveal)
  const timeline = document.getElementById('experience-timeline');

  if (timeline) {
    // Reveal cards
    const timelineCards = timeline.querySelectorAll('.timeline-card');
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.25 });

    timelineCards.forEach(card => tlObserver.observe(card));

    // Line progress
    let ticking = false;

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    const updateTimelineProgress = () => {
      ticking = false;

      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Start filling when the timeline container enters 80% of the viewport (from the top)
      // This means the line starts filling almost immediately as it enters teh screen bottom
      const start = vh * 0.8;

      // Calculate how much of the timeline has been scrolled past relative to the viewport trigger point
      const passed = start - rect.top;

      // Total scrollable height of the timeline logic
      const total = rect.height; // Using full height for simpler calculation relative to line length

      // Progress percentage (0 to 1)
      let progress = passed / total;
      progress = Math.max(0, Math.min(1, progress));

      // Update the height of the fill line
      timeline.style.setProperty('--line-progress', progress.toFixed(4));

      // Calculate the absolute pixel position of the "tip" of the fill line relative to the timeline container top
      const currentFillHeight = progress * rect.height;

      // --- Timeline Items Activation Logic ---
      const timelineItems = timeline.querySelectorAll('.timeline-item');

      timelineItems.forEach(item => {
        // Calculate item's dot position relative to the timeline container
        // We assume the dot is centered vertically in the item or at the top. 
        // Based on CSS .timeline-dot has top: 0, so it's at the very top of each item relative container.
        const itemTop = item.offsetTop;

        // Add a small offset (e.g. 10px) so it activates just as the line hits the dot center
        if (currentFillHeight >= itemTop + 5) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateTimelineProgress);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    // primeira atualização
    updateTimelineProgress();
  }

  /* =========================
   Contact Form -> API Gateway (Lambda + SES)
========================= */
  const contactForm = document.getElementById("yago-contact-form");
  const contactAlert = document.querySelector(".contact-form-alert");
  const submitBtn = contactForm?.querySelector(".submit-btn");

  const API_URL = "https://vfb8tr04ke.execute-api.us-east-1.amazonaws.com/contact";

  const showAlert = (text, isError = false) => {
    if (!contactAlert) return;

    const span = contactAlert.querySelector("span");
    if (span) span.textContent = text;

    // Se quiser estilizar erro depois via CSS, já deixei um hook:
    contactAlert.classList.toggle("is-error", isError);

    contactAlert.style.display = "flex";
    contactAlert.style.opacity = "1";

    // some sozinho depois de uns segundos
    clearTimeout(showAlert._t);
    showAlert._t = setTimeout(() => {
      contactAlert.style.opacity = "0";
      setTimeout(() => (contactAlert.style.display = "none"), 250);
    }, isError ? 5000 : 3500);
  };

  if (contactAlert) {
    // começa escondido
    contactAlert.style.display = "none";
    contactAlert.style.opacity = "0";
  }

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const payload = {
      name: (formData.get("full-name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      subject: (formData.get("subject") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
      source: "portfolio" // opcional, só pra você identificar no backend
    };

    // validação básica (sem frescura)
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      showAlert("Preencha todos os campos obrigatórios.", true);
      return;
    }

    // trava botão durante envio
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // tenta ler JSON se existir
      let data = null;
      try {
        data = await res.json();
      } catch (_) { }

      if (!res.ok) {
        const msg = data?.message || data?.error || "Falha ao enviar. Tente novamente.";
        throw new Error(msg);
      }

      contactForm.reset();
      showAlert("Sua mensagem foi enviada!", false);
    } catch (err) {
      showAlert(err?.message || "Erro ao enviar mensagem.", true);
      console.error("Contact form error:", err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || "Enviar";
      }
    }
  });


});


/* to top btn */

window.addEventListener("scroll", () => {
  const toTopBtn = document.querySelector(".to-top-btn");

  toTopBtn.classList.toggle("active", window.scrollY > 0);

  //scroll indicator bar
  const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

  const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollValue = (pageScroll / height) * 100;

  scrollIndicatorBar.style.height = scrollValue + "%";
});

/* botton nav menu */

/* bottom nav menu (scrollspy decente) */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("main section[id]");
  const mid = window.scrollY + window.innerHeight * 0.45; // “meio” da viewport (ajustável)

  let activeId = null;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (mid >= top && mid < bottom) {
      activeId = section.id;
    }
  });

  if (!activeId) return;

  // remove de todos
  document.querySelectorAll(".bottom-nav .menu a.current")
    .forEach(a => a.classList.remove("current"));

  // adiciona no ativo
  const activeLink = document.querySelector(`.bottom-nav .menu a[href="#${activeId}"]`);
  activeLink?.classList.add("current");
}, { passive: true });


// show bottom nav menu on home

window.addEventListener("DOMContentLoaded", () => {
  const bottomNav = document.querySelector(".bottom-nav");

  bottomNav.classList.toggle("active", window.scrollY < 10);
});

// show/hide menu on scroll
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
  bottomNav.classList.add("active");
  menuShowBtn.classList.remove("active");

  if (window.scrollY < 10) {
    menuHideBtn.classList.remove("active");
    function scrollStopped() {
      bottomNav.classList.add("active");
    }

    clearTimeout(navTimeout)
    navTimeout = setTimeout(scrollStopped, 3500);
  }

  if (window.scrollY > 10) {
    menuHideBtn.classList.add("active");

    function scrollStopped() {
      bottomNav.classList.remove("active");
      menuShowBtn.classList.add("active");
    }

    clearTimeout(navTimeout)
    navTimeout = setTimeout(scrollStopped, 3500);
  }
})

// hide bottom nav on click

menuHideBtn.addEventListener("click", () => {
  bottomNav.classList.toggle("active");
  menuHideBtn.classList.toggle("active");
  menuShowBtn.classList.toggle("active");
});

//show bottom nav on click
menuShowBtn.addEventListener("click", () => {
  bottomNav.classList.toggle("active");
  menuHideBtn.classList.add("active");
  menuShowBtn.classList.toggle("active");
});


/* ==========================
  shrink header on scrollgi
========================== */
window.addEventListener("scroll", () => {
  const yagoHeader = document.querySelector(".yago-header");

  yagoHeader.classList.toggle("shrink", window.scrollY > 0);
});

/* ======================================
  Stack modal open/close
  ====================================*/

const stackCardWithModals = document.querySelectorAll(".stack-container .card-with-modal");

stackCardWithModals.forEach((stackCardWithModals) => {
  const stackCard = stackCardWithModals.querySelector(".stack-card");
  const stackBackDrop = stackCardWithModals.querySelector(".stack-modal-backdrop");
  const stackModal = stackCardWithModals.querySelector(".stack-modal");
  const modalCloseBtn = stackCardWithModals.querySelector(".modal-close-btn");

  stackCard.addEventListener("click", () => {
    stackBackDrop.style.display = "flex";

    setTimeout(() => {
      stackBackDrop.classList.add("active");
    }, 100);

    setTimeout(() => {
      stackModal.classList.add("active");
    }, 300);
  });

  modalCloseBtn.addEventListener("click", () => {
    setTimeout(() => {
      stackBackDrop.style.display = "none";
    }, 500);

    setTimeout(() => {
      stackBackDrop.classList.remove("active");
      stackModal.classList.remove("active");
    }, 100);
  });
});

/* =========================
   Footer Tech Modal (mesmo padrão)
   ========================= */
(() => {
  const backdrop = document.querySelector(".footer-tech-backdrop");
  const modal = document.querySelector(".footer-tech-modal");
  const openBtn = document.querySelector(".footer-tech-trigger");
  const closeBtn = document.querySelector(".footer-tech-close");

  if (!backdrop || !modal || !openBtn || !closeBtn) return;

  const openModal = () => {
    // 1) mostra o backdrop (igual projetos/stack)
    backdrop.style.display = "flex";
    // força reflow para animar opacity
    backdrop.getBoundingClientRect();
    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // 2) delay para o modal dar scale depois (efeito “bonito”)
    setTimeout(() => {
      modal.classList.add("active");
      closeBtn.focus();
    }, 120);
  };

  const closeModal = () => {
    // 1) tira o modal (scale down)
    modal.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // 2) delay para sumir backdrop depois (igual padrão)
    setTimeout(() => {
      backdrop.classList.remove("active");
      backdrop.style.display = "none";
      openBtn.focus();
    }, 250);
  };

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // fecha clicando fora do modal
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  // ESC fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeModal();
    }
  });
})();


/* =========================================
  Scroll reveal JS 
  ======================================*/

/* =========================
   ScrollReveal (SAFE MODE)
========================= */

if (!window.__srInitialized) {
  window.__srInitialized = true;

  ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 900,
    delay: 120,
    easing: 'ease-out'
  });

  ScrollReveal().reveal('.section-title', {
    origin: 'top',
    interval: 300,
  });

  // HERO
  ScrollReveal().reveal('.hero-side-left', { origin: 'left', delay: 300 });
  ScrollReveal().reveal('.hero-side-right', { origin: 'right', delay: 300 });
  ScrollReveal().reveal('.hero-content', { origin: 'top', delay: 500 });

  // STACK (somente o card visível)
  ScrollReveal().reveal('#stack .stack-card', {
    origin: 'bottom',
    interval: 400
  });

  // PORTFOLIO (somente o card visível)
  ScrollReveal().reveal('#portfolio .portfolio-card', {
    origin: 'right',
    interval: 400
  });

  // CERTIFICADOS
  ScrollReveal().reveal('.cert-card', {
    origin: 'bottom',
    interval: 400
  });

  // CONTACT
  ScrollReveal().reveal('.contact-item, .contact-social-links li', {
    origin: 'bottom',
    interval: 300
  });

   ScrollReveal().reveal('.contact-info', {
    origin: 'top',
    interval: 300,
  });

  ScrollReveal().reveal('.contact-form-body', {
    origin: 'right'
  });

  // FOOTER
  ScrollReveal().reveal('.footer-menu-item', {
    origin: 'bottom',
    interval: 200
  });

  ScrollReveal().reveal('.footer-tech-line', {
    origin: 'bottom',
    interval: 200
  });

  ScrollReveal().reveal('.footer-tech-mini', {
    origin: 'bottom',
    interval: 200
  });

  ScrollReveal().reveal('.copy-right', {
    origin: 'bottom',
    interval: 200
  });
}
