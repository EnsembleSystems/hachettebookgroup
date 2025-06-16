export default function decorate(block) {
  const gridContainer = block.querySelector('.challenged-books.block > div');

  if (gridContainer && gridContainer.children.length >= 2) {
    const separatorDiv = document.createElement('div');
    separatorDiv.className = 'separator';

    gridContainer.insertBefore(separatorDiv, gridContainer.children[1]);
  }
}
