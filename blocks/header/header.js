/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Create nav wrapper
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  // Create nav
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // Create hamburger menu (for mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
    <span class="nav-hamburger-icon"></span>
  </button>`;

  // Create brand section with logo
  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  const logo = document.createElement('img');
  logo.src = '/icons/hbg.svg';
  logo.alt = 'Hachette Book Group';
  const logoMobile = document.createElement('img');
  logoMobile.src = '/icons/hbg-logomark.svg';
  logoMobile.alt = 'Hachette Book Group';
  logoMobile.className = 'mobile-only';
  logoLink.appendChild(logo);
  logoLink.appendChild(logoMobile);
  brand.appendChild(logoLink);

  // Create search section
  const search = document.createElement('div');
  search.className = 'nav-search';
  const searchIcon = document.createElement('img');
  searchIcon.className = 'search-icon';
  searchIcon.src = '/icons/search.svg';
  searchIcon.alt = 'Search';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search';
  searchInput.setAttribute('aria-label', 'Search');
  searchInput.setAttribute('aria-required', 'false');
  searchInput.id = 'search-input';
  search.appendChild(searchIcon);
  search.appendChild(searchInput);

  // Create tools section
  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  const joinButton = document.createElement('a');
  joinButton.href = 'https://www.hachettebookgroup.com/newsletters/';
  joinButton.className = 'join-link';
  const newsletterIcon = document.createElement('img');
  newsletterIcon.src = '/icons/newsletter.svg';
  newsletterIcon.alt = '';
  newsletterIcon.className = 'newsletter-icon';
  joinButton.appendChild(newsletterIcon);
  joinButton.appendChild(document.createTextNode('Join the Club!'));
  const settingsIcon = document.createElement('img');
  settingsIcon.src = '/icons/settings.svg';
  settingsIcon.className = 'settings-icon';
  settingsIcon.alt = 'Settings';
  tools.appendChild(joinButton);
  tools.appendChild(settingsIcon);

  // Append sections to nav
  nav.appendChild(hamburger);
  nav.appendChild(brand);
  nav.appendChild(search);
  nav.appendChild(tools);

  // Create promo banner
  const promoBanner = document.createElement('div');
  promoBanner.className = 'promo-banner';
  promoBanner.textContent = 'Use code DAD25 for 20% off sitewide!';

  // Create main navigation
  const mainNav = document.createElement('div');
  mainNav.className = 'main-nav';
  const navItems = ['Genres', 'Authors', 'Discover', 'Store', 'Imprints', 'About Us'];
  const navList = document.createElement('ul');
  navItems.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/${item.toLowerCase().replace(' ', '-')}`;
    a.textContent = item;
    li.appendChild(a);
    navList.appendChild(li);
  });
  mainNav.appendChild(navList);

  // Append nav, promo banner, and main navigation to wrapper
  navWrapper.appendChild(nav);
  navWrapper.appendChild(promoBanner);
  navWrapper.appendChild(mainNav);
  block.appendChild(navWrapper);
}
