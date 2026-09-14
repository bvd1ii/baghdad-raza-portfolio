(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('baghdad-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('baghdad-portfolio-theme', nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'dark' ? '#0a0908' : '#f4efe6');
  });

  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks?.classList.toggle('open', !open);
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const activePage = document.body.dataset.page;
  document.querySelector(`[data-nav="${activePage}"]`)?.classList.add('active');
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('scrolled', scrollY > 8), { passive: true });

  addEventListener('pointermove', event => {
    root.style.setProperty('--pointer-x', `${event.clientX}px`);
    root.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  const projects = {
    library: { meta: 'C++ · OOP · File Handling', title: 'Library Management System', summary: 'A menu-driven console system that keeps book, member and lending information organised across repeat sessions.', features: ['Add, update and search books', 'Register members and issue books', 'Track returns and availability', 'Save records using files'], learning: 'Class design, encapsulation, validation, file input/output and turning a real process into a clear menu flow.' },
    hostel: { meta: 'C++ · Data Management', title: 'Hostel Management System', summary: 'An academic management program for handling basic resident and room-allocation records.', features: ['Create student records', 'Assign and release rooms', 'Check room availability', 'Review basic fee status'], learning: 'Breaking a larger problem into modules, structured record handling, searching and clean console interaction.' },
    database: { meta: 'SQL · Relational Design', title: 'Campus Records Database', summary: 'A relational model connecting students, courses and enrolments for useful academic queries.', features: ['Normalised table structure', 'Primary and foreign keys', 'JOIN-based reports', 'Insert, update and search queries'], learning: 'Entity relationships, data integrity, query design and avoiding duplicated information.' },
    python: { meta: 'Python · CLI', title: 'Personal Expense Tracker', summary: 'A small command-line utility for recording expenses and understanding basic summaries.', features: ['Add dated transactions', 'Group by category', 'Calculate totals', 'Read and write local data'], learning: 'Python syntax, functions, collections, input validation and simple program structure.' },
    ubuntu: { meta: 'Ubuntu · Shell', title: 'Linux Task Toolkit', summary: 'A compact practical collection of Ubuntu exercises for common operating-system tasks.', features: ['Navigate directories', 'Create, move and remove files', 'Inspect permissions', 'View basic processes'], learning: 'Command-line confidence, filesystem structure, safe file operations and OS fundamentals.' },
    azure: { meta: 'Azure · HTML / CSS', title: 'Cloud Deployment Lab', summary: 'An introductory exercise in preparing and publishing a small responsive static website through Azure.', features: ['Prepare static web files', 'Configure a cloud resource', 'Publish and verify the site', 'Document the deployment steps'], learning: 'Cloud terminology, deployment flow, resource configuration and the difference between local and hosted websites.' }
  };

  const dialog = document.querySelector('#projectDialog');
  const openProject = key => {
    const project = projects[key];
    if (!dialog || !project) return;
    dialog.querySelector('#dialogMeta').textContent = project.meta;
    dialog.querySelector('#dialogTitle').textContent = project.title;
    dialog.querySelector('#dialogSummary').textContent = project.summary;
    dialog.querySelector('#dialogFeatures').innerHTML = project.features.map(item => `<li>${item}</li>`).join('');
    dialog.querySelector('#dialogLearning').textContent = project.learning;
    dialog.showModal();
  };
  document.querySelectorAll('[data-project]').forEach(row => {
    row.addEventListener('click', () => openProject(row.dataset.project));
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(row.dataset.project); }
    });
  });
  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  document.querySelector('#contactForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(`Assalamu Alaikum Baghdad,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);
    document.querySelector('#formNote').textContent = 'Opening your email app…';
    window.location.href = `mailto:baghdadraza2612@gmail.com?subject=${subject}&body=${body}`;
  });
})();
