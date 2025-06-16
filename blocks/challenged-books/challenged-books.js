export default function decorate(block) {
  const gridContainer = block.querySelector('.challenged-books.block > div');

  if (gridContainer && gridContainer.children.length >= 2) {
    const separatorDiv = document.createElement('div');
    separatorDiv.className = 'separator';

    gridContainer.insertBefore(separatorDiv, gridContainer.children[1]);
  }

  const mediaQuery = window.matchMedia('(max-width: 1023px)');
  let mobileElement = null;

  const handleViewportChange = (e) => {
    if (e.matches) {
      if (!mobileElement) {
        mobileElement = document.createElement('div');
        mobileElement.classList.add('mobile');
        block.appendChild(mobileElement);
      }
    } else {
      mobileElement?.remove();
      mobileElement = null;
    }
  };

  handleViewportChange(mediaQuery);
  mediaQuery.addEventListener('change', handleViewportChange);
}
