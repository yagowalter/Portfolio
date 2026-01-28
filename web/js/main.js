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

  // IntersectionObserver setup (before renderProjects)

  // Projects Data
  const projectsData = [
    {
      id: 1,
      title: "Progress Tracker",
      category: "Web App",
      image: "assets/img/progress-tracker.png",
      tech: ["AWS", "Cloudfront", "CSS", "JavaScript", "CodePipeline"],
      shortDesc: "Progresso das atividades na EDN.",
      longDesc:
        "Rastreador de progresso acadêmico e profissional desenvolvido para acompanhar as atividades do programa Escola da Nuvem (EDN). O sistema organiza KCs, labs práticos e competências profissionais em um dashboard visual, permitindo acompanhar evolução, status de conclusão e progresso geral de forma clara e centralizada.",
      githubUrl: "https://github.com/yagowalter/AWS-Projects/tree/main/aws-progress-tracker",
      siteUrl: "https://progresso.yagowalter.com.br"
    },
    {
      id: 2,
      title: "Portfólio",
      category: "Web App",
      image: "assets/img/portfólio.png",
      tech: ["Antigravity", "Cloudfront", "CodePipeline"],
      shortDesc: "Meu portfólio pessoal.",
      longDesc:
        "Portfólio pessoal desenvolvido com Antigravity, utilizando prompts precisos para criar uma interface moderna e responsiva. Hospedado na AWS com CloudFront, domínio gerenciado pelo Route 53 e deploy automatizado via CodePipeline.",
      githubUrl: "https://github.com/yagowalter/Portfolio",

    },
    {
      id: 3,
      title: "HemoPlanner",
      category: "Mobile App",
      image: "",
      tech: ["-"],
      shortDesc: "-",
      longDesc:
        "-",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 4,
      title: "Em breve..",
      category: "-",
      image: "",
      tech: ["-"],
      shortDesc: "-",
      longDesc:
        "-",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 5,
      title: "Em breve..",
      category: "-",
      image: "",
      tech: ["-"],
      shortDesc: "-",
      longDesc:
        "-",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 6,
      title: "Em breve..",
      category: "-",
      image: "",
      tech: ["-"],
      shortDesc: "-",
      longDesc:
        "-",
      githubUrl: "https://github.com/yagowalter",

    }
  ];

  // Projects Render + Load More
  const projectsContainer = document.getElementById('projects-container');
  let currentProjectPage = 1;
  const projectsPerPage = 3;

  function renderProjects(page = 1) {
    if (!projectsContainer) return;

    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const visibleProjects = projectsData.slice(startIndex, endIndex);

    const newProjectsHTML = visibleProjects.map(project => `
      <article class="project-card-gallery" data-project-id="${project.id}">
        <div class="card-image">
          ${project.image
        ? `<img src="${project.image}" alt="${project.title}">`
        : `<i class="fas fa-folder-open"></i>`
      }
        </div>
        <div class="card-info">
          <p class="card-category">${project.category}</p>
          <h3 class="card-title">${project.title}</h3>
        </div>
      </article>
    `).join('');

    if (page === 1) {
      projectsContainer.innerHTML = newProjectsHTML;
    } else {
      projectsContainer.insertAdjacentHTML('beforeend', newProjectsHTML);
    }

    // Eventos
    document.querySelectorAll('.project-card-gallery').forEach(card => {
      if (card.dataset.listener !== "1") {
        card.addEventListener('click', () => {
          openProjectModal(parseInt(card.dataset.projectId, 10));
        });
        card.dataset.listener = "1";
      }
    });

    renderMoreButton();
  }

  function renderMoreButton() {
    const totalPages = Math.ceil(projectsData.length / projectsPerPage);
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    let sectionFooter = projectsSection.querySelector('.section-footer');

    if (!sectionFooter) {
      sectionFooter = document.createElement('div');
      sectionFooter.className = 'section-footer';
      projectsSection.querySelector('.container')?.appendChild(sectionFooter);
    }

    const existingBtn = sectionFooter.querySelector('.load-more-projects-btn');
    if (existingBtn) existingBtn.remove();

    const button = document.createElement('button');
    button.id = 'load-more-projects';
    button.className = 'btn btn-load-more load-more-projects-btn';

    if (currentProjectPage < totalPages) {
      button.innerHTML = 'Ver Mais <i class="ri-add-line" style="font-size: 1em;"></i>';
      button.disabled = false;
      button.addEventListener('click', () => {
        currentProjectPage++;
        renderProjects(currentProjectPage);
      });
    } else {
      button.innerHTML = 'Todos exibidos <i class="ri-check-line" style="font-size: 1em;"></i>';
      button.disabled = true;
      button.style.opacity = '0.7';
      button.style.cursor = 'default';
    }

    sectionFooter.appendChild(button);
  }

  // Modal
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalGithub = document.getElementById('modal-github');
  const modalSite = document.getElementById('modal-site');


  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !projectModal) return;

    if (project.image) {
      modalImage.src = project.image;
      modalImage.style.display = 'block';
    } else {
      modalImage.src =
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="400" viewBox="0 0 700 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e293b"/><stop offset="100%" style="stop-color:%23334155"/></linearGradient></defs><rect fill="url(%23g)" width="700" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%2364748b" font-size="48" font-family="sans-serif">📁</text></svg>';
      modalImage.style.display = 'block';
    }

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.longDesc;
    modalTech.innerHTML = project.tech.map(t => `<span class="tag">${t}</span>`).join('');
    modalGithub.href = project.githubUrl;

    // 🔗 Site (opcional)
    if (project.siteUrl) {
      modalSite.href = project.siteUrl;
      modalSite.style.display = 'inline-flex';
    } else {
      modalSite.style.display = 'none';
    }


    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  // Init Projects
  renderProjects(1);

  // Certificates "Ver mais"
  const loadMoreCertsBtn = document.getElementById('load-more-certs');
  const certCards = document.querySelectorAll('.cert-card');

  let visibleCerts = 2; // começa mostrando 2
  const step = 2;       // carrega de 2 em 2

  // esconde tudo depois dos 2 primeiros
  certCards.forEach((card, index) => {
    if (index >= visibleCerts) {
      card.classList.add('hidden-force');
    }
  });

  if (loadMoreCertsBtn) {
    loadMoreCertsBtn.addEventListener('click', () => {
      loadMoreCertsBtn.textContent = 'Carregando...';

      setTimeout(() => {
        const nextVisible = visibleCerts + step;

        certCards.forEach((card, index) => {
          if (index < nextVisible) {
            card.classList.remove('hidden-force');
          }
        });

        visibleCerts = nextVisible;

        // acabou os certificados
        if (visibleCerts >= certCards.length) {
          loadMoreCertsBtn.innerHTML =
            'Todos os certificados exibidos <i class="fas fa-check"></i>';
          loadMoreCertsBtn.disabled = true;
          loadMoreCertsBtn.style.opacity = '0.7';
          loadMoreCertsBtn.style.cursor = 'default';
        } else {
          loadMoreCertsBtn.innerHTML =
            'Ver mais Certificados <i class="ri-add-line"></i>';
        }
      }, 400);
    });
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

  if(window.scrollY < 10){
    menuHideBtn.classList.remove("active");

    function scrollStopped(){
      bottomNav.classList.add("active");
    }

    clearTimeout(navTimeout)
    navTimeout = setTimeout(scrollStopped, 3500);
  }

  if(window.scrollY > 10){
    menuHideBtn.classList.add("active");

    function scrollStopped(){
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


