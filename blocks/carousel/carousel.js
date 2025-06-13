export default function decorate(block) {
  // Extract the title from the first row
  const titleRow = block.querySelector('div:first-child');
  const title = titleRow ? titleRow.querySelector('h2')?.textContent || 'New Releases' : 'New Releases';

  // Extract all book items (skip the first row which contains the title)
  const bookRows = Array.from(block.children).slice(1);
  const books = [];

  bookRows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const imageLink = paragraphs[0].querySelector('a');
      const pageLink = paragraphs[1].querySelector('a');

      if (imageLink && pageLink) {
        const img = document.createElement('img');
        img.src = imageLink.getAttribute('href');
        img.alt = imageLink.getAttribute('title') || '';
        img.loading = 'lazy';
        img.decoding = 'async';

        const link = document.createElement('a');
        link.href = pageLink.getAttribute('href');
        link.title = pageLink.getAttribute('title') || '';
        link.appendChild(img);

        books.push({
          element: link,
          title: pageLink.getAttribute('title') || '',
        });
      }
    }
  });

  // Clear the block and rebuild it
  block.innerHTML = '';

  // Create carousel structure with proper ARIA roles
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container-inner';
  carouselContainer.setAttribute('role', 'region');
  carouselContainer.setAttribute('aria-roledescription', 'carousel');
  carouselContainer.setAttribute('aria-label', `${title} Book Carousel`);

  // Add title with proper heading level
  const titleElement = document.createElement('h2');
  titleElement.className = 'carousel-title';
  titleElement.textContent = title;
  titleElement.setAttribute('id', 'carousel-title');
  carouselContainer.appendChild(titleElement);

  // Create carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  // Create carousel track container
  const trackContainer = document.createElement('div');
  trackContainer.className = 'carousel-track-container';
  trackContainer.setAttribute('aria-live', 'polite');

  // Create carousel track with will-change optimization
  const carouselTrack = document.createElement('div');
  carouselTrack.className = 'carousel-track';
  carouselTrack.style.willChange = 'transform';

  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width >= 1280) return 10; // 2 rows × 5 columns
    if (width >= 1024) return 8; // 2 rows × 4 columns
    if (width >= 768) return 6; // 2 rows × 3 columns
    if (width >= 540) return 2; // 1 row × 2 columns
    return 1; // 1 row × 1 column for mobile
  }

  // Calculate total pages based on current viewport
  let currentPage = 0;
  let itemsPerPage = getItemsPerPage();
  let totalPages = Math.ceil(books.length / itemsPerPage);

  function createPages() {
    // Clear existing pages
    carouselTrack.innerHTML = '';

    // Create pages
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const page = document.createElement('div');
      page.className = 'carousel-page';
      page.setAttribute('role', 'group');
      page.setAttribute('aria-label', `Page ${pageIndex + 1} of ${totalPages}`);

      const startIndex = pageIndex * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, books.length);

      // Add books to this page
      for (let bookIndex = startIndex; bookIndex < endIndex; bookIndex += 1) {
        const book = books[bookIndex];
        const bookItem = document.createElement('div');
        bookItem.className = 'carousel-item';
        bookItem.setAttribute('data-index', bookIndex);
        bookItem.setAttribute('role', 'group');
        bookItem.setAttribute('aria-label', book.title);
        bookItem.appendChild(book.element.cloneNode(true));
        page.appendChild(bookItem);
      }

      carouselTrack.appendChild(page);
    }
  }

  // Create navigation arrows with improved accessibility
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav carousel-prev';
  prevButton.innerHTML = '&#8249;';
  prevButton.setAttribute('aria-label', 'Previous page');
  prevButton.setAttribute('type', 'button');

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav carousel-next';
  nextButton.innerHTML = '&#8250;';
  nextButton.setAttribute('aria-label', 'Next page');
  nextButton.setAttribute('type', 'button');

  // Create pagination dots with improved accessibility
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  dotsContainer.setAttribute('role', 'tablist');
  dotsContainer.setAttribute('aria-label', 'Carousel Navigation');

  function createDots() {
    dotsContainer.innerHTML = '';
    const width = window.innerWidth;

    if (width < 768) {
      dotsContainer.style.display = 'none';
      return;
    }

    dotsContainer.style.display = 'flex';

    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.setAttribute('data-page', i);
      if (i === currentPage) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel(skipTransition = false) {
    if (skipTransition) {
      carouselTrack.style.transition = 'none';
    }

    const translateX = -(currentPage * 100);
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    if (skipTransition) {
      requestAnimationFrame(() => {
        carouselTrack.style.transition = '';
      });
    }

    // Update ARIA attributes and states
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
      dot.setAttribute('aria-selected', index === currentPage ? 'true' : 'false');
    });

    // Update navigation buttons
    prevButton.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = currentPage === totalPages - 1 ? 'hidden' : 'visible';
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;

    // Update live region
    trackContainer.setAttribute('aria-label', `Showing page ${currentPage + 1} of ${totalPages}`);
  }

  function goToPage(page) {
    if (page >= 0 && page < totalPages) {
      currentPage = page;
      updateCarousel();
    }
  }

  function nextPage() {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }

  // Event listeners
  nextButton.addEventListener('click', nextPage);
  prevButton.addEventListener('click', prevPage);

  dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-dot')) {
      const page = parseInt(e.target.getAttribute('data-page'), 10);
      goToPage(page);
    }
  });

  // Add keyboard navigation
  carouselContainer.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevPage();
        break;
      case 'ArrowRight':
        nextPage();
        break;
      case 'Home':
        goToPage(0);
        break;
      case 'End':
        goToPage(totalPages - 1);
        break;
      default:
        break;
    }
  });

  // Optimize resize handler with requestAnimationFrame
  let resizeRAF;
  const debouncedResize = () => {
    if (resizeRAF) {
      cancelAnimationFrame(resizeRAF);
    }

    resizeRAF = requestAnimationFrame(() => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        const firstVisibleItemIndex = currentPage * itemsPerPage;
        itemsPerPage = newItemsPerPage;
        totalPages = Math.ceil(books.length / itemsPerPage);
        currentPage = Math.min(Math.floor(firstVisibleItemIndex / itemsPerPage), totalPages - 1);
        createPages();
        createDots();
        updateCarousel(true);
      }
    });
  };

  // Replace the existing resize listener with the optimized one
  window.addEventListener('resize', debouncedResize, { passive: true });

  // Assemble the carousel
  trackContainer.appendChild(carouselTrack);
  carouselWrapper.appendChild(trackContainer);
  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(nextButton);
  carouselContainer.appendChild(carouselWrapper);
  carouselContainer.appendChild(dotsContainer);

  // Initialize
  createPages();
  createDots();
  updateCarousel();

  // Add structured data for SEO
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

  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.textContent = JSON.stringify(structuredData);
  carouselContainer.appendChild(scriptTag);

  // Add everything to the block
  block.appendChild(carouselContainer);
}