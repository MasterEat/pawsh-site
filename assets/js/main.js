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

  const altTextMap = new Map([
    [1, 'Σκύλος 1'],
    [2, 'Σκύλος 2'],
    [3, 'Σκύλος 3'],
    [4, 'Σκύλος 4'],
    [8, 'Σκύλος 8'],
    [9, 'Σκύλος 9'],
    [10, 'Σκύλος 10'],
    [11, 'Σκύλος 11'],
    [12, 'Σκύλος 12'],
    [13, 'Σκύλος 13'],
    [14, 'Σκύλος 14'],
    [15, 'Σκύλος 15'],
    [16, 'Σκύλος 16'],
    [17, 'Σκύλος 17'],
    [18, 'Σκύλος 18'],
    [19, 'Σκύλος 19'],
    [20, 'Σκύλος 20'],
    [21, 'Σκύλος 21'],
    [22, 'Σκύλος 22'],
    [23, 'Σκύλος 23'],
    [24, 'Σκύλος 24'],
    [25, 'Σκύλος 25'],
    [26, 'Σκύλος 26'],
    [27, 'Σκύλος 27'],
    [28, 'Σκύλος 28'],
    [29, 'Σκύλος 29'],
    [30, 'Σκύλος 30'],
    [31, 'Σκύλος 31'],
    [32, 'Σκύλος 32'],
  ]);

  const slidesData = [];
  const slides = [];
  const totalImages = 32;
  const imageFilePrefix = 'dog';


  for (let i = 1; i <= totalImages; i += 1) {
    const imageFileName = `${imageFilePrefix}${i}.jpg`;
    const imageSrc = `./dogs/${imageFileName}`;
    const imageAlt = altTextMap.get(i) || `Pawsh gallery photo ${i}`;

    const slide = document.createElement('div');
    slide.className = 'pawsh-gallery-slide';
    slide.setAttribute('role', 'listitem');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pawsh-gallery-slide-button';
    button.setAttribute('aria-label', `Μεγέθυνση: ${imageAlt}`);

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.decoding = 'async';
    img.draggable = false;
    if (i > 3) {
      img.loading = 'lazy';
    }

    button.appendChild(img);
    slide.appendChild(button);
    track.appendChild(slide);

    slidesData.push({ src: imageSrc, alt: imageAlt });
    slides.push({ slide, button });
  }

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
