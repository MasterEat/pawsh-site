function initMobileMenuButton() {
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');

  if (!menuButton || !mobileMenu) {
    return;
  }

  const closeMenuButton = mobileMenu.querySelector('.mobile-menu__close');

  const setMenuState = (open) => {
    menuButton.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileMenu.classList.toggle('translate-x-full', !open);
    mobileMenu.classList.toggle('translate-x-0', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    setMenuState(isOpen);
  });

  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => setMenuState(false));
  }
}

window.initMobileMenuButton = initMobileMenuButton;

document.addEventListener('DOMContentLoaded', () => {
  const gallerySection = document.querySelector('#gallery');
  if (!gallerySection) {
    return;
  }

  const scroller = gallerySection.querySelector('.pawsh-gallery-scroller');
  const track = gallerySection.querySelector('.pawsh-gallery-track');
  const lightbox = gallerySection.querySelector('.pawsh-gallery-lightbox');

  if (!scroller || !track || !lightbox) {
    return;
  }

  const closeButton = lightbox.querySelector('.pawsh-gallery-lightbox-close');
  const prevButton = lightbox.querySelector('.pawsh-gallery-lightbox-prev');
  const nextButton = lightbox.querySelector('.pawsh-gallery-lightbox-next');
  const lightboxImage = lightbox.querySelector('.pawsh-gallery-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.pawsh-gallery-lightbox-caption');

  if (!closeButton || !prevButton || !nextButton || !lightboxImage || !lightboxCaption) {
    return;
  }

  const galleryImages = [
    { src: 'assets/images/dogs/pet-grooming-galatsi-mixed-dog-bandana.webp.webp', alt: 'καλλωπισμός σκύλου στο Pawsh Pet Grooming Γαλάτσι με μπαντάνα' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-akita-xalarosi.webp.webp', alt: 'χαλαρός σκύλος μετά από περιποίηση στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-labrador-retriever.webp.webp', alt: 'κούρεμα και φροντίδα labrador στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-leykos-skylos-kanapes.webp.webp', alt: 'λευκός σκύλος σε καναπέ μετά το grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-husky-bandana.webp.webp', alt: 'husky με μπαντάνα μετά από καλλωπισμό σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-three-dogs-group.webp.webp', alt: 'τρία σκυλάκια μετά από περιποίηση σκύλου στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-staffordshire-xamogelo.webp.webp', alt: 'χαμογελαστός σκύλος μετά από grooming στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-poodle-beige-fiogkos.webp.webp', alt: 'poodle με φιόγκο μετά από καλλωπισμό σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-mikros-skylos-bandana-kokkini.webp.webp', alt: 'μικρός σκύλος με κόκκινη μπαντάνα στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-pomeranian-bowtie.webp.webp', alt: 'κούρεμα σκύλου pomeranian στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-corgi-mix.webp.webp', alt: 'περιποίηση σκύλου corgi mix στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-french-bulldog-kanapes.webp.webp', alt: 'french bulldog σε καναπέ μετά από grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-german-shepherd.webp.webp', alt: 'γερμανικός ποιμενικός μετά από καλλωπισμό στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-spitz-leyko-kourema.webp.webp', alt: 'κούρεμα σκύλου spitz στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-german-shepherd-kanapes.webp.webp', alt: 'περιποίηση σκύλου german shepherd στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-german-shepherd-mix.webp.webp', alt: 'german shepherd mix μετά από περιποίηση στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-mikros-skylos-aspro-mavro.webp.webp', alt: 'ασπρόμαυρος μικρός σκύλος μετά από grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-beagle-bandana.webp.webp', alt: 'beagle με μπαντάνα μετά από καλλωπισμό σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-large-mixed-dog-sofa.webp.webp', alt: 'μεγάλος σκύλος σε καναπέ μετά από περιποίηση στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-german-shepherd-xalarosi.webp.webp', alt: 'χαλαρός γερμανικός ποιμενικός μετά από grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-black-mixed-dog.webp.webp', alt: 'μαύρος mixed σκύλος μετά από καλλωπισμό στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-maltese-roz-koritsaki.webp.webp', alt: 'maltese με ροζ αξεσουάρ μετά από κούρεμα σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-pitbull-blue-sofa.webp.webp', alt: 'pitbull σε μπλε καναπέ μετά από περιποίηση στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-cocker-spaniel-kallopismos.webp.webp', alt: 'καλλωπισμός cocker spaniel στο Pawsh Pet Grooming Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-pomeranian-fiogkos-mavros.webp.webp', alt: 'pomeranian με μαύρο φιόγκο μετά από grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-megalos-skylos-kanapes-mple.webp.webp', alt: 'μεγάλος σκύλος μετά από περιποίηση σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-spitz-leyko-fiogkos.webp.webp', alt: 'λευκό spitz με φιόγκο στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-large-black-dog-sofa.webp.webp', alt: 'μαύρος μεγάλος σκύλος σε καναπέ μετά από καλλωπισμό στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-golden-retriever-kanapes.webp.webp', alt: 'golden retriever μετά από grooming στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-pomeranian-sofa.webp.webp', alt: 'περιποίηση σκύλου pomeranian στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-pug-blue-sofa.webp.webp', alt: 'κούρεμα σκύλου pug στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-yorkshire-terrier-bowtie.webp.webp', alt: 'yorkshire terrier μετά από καλλωπισμό στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-mixed-dog-colorful-bandana.webp.webp', alt: 'σκύλος με πολύχρωμη μπαντάνα μετά από περιποίηση στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-megalos-skylos-kanapes-kafe.webp.webp', alt: 'μεγάλος σκύλος σε καφέ καναπέ μετά από grooming στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-black-white-small-dog-bow.webp.webp', alt: 'μικρός ασπρόμαυρος σκύλος με φιόγκο στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-poodle-kourema-fiogkos.webp.webp', alt: 'κούρεμα poodle με φιόγκο στο Pawsh Γαλάτσι' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-poodle-kafe-kourema.webp.webp', alt: 'καφέ poodle μετά από περιποίηση σκύλου στο Pawsh' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-golden-mixed-dog.webp.webp', alt: 'golden mixed σκύλος μετά από καλλωπισμό στο Pawsh Pet Grooming' },
    { src: 'assets/images/dogs/pet-grooming-galatsi-fluffy-brown-dog.webp.webp', alt: 'αφράτος καφέ σκύλος μετά από grooming στο Pawsh Γαλάτσι' }
  ];

  const slidesData = [];
  const slides = [];

  galleryImages.forEach(({ src, alt }, index) => {
    const slide = document.createElement('div');
    slide.className = 'pawsh-gallery-slide';
    slide.setAttribute('role', 'listitem');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pawsh-gallery-slide-button';
    button.setAttribute('aria-label', `Μεγέθυνση: ${alt}`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.decoding = 'async';
    img.draggable = false;
    img.loading = index > 3 ? 'lazy' : 'eager';

    button.appendChild(img);
    slide.appendChild(button);
    track.appendChild(slide);

    slidesData.push({ src, alt });
    slides.push({ slide, button });
  });

  if (!slides.length) {
    return;
  }

  slides[0].slide.classList.add('is-active');

  let activeSlide = slides[0].slide;
  const visibilityMap = new Map();

  const thresholds = Array.from({ length: 21 }, (_, index) => index / 20);
  const observer = new IntersectionObserver((entries) => {
    let candidate = activeSlide;
    let candidateRatio = visibilityMap.get(candidate) || 0;

    entries.forEach((entry) => {
      visibilityMap.set(entry.target, entry.intersectionRatio);
      if (entry.intersectionRatio > candidateRatio) {
        candidate = entry.target;
        candidateRatio = entry.intersectionRatio;
      }
    });

    let bestSlide = candidate;
    if (!entries.some((entry) => entry.target === candidate)) {
      let highestRatio = candidateRatio;
      visibilityMap.forEach((ratio, element) => {
        if (ratio > highestRatio) {
          bestSlide = element;
          highestRatio = ratio;
        }
      });
    } else {
      bestSlide = candidate;
    }

    if (bestSlide && bestSlide !== activeSlide) {
      if (activeSlide) {
        activeSlide.classList.remove('is-active');
      }
      bestSlide.classList.add('is-active');
      activeSlide = bestSlide;
    }
  }, {
    root: scroller,
    threshold: thresholds,
  });

  slides.forEach(({ slide }, index) => {
    observer.observe(slide);
    slide.dataset.index = String(index);
  });

  let currentIndex = 0;
  let lastFocusedElement = null;
  let lightboxOpen = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const clampIndex = (index) => {
    const total = slidesData.length;
    return (index + total) % total;
  };

  const showImage = (index) => {
    currentIndex = clampIndex(index);
    const { src, alt } = slidesData[currentIndex];
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt;
  };

  const openLightbox = (index) => {
    lightboxOpen = true;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add('pawsh-gallery-no-scroll');
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    showImage(index);
    closeButton.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    if (!lightboxOpen) {
      return;
    }
    lightboxOpen = false;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.classList.remove('pawsh-gallery-no-scroll');
    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  const showNextImage = () => {
    showImage(currentIndex + 1);
  };

  const showPreviousImage = () => {
    showImage(currentIndex - 1);
  };

  slides.forEach(({ slide, button }, index) => {
    button.addEventListener('click', () => openLightbox(index));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPreviousImage);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightboxOpen) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPreviousImage();
    }
  });

  lightbox.addEventListener('touchstart', (event) => {
    if (!lightboxOpen) {
      return;
    }
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (event) => {
    if (!lightboxOpen) {
      return;
    }
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    }
  }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
  const servicesSection = document.querySelector('#services');
  if (!servicesSection) {
    return;
  }

  const cards = Array.from(servicesSection.querySelectorAll('.pawsh-service-card'));
  if (!cards.length) {
    return;
  }

  const mediaQuery = window.matchMedia('(max-width: 640px)');
  const baseZIndex = 10;
  let highestZ = baseZIndex;
  let currentActiveCard = null;
  let scrollHandler = null;

  const clearCardState = () => {
    cards.forEach((card) => {
      card.style.zIndex = '';
      card.classList.remove('pawsh-service-card-active');
    });
  };

  const initializeZIndexes = () => {
    highestZ = baseZIndex + cards.length;
    cards.forEach((card, index) => {
      card.style.zIndex = String(baseZIndex + cards.length - index);
    });
  };

  const getStickyTop = () => {
    if (!cards.length) {
      return 0;
    }

    const computedTop = window.getComputedStyle(cards[0]).top;
    if (computedTop.endsWith('px')) {
      return parseFloat(computedTop) || 0;
    }
    if (computedTop.endsWith('rem')) {
      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
      return (parseFloat(computedTop) || 0) * rootFontSize;
    }
    const numericTop = parseFloat(computedTop);
    return Number.isNaN(numericTop) ? 0 : numericTop;
  };

  const setActiveCard = (card) => {
    if (currentActiveCard === card) {
      return;
    }

    currentActiveCard = card;
    cards.forEach((item) => {
      if (item === card) {
        item.classList.add('pawsh-service-card-active');
      } else {
        item.classList.remove('pawsh-service-card-active');
      }
    });

    if (card) {
      highestZ += 1;
      card.style.zIndex = String(highestZ);
    }
  };

  const updateActiveCard = () => {
    if (!mediaQuery.matches) {
      return;
    }

    const stickyTop = getStickyTop();
    let candidate = null;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom <= stickyTop + 1) {
        return;
      }

      if (rect.top <= stickyTop + 1) {
        candidate = card;
      } else if (!candidate) {
        candidate = card;
      }
    });

    if (!candidate && cards.length) {
      candidate = cards[cards.length - 1];
    }

    if (!candidate && currentActiveCard) {
      currentActiveCard.classList.remove('pawsh-service-card-active');
      currentActiveCard = null;
      return;
    }

    setActiveCard(candidate || null);
  };

  const enableEffect = () => {
    initializeZIndexes();
    updateActiveCard();

    if (!scrollHandler) {
      scrollHandler = () => {
        updateActiveCard();
      };
      document.addEventListener('scroll', scrollHandler, { passive: true });
      window.addEventListener('resize', updateActiveCard);
    }
  };

  const disableEffect = () => {
    if (scrollHandler) {
      document.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', updateActiveCard);
      scrollHandler = null;
    }
    currentActiveCard = null;
    highestZ = baseZIndex;
    clearCardState();
  };

  const handleChange = () => {
    if (mediaQuery.matches) {
      enableEffect();
    } else {
      disableEffect();
    }
  };

  handleChange();

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleChange);
  }
});
