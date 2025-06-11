export default function decorate(block) {
  // Get the existing content
  const rows = Array.from(block.children);

  // Create the main content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'sign-up-content';

  // Create heading section
  const headingSection = document.createElement('div');
  headingSection.className = 'sign-up-heading';

  // Move the h2 to the heading section
  if (rows[0]) {
    const headingDiv = rows[0].querySelector('div');
    if (headingDiv) {
      headingSection.appendChild(headingDiv);
    }
  }

  // Add ID to heading for aria-labelledby reference
  const heading = headingSection.querySelector('h2');
  if (heading) {
    heading.id = 'signup-heading';
  }

  // Create email input with proper accessibility attributes
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.className = 'email-input';
  emailInput.placeholder = 'Your email address';
  emailInput.required = true;
  emailInput.id = 'email-signup';
  emailInput.name = 'email';
  emailInput.setAttribute('aria-label', 'Email address for newsletter signup');
  emailInput.setAttribute('aria-describedby', 'terms-info');
  emailInput.setAttribute('autocomplete', 'email');
  emailInput.setAttribute('spellcheck', 'false');

  // Create terms and conditions section with proper accessibility
  const termsSection = document.createElement('div');
  termsSection.className = 'terms-conditions';
  termsSection.id = 'terms-info';

  // Move the terms content
  if (rows[1]) {
    const termsDiv = rows[1].querySelector('div');
    if (termsDiv) {
      termsSection.appendChild(termsDiv);

      // Ensure links in terms have proper accessibility
      const links = termsSection.querySelectorAll('a');
      links.forEach((link) => {
        if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
          link.setAttribute('aria-label', link.href);
        }
        // Add external link indicators if needed
        if (link.hostname !== window.location.hostname) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  }

  // Create sign-up button with proper accessibility
  const signUpButton = document.createElement('button');
  signUpButton.className = 'sign-up-button';
  signUpButton.textContent = 'Sign Up';
  signUpButton.type = 'submit';
  signUpButton.setAttribute('aria-describedby', 'terms-info');

  // Create container for mobile layout
  const mobileContainer = document.createElement('div');
  mobileContainer.className = 'mobile-container';

  // Function to reorganize layout based on viewport
  function reorganizeLayout() {
    const isMobile = window.innerWidth <= 960;

    if (isMobile) {
      // Mobile layout: heading, email input, terms, button
      block.innerHTML = '';
      block.appendChild(headingSection);
      block.appendChild(emailInput);
      block.appendChild(termsSection);
      block.appendChild(signUpButton);
    } else {
      // Desktop layout: heading and form side by side, terms below
      const form = document.createElement('form');
      form.className = 'sign-up-form';
      form.setAttribute('role', 'form');
      form.setAttribute('aria-labelledby', 'signup-heading');

      form.appendChild(emailInput);
      form.appendChild(signUpButton);

      contentWrapper.innerHTML = '';
      contentWrapper.appendChild(headingSection);
      contentWrapper.appendChild(form);

      block.innerHTML = '';
      block.appendChild(contentWrapper);
      block.appendChild(termsSection);
    }
  }

  // Initial layout
  reorganizeLayout();

  // Listen for viewport changes
  window.addEventListener('resize', reorganizeLayout);

  // Ensure the component is announced to screen readers
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Newsletter signup');
}
