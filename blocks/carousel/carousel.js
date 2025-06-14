export default function decorate(block) {
  // Extract the title from the first row
  const titleRow = block.querySelector('div:first-child');
  const title = titleRow?.querySelector('h2')?.textContent || 'New Releases';

  // Extract all book items (skip the first row which contains the title)
  const bookRows = [...block.children].slice(1);
  const books = [];

  // Performance optimization: Preload first few images for LCP
  const preloadCriticalImages = (imageSrcs) => {
    imageSrcs.slice(0, 4).forEach((src) => {
      const link = Object.assign(document.createElement('link'), {
        rel: 'preload',
        as: 'image',
        href: `${src}?format=webp&width=240&optimize=medium`,
        type: 'image/webp',
      });
      document.head.appendChild(link);
    });
  };

  // Performance optimization: Create optimized picture elements
  const createOptimizedPicture = (src, alt = '', eager = false) => {
    const picture = document.createElement('picture');

    // WebP source for modern browsers
    const webpSource = Object.assign(document.createElement('source'), {
      type: 'image/webp',
      srcset: `${src}?format=webp&width=240&optimize=medium 240w, ${src}?format=webp&width=480&optimize=medium 480w`,
      sizes: '240px',
    });
    picture.appendChild(webpSource);

    // Fallback JPEG source
    const jpegSource = Object.assign(document.createElement('source'), {
      type: 'image/jpeg',
      srcset: `${src}?format=jpeg&width=240&optimize=medium 240w, ${src}?format=jpeg&width=480&optimize=medium 480w`,
      sizes: '240px',
    });
    picture.appendChild(jpegSource);

    // Fallback img element
    const img = Object.assign(document.createElement('img'), {
      src: `${src}?format=jpeg&width=240&optimize=medium`,
      alt,
      loading: eager ? 'eager' : 'lazy',
      decoding: 'async',
      width: 240,
      height: 240,
      fetchPriority: eager ? 'high' : 'low',
    });

    picture.appendChild(img);
    return picture;
  };

  const imageSrcs = []; // Collect image sources for preloading

  bookRows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const imageLink = paragraphs[0].querySelector('a');
      const pageLink = paragraphs[1].querySelector('a');

      if (imageLink && pageLink) {
        const imageSrc = imageLink.getAttribute('href');
        imageSrcs.push(imageSrc);

        const picture = createOptimizedPicture(
          imageSrc,
          imageLink.getAttribute('title') || '',
          false,
        );

        const link = Object.assign(document.createElement('a'), {
          href: pageLink.getAttribute('href'),
          title: pageLink.getAttribute('title') || '',
        });
        link.appendChild(picture);

        books.push({
          element: link,
          title: pageLink.getAttribute('title') || '',
        });
      }
    }
  });

  // Preload critical images early
  preloadCriticalImages(imageSrcs);

  // Clear the block and rebuild it
  block.replaceChildren();

  // Create container structure efficiently
  const container = Object.assign(document.createElement('div'), {
    className: 'books-container',
  });

  // Add title
  const titleElement = Object.assign(document.createElement('h2'), {
    className: 'books-title',
    textContent: title,
  });
  container.appendChild(titleElement);

  // Create carousel container
  const carouselContainer = Object.assign(document.createElement('div'), {
    className: 'carousel-container',
  });

  // Create navigation controls
  const controls = Object.assign(document.createElement('div'), {
    className: 'carousel-controls',
  });

  const prevBtn = Object.assign(document.createElement('button'), {
    id: 'prevBtn',
    className: 'carousel-btn prev-btn',
    innerHTML: '←',
  });
  prevBtn.setAttribute('aria-label', 'Previous page');

  const nextBtn = Object.assign(document.createElement('button'), {
    id: 'nextBtn',
    className: 'carousel-btn next-btn',
    innerHTML: '→',
  });
  nextBtn.setAttribute('aria-label', 'Next page');

  controls.append(prevBtn, nextBtn);

  // Create carousel track
  const carouselTrack = Object.assign(document.createElement('div'), {
    className: 'carousel-track',
  });

  carouselContainer.append(carouselTrack, controls);
  container.appendChild(carouselContainer);

  // Create pagination dots
  const paginationContainer = Object.assign(document.createElement('div'), {
    className: 'carousel-pagination',
  });
  container.appendChild(paginationContainer);

  // Performance optimization: Intersection Observer for lazy loading
  let observer;
  const setupIntersectionObserver = () => {
    if (!window.IntersectionObserver) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('img');
          if (img?.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1,
    });
  };

  // Carousel functionality with modern JavaScript
  const getVisibleCount = () => {
    const { innerWidth } = window;
    if (innerWidth >= 1280) return 10;
    if (innerWidth >= 1024) return 8;
    if (innerWidth >= 768) return 6;
    if (innerWidth >= 540) return 2;
    return 1;
  };

  const getCols = (visibleCount) => {
    if (visibleCount === 10) return 5;
    if (visibleCount === 8) return 4;
    if (visibleCount === 6) return 3;
    if (visibleCount === 2) return 2;
    return 1;
  };

  const getRows = (visibleCount) => (visibleCount <= 2 ? 1 : 2);

  // Carousel state
  let currentPage = 0;
  let visibleCount = getVisibleCount();
  let totalPages = 0;
  let isTransitioning = false;
  let pages = [];
  let paginationDots = [];

  // Performance optimization: Batch DOM updates
  const updatePaginationDots = () => {
    paginationDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });
  };

  const updateCarousel = () => {
    requestAnimationFrame(() => {
      const pageGap = 20;
      const pageWidth = carouselContainer.offsetWidth;
      const translateX = -currentPage * (pageWidth + pageGap);

      carouselTrack.style.transform = `translateX(${translateX}px)`;

      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage >= totalPages - 1;

      updatePaginationDots();
    });
  };

  const goToPage = (pageIndex) => {
    if (isTransitioning || pageIndex < 0 || pageIndex >= totalPages) return;

    isTransitioning = true;
    currentPage = pageIndex;
    updateCarousel();

    setTimeout(() => {
      isTransitioning = false;
    }, 300); // Reduced from 500ms for better performance
  };

  const createPaginationDots = () => {
    paginationContainer.replaceChildren();
    paginationDots = [];

    const fragment = document.createDocumentFragment();
    const indices = Array.from({ length: totalPages }, (_, i) => i);

    indices.forEach((i) => {
      const dot = Object.assign(document.createElement('button'), {
        className: 'pagination-dot',
      });
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);

      const handleClick = (e) => {
        e.preventDefault();
        if (!isTransitioning) goToPage(i);
      };
      dot.addEventListener('click', handleClick, { passive: false });

      fragment.appendChild(dot);
      paginationDots.push(dot);
    });

    paginationContainer.appendChild(fragment);
  };

  const createPages = () => {
    carouselTrack.replaceChildren();
    pages = [];

    visibleCount = getVisibleCount();
    const cols = getCols(visibleCount);
    const rows = getRows(visibleCount);
    totalPages = Math.ceil(books.length / visibleCount);

    const fragment = document.createDocumentFragment();
    const currentObserver = observer;

    const pageIndices = Array.from({ length: totalPages }, (_, i) => i);

    pageIndices.forEach((pageIndex) => {
      const pageDiv = Object.assign(document.createElement('div'), {
        className: 'carousel-page',
      });
      pageDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      pageDiv.style.gridTemplateRows = `repeat(${rows}, auto)`;

      const startIndex = pageIndex * visibleCount;
      const endIndex = Math.min(startIndex + visibleCount, books.length);
      const pageBooks = books.slice(startIndex, endIndex);

      pageBooks.forEach((book, bookIndex) => {
        const bookItem = Object.assign(document.createElement('div'), {
          className: 'book-item',
        });

        const bookElement = book.element.cloneNode(true);
        const img = bookElement.querySelector('img');

        if (img) {
          if (pageIndex === 0) {
            // First page images - eager loading
            Object.assign(img, {
              loading: 'eager',
              fetchPriority: bookIndex === 0 ? 'high' : 'high',
            });
          } else {
            // Lazy load subsequent pages
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="240"%3E%3Crect width="100%25" height="100%25" fill="%23eaecee"/%3E%3C/svg%3E';
            currentObserver?.observe(bookItem);
          }
        }

        bookItem.appendChild(bookElement);
        pageDiv.appendChild(bookItem);
      });

      fragment.appendChild(pageDiv);
      pages.push(pageDiv);
    });

    carouselTrack.appendChild(fragment);
    createPaginationDots();
  };

  // Add everything to the block
  block.appendChild(container);

  // Event listeners with modern syntax
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 0 && !isTransitioning) goToPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages - 1 && !isTransitioning) goToPage(currentPage + 1);
  });

  // Performance optimization: Debounced resize
  let resizeTimeout;
  const debounceResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const oldVisibleCount = visibleCount;
      const currentBookIndex = currentPage * oldVisibleCount;

      visibleCount = getVisibleCount();

      if (oldVisibleCount !== visibleCount) {
        const newPage = Math.floor(currentBookIndex / visibleCount);
        createPages();
        currentPage = Math.min(newPage, Math.max(0, totalPages - 1));
      } else {
        totalPages = Math.ceil(books.length / visibleCount);
        createPaginationDots();
      }

      if (currentPage >= totalPages) {
        currentPage = Math.max(0, totalPages - 1);
      }

      updateCarousel();
    }, 150);
  };

  window.addEventListener('resize', debounceResize, { passive: true });

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: books.map((book, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: book.element.href,
      name: book.title,
    })),
  };

  const scriptTag = Object.assign(document.createElement('script'), {
    type: 'application/ld+json',
    textContent: JSON.stringify(structuredData),
  });
  container.appendChild(scriptTag);

  // Initialize
  setupIntersectionObserver();
  createPages();
  updateCarousel();

  // Cleanup function
  return () => {
    clearTimeout(resizeTimeout);
    window.removeEventListener('resize', debounceResize);
    observer?.disconnect();
  };
}
