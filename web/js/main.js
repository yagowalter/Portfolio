document.addEventListener('DOMContentLoaded', () => {
  // Marca que JS rodou (pra reveal não esconder tudo sem necessidade)
  document.documentElement.classList.add('js');

  // =========================
  // Theme Toggle
  // =========================
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const targetTheme = isLight ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateIcon(targetTheme);
    });
  }

  function updateIcon(theme) {
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (!icon) return;
    icon.className = (theme === 'dark') ? 'fas fa-sun' : 'fas fa-moon';
  }

  // =========================
  // Mobile Menu
  // =========================
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

  // =========================
  // IntersectionObserver (CRUCIAL: antes de renderProjects)
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observa elementos .reveal já existentes no HTML
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // =========================
  // Projects Data
  // =========================
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
      shortDesc: "Meu portifólio pessoal.",
      longDesc:
        "Portfólio pessoal desenvolvido com Antigravity, utilizando prompts precisos para criar uma interface moderna e responsiva. Hospedado na AWS com CloudFront, domínio gerenciado pelo Route 53 e deploy automatizado via CodePipeline.",
      githubUrl: "https://github.com/yagowalter/Portifolio",

    },
    {
      id: 3,
      title: "Em breve...",
      category: "Em breve...",
      image: "",
      tech: ["Em breve..."],
      shortDesc: "Em breve...",
      longDesc:
        "Em breve...",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 4,
      title: "Em breve...",
      category: "Em breve...",
      image: "",
      tech: ["Em breve..."],
      shortDesc: "Em breve...",
      longDesc:
        "Em breve...",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 5,
      title: "Em breve...",
      category: "Em breve...",
      image: "",
      tech: ["Em breve..."],
      shortDesc: "Em breve...",
      longDesc:
        "Em breve... web para gerenciamento de tarefas em equipe. Suporta quadros Kanban, atribuição de tarefas, notificações em tempo real via WebSockets, e integração com Slack. Interface responsiva e drag-and-drop.",
      githubUrl: "https://github.com/yagowalter",

    },
    {
      id: 6,
      title: "Em breve...",
      category: "Em breve...",
      image: "",
      tech: ["Em breve..."],
      shortDesc: "Em breve...",
      longDesc:
        "Em breve...",
      githubUrl: "https://github.com/yagowalter",

    }
  ];

  // =========================
  // Projects Render + Load More
  // =========================
  const projectsContainer = document.getElementById('projects-container');
  let currentProjectPage = 1;
  const projectsPerPage = 3;

  function renderProjects(page = 1) {
    if (!projectsContainer) return;

    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const visibleProjects = projectsData.slice(startIndex, endIndex);

    const newProjectsHTML = visibleProjects.map(project => `
      <article class="project-card-gallery reveal" data-project-id="${project.id}">
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

    // Eventos + observar novos cards
    document.querySelectorAll('.project-card-gallery').forEach(card => {
      if (card.dataset.listener !== "1") {
        card.addEventListener('click', () => {
          openProjectModal(parseInt(card.dataset.projectId, 10));
        });
        card.dataset.listener = "1";
      }
      observer.observe(card);
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

  // =========================
  // Modal
  // =========================
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

  // =========================
  // Init Projects
  // =========================
  renderProjects(1);

  // =========================
  // Certificates "Ver mais"
  // =========================
  const loadMoreCertsBtn = document.getElementById('load-more-certs');
  const certCards = document.querySelectorAll('.cert-card');

  let visibleCerts = 2; // começa mostrando 2
  const step = 2;       // carrega de 2 em 2

  // esconde tudo depois dos 2 primeiros
  certCards.forEach((card, index) => {
    if (index >= visibleCerts) {
      card.style.display = 'none';
    }
  });

  if (loadMoreCertsBtn) {
    loadMoreCertsBtn.addEventListener('click', () => {
      loadMoreCertsBtn.textContent = 'Carregando...';

      setTimeout(() => {
        const nextVisible = visibleCerts + step;

        certCards.forEach((card, index) => {
          if (index < nextVisible) {
            card.style.display = 'flex'; // ou block, dependendo do seu CSS
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


  // =========================
  // Scroll Down Button
  // =========================
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const projectsSection = document.getElementById('contact');
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================
  // Bottom Nav (Chevron + ScrollSpy)
  // =========================
  const bottomNavContainer = document.querySelector('.bottom-nav-container');
  const navToggleChevron = document.querySelector('.nav-toggle-chevron');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  if (bottomNavContainer && navToggleChevron) {
    navToggleChevron.addEventListener('click', () => {
      bottomNavContainer.classList.toggle('closed');
    });

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href')?.includes(current)) item.classList.add('active');
      });
    });

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href')?.substring(1);
        const targetSection = targetId ? document.getElementById(targetId) : null;
        if (targetSection) {
          window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });
  }

  // =========================
  // Hide Bottom Nav when footer appears
  // =========================
  const footer = document.querySelector('.footer');
  if (footer && bottomNavContainer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) bottomNavContainer.classList.add('hidden-by-footer');
        else bottomNavContainer.classList.remove('hidden-by-footer');
      });
    }, { threshold: 0.15 });

    footerObserver.observe(footer);
  }

  // =========================
  // Scroll Up Button
  // =========================
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

  // =========================
  // Hero Sidebars hide/show
  // =========================
  const sidebars = document.querySelectorAll('.hero-side-left, .hero-side-right');
  if (sidebars.length > 0) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) sidebars.forEach(s => s.classList.add('hidden-sidebar'));
      else sidebars.forEach(s => s.classList.remove('hidden-sidebar'));
    });
  }

  // =========================
  // Typing effect (loop)
  // =========================
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


});
