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

  // Create simple container
  const container = document.createElement('div');
  container.className = 'books-container';

  // Add title
  const titleElement = document.createElement('h2');
  titleElement.className = 'books-title';
  titleElement.textContent = title;
  container.appendChild(titleElement);

  // Create navigation controls
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';

  const prevBtn = document.createElement('button');
  prevBtn.id = 'prevBtn';
  prevBtn.className = 'carousel-btn prev-btn';
  prevBtn.innerHTML = '← Previous';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'nextBtn';
  nextBtn.className = 'carousel-btn next-btn';
  nextBtn.innerHTML = 'Next →';

  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
  container.appendChild(controls);

  // Create carousel container for overflow handling
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  // Create carousel track (holds all pages)
  const carouselTrack = document.createElement('div');
  carouselTrack.className = 'carousel-track';

  carouselContainer.appendChild(carouselTrack);
  container.appendChild(carouselContainer);

  // Create pagination dots
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'carousel-pagination';
  container.appendChild(paginationContainer);

  // Carousel functionality
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1280) return 10;
    if (width >= 1024) return 8;
    if (width >= 768) return 6;
    if (width >= 540) return 2;
    return 1;
  }

  function getCols(visibleCount) {
    if (visibleCount === 10) return 5;
    if (visibleCount === 8) return 4;
    if (visibleCount === 6) return 3;
    if (visibleCount === 2) return 2;
    return 1;
  }

  function getRows(visibleCount) {
    return visibleCount <= 2 ? 1 : 2;
  }

  // Carousel state
  let currentPage = 0;
  let visibleCount = getVisibleCount();
  let totalPages = 0;
  let isTransitioning = false;
  let pages = [];
  let paginationDots = [];

  function updatePaginationDots() {
    paginationDots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function updateCarousel() {
    // Calculate transform accounting for gap between pages
    const pageGap = 20; // Gap between carousel pages in CSS
    const pageWidth = carouselContainer.offsetWidth;
    const translateX = -currentPage * (pageWidth + pageGap);

    carouselTrack.style.transform = `translateX(${translateX}px)`;

    // Update button states
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;

    // Update pagination dots
    updatePaginationDots();
  }

  function goToPage(pageIndex) {
    if (isTransitioning || pageIndex < 0 || pageIndex >= totalPages) return;

    isTransitioning = true;
    currentPage = pageIndex;
    updateCarousel();

    // Reset transition lock after animation
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Factory function to create dot click handler
  function createDotClickHandler(pageIndex) {
    return function (e) {
      e.preventDefault();
      if (!isTransitioning) {
        goToPage(pageIndex);
      }
    };
  }

  function createPaginationDots() {
    // Clear existing dots
    paginationContainer.innerHTML = '';
    paginationDots = [];

    // Create dots for each page
    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'pagination-dot';
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);

      dot.addEventListener('click', createDotClickHandler(i));

      paginationContainer.appendChild(dot);
      paginationDots.push(dot);
    }
  }

  function createPages() {
    // Clear existing pages
    carouselTrack.innerHTML = '';
    pages = [];

    visibleCount = getVisibleCount();
    const cols = getCols(visibleCount);
    const rows = getRows(visibleCount);
    totalPages = Math.ceil(books.length / visibleCount);

    // Create each page
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const pageDiv = document.createElement('div');
      pageDiv.className = 'carousel-page';
      pageDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      pageDiv.style.gridTemplateRows = `repeat(${rows}, auto)`;

      // Get books for this page
      const startIndex = pageIndex * visibleCount;
      const endIndex = Math.min(startIndex + visibleCount, books.length);
      const pageBooks = books.slice(startIndex, endIndex);

      // Add books to this page
      pageBooks.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.appendChild(book.element.cloneNode(true));
        pageDiv.appendChild(bookItem);
      });

      carouselTrack.appendChild(pageDiv);
      pages.push(pageDiv);
    }

    // Create pagination dots after pages are created
    createPaginationDots();
  }

  // Add everything to the block first
  block.appendChild(container);

  // Event listeners - add after elements are in DOM
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 0 && !isTransitioning) {
      goToPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages - 1 && !isTransitioning) {
      goToPage(currentPage + 1);
    }
  });

  window.addEventListener('resize', () => {
    // Recalculate on resize
    const oldVisibleCount = visibleCount;
    visibleCount = getVisibleCount();

    // Recreate pages if layout changed
    if (oldVisibleCount !== visibleCount) {
      currentPage = 0;
      createPages();
    } else {
      // Recalculate total pages
      totalPages = Math.ceil(books.length / visibleCount);
      createPaginationDots();
    }

    // Ensure current page is valid
    if (currentPage >= totalPages) {
      currentPage = Math.max(0, totalPages - 1);
    }

    updateCarousel();
  });

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
  container.appendChild(scriptTag);

  // Initialize carousel
  createPages();
  updateCarousel();
}
