export default function decorate(block) {
  const picture = block.querySelector('picture');
  const content = block.querySelector('div > div');
  if (picture && content) {
    const img = picture.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('decoding', 'async');
    }
    block.appendChild(picture);
  }
}
