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
    

    portfolioCard.addEventListener("click" , () =>{
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
        portfolioBackdrop.classList.add("active");
      },300);

      setTimeout(()=>{
        portfolioModal.classList.add("active");
      },300);
    });

    modalCloseBtn.addEventListener("click", ()=> {
      setTimeout(()=>{
        portfolioBackdrop.style.display = "none";
      }, 500);

      setTimeout(()=> {
        portfolioBackdrop.classList.remove("active");
        portfolioModal.classList.remove("active");
      },100);
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
    "Cloud Engineer Jr",
    "Mobile & Web Designer"
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