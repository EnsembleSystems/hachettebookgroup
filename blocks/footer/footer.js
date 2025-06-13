import footerData from './footerDatata.js';

/**
 * Decorates the footer block with static HTML and inlined SVGs, matching the provided design.
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.innerHTML = `
    <footer class="footer-demo">
      <div class="footer-top-row">
        <div class="footer-brand-social">
          <div class="footer-logo-desc">
            <div class="footer-logo" aria-label="Hachette Logo">
              <!-- Inline SVG logo -->
              <svg fill="none" height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
                <g fill="#245A70">
                    <path d="m29.9952 30v-30h-11.4465v2.17479h9.2768v25.65041h-7.102v-9.2767h-11.45153v2.1748h9.27673v9.2767z" />
                    <path
                        d="m11.4465 9.27674h9.2768v2.16976h-11.44656v-9.27171h-7.10195v25.65041h9.27171v2.1748h-11.4465v-30h11.4465z" />
                </g>
              </svg>
              </div>
            <p class="footer-desc">Hachette Book Group is a leading book publisher based in New York and a division of Hachette Livre, the third-largest publisher in the world.</p>
            <div class="footer-social-row">
              <a href="https://www.facebook.com/HachetteUS/" aria-label="Facebook" class="footer-social-icon"> <!-- Facebook -->
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M18.5 2.5h-3A6 6 0 0 0 9.5 8.5v2H7v4h2.5v9h5v-9h3l.5-4h-3.5v-2a1.5 1.5 0 0 1 1.5-1.5h2V2.5z" fill="#245A70"/></svg>
              </a>
              <a href="https://x.com/HachetteUS" aria-label="X" class="footer-social-icon"> <!-- X/Twitter -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/hachetteus/" aria-label="Instagram" class="footer-social-icon"> <!-- Instagram -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCwY9sZFp4zSC6z8h5LE6m9A" aria-label="YouTube" class="footer-social-icon"> <!-- YouTube -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                  <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@hachetteus?lang=en" aria-label="TikTok" class="footer-social-icon"> <!-- TikTok -->
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#245A70" d="M20,37c2.761,0,5-2.239,5-5v-1v-1V6.07h5.208c-0.031-0.14-0.072-0.276-0.097-0.419H30.11 c-0.044-0.248-0.076-0.495-0.099-0.746V4.07H23V28v1v1c0,2.761-2.239,5-5,5c-0.864,0-1.665-0.239-2.375-0.625 C16.473,35.931,18.103,37,20,37z"></path><path fill="#245A70" d="M33.718,11.407c-0.797-1.094-1.364-2.367-1.607-3.756H32.11c-0.044-0.248-0.076-0.495-0.099-0.746 V6.07h-1.803C30.699,8.252,31.969,10.132,33.718,11.407z"></path><path fill="#245A70" d="M18,25c-2.761,0-5,2.239-5,5c0,1.897,1.069,3.527,2.625,4.375C15.239,33.665,15,32.864,15,32 c0-2.761,2.239-5,5-5c0.343,0,0.677,0.035,1,0.101v-7.05C20.669,20.023,20.338,20,20,20s-0.669,0.023-1,0.05v5.05 C18.677,25.035,18.343,25,18,25z"></path><path fill="#245A70" d="M36.257,13.783c0.867,0.541,1.819,0.908,2.806,1.131v-0.376v-0.002v-1.381 c-1.7,0.003-3.364-0.473-4.806-1.373c-0.186-0.116-0.361-0.247-0.538-0.376C34.406,12.351,35.263,13.163,36.257,13.783z"></path><path fill="#245A70" d="M19,20.05v-2C18.669,18.023,18.338,18,18,18c-6.627,0-12,5.373-12,12 c0,3.824,1.795,7.222,4.581,9.419C8.969,37.377,8,34.804,8,32C8,25.71,12.842,20.56,19,20.05z"></path><path fill="#245A70" d="M39.062,14.914v4.733c-3.375,0-6.501-1.071-9.052-2.894L30.013,30l-0.014-0.018 C29.999,29.988,30,29.994,30,30c0,6.627-5.373,12-12,12c-2.804,0-5.377-0.969-7.419-2.581C12.778,42.205,16.176,44,20,44 c6.627,0,12-5.373,12-12c0-0.006-0.001-0.012-0.001-0.018L32.013,32l-0.002-13.248c2.551,1.823,5.677,2.894,9.052,2.894v-5.108 v-0.002v-1.381C40.385,15.157,39.717,15.061,39.062,14.914z"></path><path fill="#245A70" d="M30,30c0-0.006-0.001-0.012-0.001-0.018L30.013,30l-0.002-13.248 c2.551,1.823,5.677,2.894,9.052,2.894v-4.733c-0.987-0.223-1.939-0.59-2.806-1.131c-0.994-0.62-1.851-1.432-2.538-2.376 c-1.75-1.275-3.019-3.155-3.51-5.337H25V30v1v1c0,2.761-2.239,5-5,5c-1.897,0-3.527-1.069-4.375-2.625 C14.069,33.527,13,31.897,13,30c0-2.761,2.239-5,5-5c0.343,0,0.677,0.035,1,0.101v-5.05C12.842,20.56,8,25.71,8,32 c0,2.804,0.969,5.377,2.581,7.419C12.623,41.031,15.196,42,18,42C24.627,42,30,36.627,30,30z"></path>
              </svg>
                </a>
              <a href="https://www.linkedin.com/company/hachette-book-group/" aria-label="LinkedIn" class="footer-social-icon"> <!-- LinkedIn -->
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
              </a>
              <a href="https://www.pinterest.com/hachettebookgroup/" aria-label="Pinterest" class="footer-social-icon"> <!-- Pinterest -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                  <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M27.542,32.719c-3.297,0-4.516-2.138-4.516-2.138s-0.588,2.309-1.021,3.95s-0.507,1.665-0.927,2.591c-0.471,1.039-1.626,2.674-1.966,3.177c-0.271,0.401-0.607,0.735-0.804,0.696c-0.197-0.038-0.197-0.245-0.245-0.678c-0.066-0.595-0.258-2.594-0.166-3.946c0.06-0.88,0.367-2.371,0.367-2.371l2.225-9.108c-1.368-2.807-0.246-7.192,2.871-7.192c2.211,0,2.79,2.001,2.113,4.406c-0.301,1.073-1.246,4.082-1.275,4.224c-0.029,0.142-0.099,0.442-0.083,0.738c0,0.878,0.671,2.672,2.995,2.672c3.744,0,5.517-5.535,5.517-9.237c0-2.977-1.892-6.573-7.416-6.573c-5.628,0-8.732,4.283-8.732,8.214c0,2.205,0.87,3.091,1.273,3.577c0.328,0.395,0.162,0.774,0.162,0.774l-0.355,1.425c-0.131,0.471-0.552,0.713-1.143,0.368C15.824,27.948,13,26.752,13,21.649C13,16.42,17.926,11,25.571,11C31.64,11,37,14.817,37,21.001C37,28.635,32.232,32.719,27.542,32.719z"></path>
                </svg>
              </a>
              <a href="https://www.threads.net/@hachetteus" aria-label="Threads" class="footer-social-icon"> <!-- Threads -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#245A70">
                <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 25.197266 11 C 21.175771 11.03063 17.921696 12.404232 15.810547 15.089844 C 13.89599 17.523831 12.96586 20.882337 12.931641 24.982422 L 12.931641 24.990234 L 12.931641 24.998047 C 12.965851 29.118158 13.895484 32.477165 15.810547 34.912109 C 17.922655 37.596431 21.176137 38.96935 25.179688 39 L 25.1875 39 L 25.195312 39 C 28.748351 38.97377 31.450694 38.006097 33.544922 35.914062 C 36.201473 33.259766 36.203796 29.877541 35.291016 27.744141 L 35.291016 27.742188 C 34.743292 26.471756 33.762233 25.400445 32.492188 24.634766 C 32.227773 24.475031 31.514635 24.28877 31.167969 24.123047 C 31.169969 23.697531 31.219702 23.580672 31.164062 23.148438 C 31.005927 21.919581 30.635949 20.561968 29.701172 19.458984 C 28.766412 18.356072 27.253584 17.610589 25.234375 17.597656 L 25.230469 17.597656 L 25.226562 17.597656 C 23.124423 17.597656 21.280446 18.519137 20.183594 20.189453 L 21.855469 21.287109 C 22.598268 20.155956 23.66195 19.598179 25.224609 19.597656 C 26.793251 19.608656 27.607889 20.081872 28.175781 20.751953 C 28.744254 21.422719 29.051777 22.395152 29.181641 23.404297 C 29.182641 23.412297 29.180658 23.419614 29.181641 23.427734 C 28.281937 23.244519 27.343132 23.136719 26.365234 23.136719 C 26.039627 23.136719 25.710212 23.145816 25.373047 23.166016 C 23.462073 23.276328 22.044458 23.897125 21.136719 24.824219 C 20.228639 25.75166 19.875265 26.939342 19.931641 28.001953 C 19.998411 29.252438 20.624371 30.363243 21.572266 31.099609 C 22.520161 31.835976 23.769781 32.224609 25.148438 32.224609 C 25.276619 32.224609 25.403649 32.221944 25.53125 32.214844 C 27.156277 32.124974 28.577075 31.503299 29.546875 30.371094 C 30.440887 29.327368 30.905076 27.893035 31.095703 26.208984 C 31.176903 26.261484 31.346489 26.280874 31.457031 26.347656 L 31.458984 26.347656 C 32.414939 26.923977 33.086849 27.683635 33.453125 28.533203 C 34.069782 29.976014 34.189589 32.441063 32.130859 34.498047 C 30.406781 36.22032 28.402916 36.972864 25.1875 36.998047 C 21.619905 36.968847 19.093236 35.849593 17.382812 33.675781 C 15.829099 31.700282 14.966664 28.813636 14.933594 24.990234 C 14.966654 21.187515 15.829301 18.300519 17.382812 16.326172 L 17.382812 16.324219 C 19.092201 14.149691 21.617465 13.031165 25.205078 13.001953 C 28.790756 13.031153 31.365844 14.154443 33.140625 16.337891 C 33.994022 17.386988 34.660906 18.725217 35.105469 20.335938 L 37.033203 19.804688 C 36.527706 17.973483 35.749962 16.375074 34.693359 15.076172 C 32.517649 12.399475 29.232442 11.030635 25.212891 11 L 25.205078 11 L 25.197266 11 z M 26.365234 25.136719 C 27.309206 25.136719 28.197048 25.224199 28.992188 25.404297 L 28.994141 25.404297 C 29.133358 25.435727 29.061771 25.446809 29.179688 25.474609 C 29.178687 25.491019 29.179687 25.646484 29.179688 25.646484 L 29.179688 25.648438 C 29.051064 27.255066 28.628044 28.369019 28.027344 29.070312 C 27.426644 29.771608 26.635848 30.149663 25.421875 30.216797 C 25.331475 30.221797 25.240255 30.224609 25.148438 30.224609 C 24.147092 30.224609 23.338683 29.940868 22.798828 29.521484 C 22.258973 29.102101 21.965917 28.575 21.929688 27.896484 C 21.900067 27.338096 22.067486 26.732215 22.566406 26.222656 C 23.065327 25.713098 23.942296 25.253091 25.490234 25.164062 L 25.492188 25.164062 C 25.789022 25.146272 26.078842 25.136719 26.365234 25.136719 z"></path>
                </svg>
              </a>
              <a href="https://www.hachettebookgroup.com/newsletters/" aria-label="Email" class="footer-social-icon"> <!-- Email -->
                <svg width="35" height="35" fill="none" viewBox="5 1 20 25"><rect x="5" y="8" width="18" height="12" rx="2" stroke="#245A70" stroke-width="2"/><path d="M5 8l9 7 9-7" stroke="#245A70" stroke-width="2"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-newsletter">
          <h2>Get recommended reads, deals, and more from Hachette</h2>
          <form class="footer-newsletter-form" onsubmit="return false;">
            <label for="footer-email" class="visually-hidden">Your email address</label>
            <input id="footer-email" type="email" placeholder="Your email address" autocomplete="off" />
            <div class="footer-newsletter-legal mobile">
              <small>By clicking 'Sign Up,' I acknowledge that I have read and agree to Hachette Book Group's <a href="https://www.hachettebookgroup.com/terms-and-policies/privacy-policy/">Privacy Policy</a> and <a href="https://www.hachettebookgroup.com/terms-and-policies/terms-of-use/">Terms of Use</a></small>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div class="footer-newsletter-legal">
            <small>By clicking 'Sign Up,' I acknowledge that I have read and agree to Hachette Book Group's <a href="https://www.hachettebookgroup.com/terms-and-policies/privacy-policy/">Privacy Policy</a> and <a href="https://www.hachettebookgroup.com/terms-and-policies/terms-of-use/">Terms of Use</a></small>
          </div>
        </div>
      </div>
      <div class="footer-links-row">
        <div class="footer-links-col">
          <h3>${footerData.about.title}</h3>
          <ul>
            ${footerData.about.items.map((item) => `<li><a href="${item.link}">${item.title}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-links-col">
          <h3>${footerData.resources.title}</h3>
          <ul>
            ${footerData.resources.items.map((item) => `<li><a href="${item.link}">${item.title}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-links-col">
          <h3>${footerData.terms.title}</h3>
          <ul>
            ${footerData.terms.items.map((item) => `<li><a href="${item.link}">${item.title}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="footer-bottom-row">
        <small>© 2025 Hachette Book Group<br />Portions of data on HachetteBookGroup.com are supplied by Books In Print ®. Copyright 2025 ProQuest LLC. All rights reserved. All rights in images of books or other publications are reserved by the original copyright owners.</small>
      </div>
    </footer>
  `;

  // Accordion logic for mobile (≤960px)
  function setupFooterAccordion() {
    const cols = block.querySelectorAll('.footer-links-col');

    cols.forEach((col) => {
      const h3 = col.querySelector('h3');
      if (!h3) return;

      // Create button wrapper for better accessibility
      const buttonWrapper = document.createElement('div');
      buttonWrapper.className = 'accordion-button-wrapper';
      h3.parentNode.insertBefore(buttonWrapper, h3);
      buttonWrapper.appendChild(h3);

      // Set initial ARIA attributes
      h3.setAttribute('role', 'button');
      h3.setAttribute('aria-expanded', 'false');
      h3.setAttribute('aria-controls', `footer-accordion-${Array.from(cols).indexOf(col)}`);
      h3.setAttribute('tabindex', '0');

      const ul = col.querySelector('ul');
      if (ul) {
        ul.id = `footer-accordion-${Array.from(cols).indexOf(col)}`;
        // Remove aria-hidden to prevent focusable elements from being hidden
        ul.removeAttribute('aria-hidden');
      }

      // Remove any existing click handlers
      h3.onclick = null;

      // Add click handler
      h3.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = col.classList.contains('active');

        // Toggle current accordion
        col.classList.toggle('active');
        h3.setAttribute('aria-expanded', !isExpanded);
      });

      // Add keyboard support
      h3.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          h3.click();
        }
      });

      // Initialize state
      col.classList.remove('active');
    });
  }

  // Run on load and on resize
  function handleResize() {
    const isMobile = window.innerWidth <= 960;
    const cols = block.querySelectorAll('.footer-links-col');

    cols.forEach((col) => {
      const h3 = col.querySelector('h3');
      const ul = col.querySelector('ul');

      if (isMobile) {
        // Mobile: accordion behavior
        if (h3) {
          h3.setAttribute('role', 'button');
          h3.setAttribute('aria-expanded', 'false');
          h3.setAttribute('tabindex', '0');
        }
        // Remove aria-hidden to prevent focusable elements from being hidden
        if (ul) {
          ul.removeAttribute('aria-hidden');
        }
      } else {
        // Desktop: no accordion behavior
        col.classList.remove('active');
        if (h3) {
          h3.removeAttribute('role');
          h3.removeAttribute('aria-expanded');
          h3.removeAttribute('tabindex');
        }
        // Remove aria-hidden to prevent focusable elements from being hidden
        if (ul) {
          ul.removeAttribute('aria-hidden');
        }
      }
    });
  }

  // Initial setup
  setupFooterAccordion();

  // Add resize listener with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
}
