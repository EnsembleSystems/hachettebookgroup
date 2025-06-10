export default function decorate(block) {
  const picture = block.querySelector('picture');
  const content = block.querySelector('div > div');
  if (picture && content) {
    block.appendChild(picture);
  }
}
