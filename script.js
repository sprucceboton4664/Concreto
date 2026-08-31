// CONCRETO — interacciones y catálogo de contenido
(function () {
  'use strict';

  const WHATSAPP_NUMBER = '59173447992';
  const tiktokUrls = [
    'https://www.tiktok.com/@reynaldozambrana/video/7675577783162129681',
    'https://www.tiktok.com/@reynaldozambrana/video/7672484062254189841',
    'https://www.tiktok.com/@reynaldozambrana/video/7671824990609739024',
    'https://www.tiktok.com/@reynaldozambrana/video/7669099687353339137',
    'https://www.tiktok.com/@reynaldozambrana/video/7667625547219946753',
    'https://www.tiktok.com/@reynaldozambrana/video/7661360636080819473',
    'https://www.tiktok.com/@reynaldozambrana/video/7658088461471141136',
    'https://www.tiktok.com/@reynaldozambrana/video/7655063916032101649',
    'https://www.tiktok.com/@reynaldozambrana/video/7653853809625566481',
    'https://www.tiktok.com/@reynaldozambrana/video/7653263674332695824',
    'https://www.tiktok.com/@reynaldozambrana/video/7652004822564015361',
    'https://www.tiktok.com/@reynaldozambrana/video/7646931294856760593',
    'https://www.tiktok.com/@reynaldozambrana/video/7645809425768271120',
    'https://www.tiktok.com/@reynaldozambrana/video/7641284905065909520',
    'https://www.tiktok.com/@reynaldozambrana/video/7638275291210681601',
    'https://www.tiktok.com/@reynaldozambrana/video/7614968914707090689',
    'https://www.tiktok.com/@reynaldozambrana/video/7610925103789903121'
  ];
  const videoCatalog = [
    ['Primeros pasos con CONCRETO', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Criterios básicos de predimensionamiento', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/LogoPrediceno.jpg'],
    ['Predimensionamiento de losa reticular en obra', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Conoce la app Muro de Contención', 'muro', 'Muro de Contención', 'TikTok', 'Fotos/BannerMuros.jpg'],
    ['Muro de Contención: ejemplo de uso', 'muro', 'Muro de Contención', 'TikTok', 'Fotos/LogoMuros.jpg'],
    ['¿Tu construcción es sismo resistente?', 'elementos', 'Calculadora de Elementos', 'TikTok', 'Fotos/BannerCalculadora.jpg'],
    ['Muro de Contención: cómo funciona la app', 'muro', 'Muro de Contención', 'TikTok', 'Fotos/LogoMuros.jpg'],
    ['Prediseño de Edificios: guía de uso', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Prediseño de Edificios: ejemplo completo', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/LogoPrediceno.jpg'],
    ['Actualización: radier con capiteles invertidos', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Cálculo rápido de losa casetonada y fundación', 'elementos', 'Calculadora de Elementos', 'TikTok', 'Fotos/LogoCalculadora.jpg'],
    ['Cómo definir el espesor correcto de una losa', 'elementos', 'Calculadora de Elementos', 'TikTok', 'Fotos/LogoCalculadora.jpg'],
    ['Carga mínima de diseño en obra', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/LogoPrediceno.jpg'],
    ['Cargas de diseño para cubiertas', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Separación de correas según carga de granizo', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Geometría de cubiertas: criterios de verificación', 'prediseno', 'Prediseño de Edificios', 'TikTok', 'Fotos/BannerPrediseno.jpg'],
    ['Losa casetonada: espesor y nervios', 'elementos', 'Calculadora de Elementos', 'TikTok', 'Fotos/LogoCalculadora.jpg']
  ].map(([title, category, app, platform, thumbnail], index) => ({ title, category, app, platform, thumbnail, url: tiktokUrls[index] }));

  const youtubeGroups = [
    ['Cubiertas, cargas y vigas', ['jY9YrDshu8k','mJzd8Rl7uuY','QRBD7pbXRkc','oYE-PtOE7F0','p00uePDfst8','fSQeXd7cjzE','bcr0QYpYYbY','gpxLlPsYW-U','Yyt_7-xep6Q','cTeEzyb8mBw'], ['Colapso de cubierta por granizo','Módulo correcto E de concreto','Verificando flecha máxima en cubiertas','Separación entre correas o largueros','Distancia entre cordón superior e inferior','Razones del colapso de cubiertas','Momento último: viga de equilibrio','Momento último: viga de equilibrio, parte 1','Winkler y momento último en viga de equilibrio','Cargas: análisis']],
    ['Bitácora de ingeniería', ['iJOFJ798mYs','7klCIjLmKfY','ZhKRC1ZLG_0','4D3yMMJHX6w','_8OtpfEYp0Q','s4JG76UZyI4','1gRyDwFuHOU','r33Wd0ZBgag','7l0yCtfgFOA','RRDgDsiLuIw','nhKdSiu6iBU','BHKxTzD9Ho4','PRzU7Bf0wv0','oZLUbaS9jEo','oFrpW4gxjfs','ZdwmbbVZuXA','hsYiATNHtDM','PBrAdW_poqU','q99bT-h82aM','qsgd5eus-Vw','34Uxew8OjEk','UtRJ9Q_1I64','pG1OGK39ePU','c7tyhTPdjWQ','95jtzhE9dRI','PpkeyJictKs','ruq5yj8g9Ms'], null],
    ['Muros de contención', ['gj79PkONwm8','2dC_09H-ui4','Am3td5vkeq8','jVQTJaRwci4','XNpkcMNlYr0','18C7MGn19iY'], ['Muros de contención · parte 4','Muros de contención · parte 3','Muros de contención · parte 2','Muros de contención · parte 1','Diseño de elevación de muro HA2','Diseño de elevación de muro HA1']],
    ['Modelos y verificaciones', ['Uoq3Uujro3c','LTFGx60IejI','m0v8nRLpC6c','AKs4s42dsKk','-nOzmN-iJyQ'], ['Diseño de perfiles Costanera C100','Tensiones en etapa inicial','Punzonamiento en columna central','Modelo de viga postensada para pasarela','Modelo de losa plana en SAP2000 y ETABS']]
  ];

  const makeWhatsAppUrl = (product) => {
    const message = `Hola, me interesa: ${product}. Quisiera recibir información sobre la licencia y el proceso de activación.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const safeUrl = (value = '') => {
    try { const url = new URL(value, window.location.origin); return ['http:', 'https:'].includes(url.protocol) ? url.href : '#'; } catch { return '#'; }
  };
  const renderManagedContent = async () => {
    try {
      const response = await fetch('/api/content', { cache: 'no-store' });
      if (!response.ok) return;
      const content = await response.json();
      const resources = document.querySelector('#managed-resources');
      const videos = document.querySelector('#managed-videos');
      const offers = document.querySelector('#offers');
      if (resources) resources.innerHTML = (content.resources || []).filter(item => item.published).map(item => `<article class="resource-card"><div class="resource-topline"><div class="resource-icon resource-icon--blue">${escapeHtml(item.kind || 'PDF')}</div></div><div class="resource-copy"><span class="resource-type">${escapeHtml(item.category || 'RECURSO')}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><div class="document-actions"><a class="resource-link" href="${safeUrl(item.url)}" target="_blank" rel="noopener">Ver recurso <span>↗</span></a></div></article>`).join('');
      if (videos) videos.innerHTML = (content.videos || []).filter(item => item.published).map(item => `<a class="video-card managed-video" href="${safeUrl(item.url)}" target="_blank" rel="noopener"><span class="video-thumb">${item.thumbnail ? `<img src="${safeUrl(item.thumbnail)}" alt="">` : ''}<span class="video-play">▶</span><span class="video-platform">VIDEO</span></span><span class="video-card-copy"><span class="resource-type">${escapeHtml(item.category || 'CONCRETO')}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.description)}</p></span></a>`).join('');
      if (offers) offers.innerHTML = (content.offers || []).filter(item => item.published).map(item => `<article class="offer-card"><span class="offer-badge">OFERTA ACTIVA</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><a class="btn btn-primary" href="${safeUrl(item.url || 'https://wa.me/59173447992')}" target="_blank" rel="noopener">${escapeHtml(item.button || 'Solicitar oferta')}</a></article>`).join('');
    } catch (_) { /* La página principal sigue funcionando si el CMS aún no fue configurado. */ }
  };
  renderManagedContent();
  const setWhatsAppLink = (element, product) => { element.href = makeWhatsAppUrl(product || 'Consulta general'); };

  document.querySelectorAll('[data-whatsapp-product]').forEach((link) => setWhatsAppLink(link, link.dataset.whatsappProduct));

  const logo = document.querySelector('.logo-slot');
  if (logo) logo.addEventListener('error', () => logo.classList.add('empty'), { once: true });

  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const productSelect = document.querySelector('#whatsapp-product');
  const contactWhatsApp = document.querySelector('#contact-whatsapp');
  if (productSelect && contactWhatsApp) {
    const updateContactLink = () => {
      contactWhatsApp.dataset.whatsappProduct = productSelect.value;
      setWhatsAppLink(contactWhatsApp, productSelect.value);
    };
    productSelect.addEventListener('change', updateContactLink);
    updateContactLink();
  }

  document.querySelectorAll('[data-resource-title]').forEach((button) => button.addEventListener('click', () => {
    window.open(makeWhatsAppUrl(`el recurso técnico “${button.dataset.resourceTitle}”`), '_blank', 'noopener');
  }));

  const setFilter = (selector, cardsSelector, dataName, cardDataName) => {
    document.querySelectorAll(selector).forEach((filter) => filter.addEventListener('click', () => {
      const value = filter.dataset[dataName];
      document.querySelectorAll(selector).forEach((item) => item.classList.toggle('is-active', item === filter));
      document.querySelectorAll(cardsSelector).forEach((card) => {
        card.classList.toggle('is-hidden', value !== 'all' && card.dataset[cardDataName] !== value);
      });
    }));
  };

  setFilter('[data-resource-filter]', '[data-resource-type]', 'resourceFilter', 'resourceType');

  const gallery = document.querySelector('#video-gallery');
  const videoModal = document.querySelector('#video-modal');
  const modalPlayer = document.querySelector('#video-modal-player');
  const modalTitle = document.querySelector('#video-modal-title');
  const closeModal = document.querySelector('#video-modal-close');
  const openVideoModal = (video) => {
    const videoId = video.url.match(/video\/(\d+)/)?.[1];
    if (!videoModal || !modalPlayer || !videoId || typeof videoModal.showModal !== 'function') {
      window.open(video.url, '_blank', 'noopener,noreferrer');
      return;
    }
    modalTitle.textContent = video.title;
    modalPlayer.src = `https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=0`;
    videoModal.showModal();
  };
  const stopVideoModal = () => {
    if (modalPlayer) modalPlayer.src = '';
  };
  if (closeModal && videoModal) {
    closeModal.addEventListener('click', () => videoModal.close());
    videoModal.addEventListener('close', stopVideoModal);
    videoModal.addEventListener('click', (event) => { if (event.target === videoModal) videoModal.close(); });
  }
  if (gallery) {
    const featured = [7, 10, 4].map(index => ({...videoCatalog[index], index}));
    const helpGroups = [{name:'Prediseño: dudas y criterios',category:'prediseno'},{name:'Calculadora: dudas y criterios',category:'elementos'},{name:'Muro de Contención: dudas y criterios',category:'muro'}];
    const row = ({video,index}, number) => `<button class="lesson-row" type="button" data-video-index="${index}" aria-label="Reproducir: ${video.title}"><span class="lesson-number">${String(number + 1).padStart(2,'0')}</span><span class="lesson-name">${video.title}</span><span class="lesson-source">TikTok</span><span class="lesson-play">▶</span></button>`;
    gallery.innerHTML = `<div class="featured-tutorials">${featured.map(({title,app,thumbnail,index}) => `<button class="video-card video-open" type="button" data-video-index="${index}"><span class="video-thumb"><img src="${thumbnail}" alt=""><span class="video-play">▶</span><span class="video-platform">TUTORIAL · TIKTOK</span></span><span class="video-card-copy"><span class="resource-type">${app}</span><strong>${title}</strong><p>Ver demostración de la aplicación</p></span></button>`).join('')}</div><div class="help-videos"><div class="library-intro"><span>GUÍAS Y DUDAS FRECUENTES</span><p>Videos cortos para consultar criterios, cargas y verificaciones.</p></div>${helpGroups.map(group => { const lessons = videoCatalog.map((video,index)=>({video,index})).filter(item=>item.video.category===group.category && !featured.some(f=>f.index===item.index)); return `<details class="help-group" id="playlist-${group.category}"><summary>${group.name}<span>${lessons.length} videos</span></summary><div class="lesson-list">${lessons.map(row).join('')}</div></details>`; }).join('')}</div>`;
    gallery.querySelectorAll('[data-video-index]').forEach((button) => button.addEventListener('click', () => openVideoModal(videoCatalog[Number(button.dataset.videoIndex)])));
  } else {
    const series = [
      { category: 'prediseno', name: 'Prediseño de Edificios', label: 'RUTA 01', description: 'Desde el uso de la app hasta las decisiones preliminares de losa, cargas y cubierta.', image: 'Fotos/LogoPrediceno.jpg', order: [0, 7, 8, 9, 1, 2, 12, 13, 14, 15] },
      { category: 'elementos', name: 'Calculadora de Elementos', label: 'RUTA 02', description: 'Criterios de diseño, losa casetonada, fundación y refuerzo explicados de forma práctica.', image: 'Fotos/LogoCalculadora.jpg', order: [5, 10, 11, 16] },
      { category: 'muro', name: 'Muro de Contención', label: 'RUTA 03', description: 'Conoce la app y sigue un ejemplo de uso para revisar un muro paso a paso.', image: 'Fotos/LogoMuros.jpg', order: [3, 4, 6] }
    ];
    gallery.innerHTML = series.map((seriesItem) => {
      const lessons = seriesItem.order
        .map((index) => ({ video: videoCatalog[index], index }))
        .filter(({ video }) => video && video.category === seriesItem.category);
      return `<article class="video-series" id="playlist-${seriesItem.category}" data-video-category="${seriesItem.category}">
        <div class="series-cover"><img src="${seriesItem.image}" alt="${seriesItem.name}"><div class="series-overlay"><span>${seriesItem.label}</span><strong>${lessons.length} VIDEOS</strong></div></div>
        <div class="series-content"><div class="series-heading"><div><span class="resource-type">${seriesItem.label}</span><h3>${seriesItem.name}</h3><p>${seriesItem.description}</p></div><span class="series-count">${String(lessons.length).padStart(2, '0')}</span></div>
          <div class="lesson-list">${lessons.map(({ video, index }, lessonIndex) => `<button class="lesson-row" type="button" data-video-index="${index}" aria-label="Reproducir: ${video.title}"><span class="lesson-number">${String(lessonIndex + 1).padStart(2, '0')}</span><span class="lesson-name">${video.title}</span><span class="lesson-source">${video.platform}</span><span class="lesson-play">▶</span></button>`).join('')}</div>
        </div>
      </article>`;
    }).join('');
    gallery.querySelectorAll('[data-video-index]').forEach((button) => button.addEventListener('click', () => {
      const video = videoCatalog[Number(button.dataset.videoIndex)];
      openVideoModal(video);
    }));
  }
  const youtubeLibrary = document.querySelector('#youtube-library');
  if (youtubeLibrary) youtubeLibrary.innerHTML = youtubeGroups.map(([group, ids, titles]) => `<details class="youtube-group" open><summary>${group}<span>${ids.length} videos</span></summary><div class="youtube-video-grid">${ids.map((id, index) => { const title = titles?.[index] || `Bitácora técnica · parte ${28 - index}`; return `<a class="youtube-video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer"><span class="youtube-thumb"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><span class="youtube-play">▶</span></span><strong>${title}</strong><small>Ver explicación completa en YouTube ↗</small></a>`; }).join('')}</div></details>`).join('');
  document.querySelectorAll('[data-open-tutorials]').forEach((link) => link.addEventListener('click', () => {
    const series = document.querySelector(`#playlist-${link.dataset.openTutorials}`);
    if (series) series.classList.add('is-highlighted');
    const videoIndex = Number(link.dataset.appVideoIndex);
    if (Number.isInteger(videoIndex) && videoCatalog[videoIndex]) openVideoModal(videoCatalog[videoIndex]);
  }));
  const tiktokLink = document.querySelector('#tiktok-link');
  if (tiktokLink) {
    tiktokLink.href = 'https://www.tiktok.com/@reynaldozambrana';
    tiktokLink.classList.remove('is-disabled');
    tiktokLink.removeAttribute('aria-disabled');
    tiktokLink.target = '_blank';
    tiktokLink.rel = 'noopener noreferrer';
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navlinks a');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const link = document.querySelector(`.navlinks a[href="#${entry.target.id}"]`);
      if (!link || !entry.isIntersecting) return;
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }), { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
