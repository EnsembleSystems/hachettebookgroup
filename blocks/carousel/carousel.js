export default async function decorate(block) {
  // Extract the title from the first row
  const titleRow = block.querySelector('div:first-child');
  const title = titleRow ? titleRow.querySelector('h2')?.textContent || 'New Releases' : 'New Releases';

  // Extract all book items (skip the first row which contains the title)
  const bookRows = Array.from(block.children).slice(1);
  const books = [];

  bookRows.forEach((row) => {
    const bookCell = row.querySelector('div:first-child');
    if (bookCell) {
      const link = bookCell.querySelector('a');
      const picture = bookCell.querySelector('picture');
      const img = bookCell.querySelector('img');

      if (link && picture && img) {
        books.push({
          href: link.getAttribute('href'),
          title: link.getAttribute('title') || img.getAttribute('alt') || '',
          alt: img.getAttribute('alt') || '',
          picture: picture.cloneNode(true),
        });
      }
    }
  });

  // Clear the block and rebuild it
  block.innerHTML = '';

  // Create carousel structure
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  // Add title
  const titleElement = document.createElement('h2');
  titleElement.className = 'carousel-title';
  titleElement.textContent = title;
  carouselContainer.appendChild(titleElement);

  // Create carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  // Create carousel track
  const carouselTrack = document.createElement('div');
  carouselTrack.className = 'carousel-track';

  // Add books to track
  books.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.className = 'carousel-item';
    bookItem.setAttribute('data-index', index);

    const bookLink = document.createElement('a');
    bookLink.href = book.href;
    bookLink.title = book.title;
    bookLink.appendChild(book.picture);

    bookItem.appendChild(bookLink);
    carouselTrack.appendChild(bookItem);
  });

  carouselWrapper.appendChild(carouselTrack);

  // Create navigation arrows
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav carousel-prev';
  prevButton.innerHTML = '&#8249;';
  prevButton.setAttribute('aria-label', 'Previous');

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav carousel-next';
  nextButton.innerHTML = '&#8250;';
  nextButton.setAttribute('aria-label', 'Next');

  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(nextButton);
  carouselContainer.appendChild(carouselWrapper);

  // Create pagination dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';

  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width >= 1280) return 10; // 2 rows × 5 columns
    if (width >= 1024) return 8; // 2 rows × 4 columns
    if (width >= 768) return 6; // 2 rows × 3 columns
    if (width >= 540) return 2; // 1 row × 2 columns
    return 1; // 1 row × 1 column
  }

  // Calculate total pages based on current viewport
  let currentPage = 0;
  let itemsPerPage = getItemsPerPage();
  let totalPages = Math.ceil(books.length / itemsPerPage);

  function createDots() {
    dotsContainer.innerHTML = '';
    const width = window.innerWidth;

    // Don't show dots for mobile sizes
    if (width < 768) {
      dotsContainer.style.display = 'none';
      return;
    }

    dotsContainer.style.display = 'flex';
    itemsPerPage = getItemsPerPage();
    totalPages = Math.ceil(books.length / itemsPerPage);

    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('data-page', i);
      if (i === currentPage) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const items = carouselTrack.querySelectorAll('.carousel-item');
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, books.length);

    items.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });

    // Update navigation buttons
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
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

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        totalPages = Math.ceil(books.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages - 1);
        createDots();
        updateCarousel();
      }
    }, 150);
  });

  // Initialize
  createDots();
  carouselContainer.appendChild(dotsContainer);
  updateCarousel();

  // Add everything to the block
  block.appendChild(carouselContainer);
}
