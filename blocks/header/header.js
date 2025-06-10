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
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  // Create hamburger menu (for mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation" aria-expanded="false">
    <span class="nav-hamburger-icon" aria-hidden="true"></span>
  </button>`;

  // Create brand section with logo
  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'Hachette Book Group homepage');
  const logo = document.createElement('img');
  logo.src = '/icons/hbg.svg';
  logo.alt = 'Hachette Book Group';
  logo.setAttribute('width', '200');
  logo.setAttribute('height', '38');
  logo.setAttribute('loading', 'eager');
  const logoMobile = document.createElement('img');
  logoMobile.src = '/icons/hbg-logomark.svg';
  logoMobile.alt = 'Hachette Book Group';
  logoMobile.className = 'mobile-only';
  logoMobile.setAttribute('width', '38');
  logoMobile.setAttribute('height', '38');
  logoMobile.setAttribute('loading', 'eager');
  logoLink.appendChild(logo);
  logoLink.appendChild(logoMobile);
  brand.appendChild(logoLink);

  // Create search section
  const search = document.createElement('div');
  search.className = 'nav-search';
  search.setAttribute('role', 'search');
  const searchIcon = document.createElement('img');
  searchIcon.className = 'search-icon';
  searchIcon.src = '/icons/search.svg';
  searchIcon.alt = '';
  searchIcon.setAttribute('aria-hidden', 'true');
  searchIcon.setAttribute('width', '20');
  searchIcon.setAttribute('height', '20');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search';
  searchInput.setAttribute('aria-label', 'Search books, authors, and more');
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
  joinButton.setAttribute('aria-label', 'Join our newsletter club');
  const newsletterIcon = document.createElement('img');
  newsletterIcon.src = '/icons/newsletter.svg';
  newsletterIcon.alt = '';
  newsletterIcon.className = 'newsletter-icon';
  newsletterIcon.setAttribute('aria-hidden', 'true');
  newsletterIcon.setAttribute('width', '25');
  newsletterIcon.setAttribute('height', '25');
  joinButton.appendChild(newsletterIcon);
  joinButton.appendChild(document.createTextNode('Join the Club!'));
  const settingsIcon = document.createElement('img');
  settingsIcon.src = '/icons/settings.svg';
  settingsIcon.className = 'settings-icon';
  settingsIcon.alt = 'Settings';
  settingsIcon.setAttribute('width', '24');
  settingsIcon.setAttribute('height', '24');
  settingsIcon.setAttribute('tabindex', '0');
  settingsIcon.setAttribute('role', 'button');
  settingsIcon.setAttribute('aria-label', 'Open settings');
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
  promoBanner.setAttribute('role', 'banner');
  promoBanner.setAttribute('aria-label', 'Promotional offer');
  promoBanner.textContent = 'Use code DAD25 for 20% off sitewide!';

  // Create main navigation
  const mainNav = document.createElement('div');
  mainNav.className = 'main-nav';
  mainNav.setAttribute('role', 'navigation');
  mainNav.setAttribute('aria-label', 'Primary navigation');
  const navItems = ['Genres', 'Authors', 'Discover', 'Store', 'Imprints', 'About Us'];
  const navList = document.createElement('ul');
  navList.setAttribute('role', 'menubar');
  navItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = item;
    a.setAttribute('role', 'menuitem');
    a.setAttribute('tabindex', index === 0 ? '0' : '-1');
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
