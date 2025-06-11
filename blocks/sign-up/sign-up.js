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

  // Create form element for better semantics and accessibility
  const form = document.createElement('form');
  form.className = 'sign-up-form';
  form.setAttribute('role', 'form');
  form.setAttribute('aria-labelledby', 'signup-heading');

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

  // Create sign-up button with proper accessibility
  const signUpButton = document.createElement('button');
  signUpButton.className = 'sign-up-button';
  signUpButton.textContent = 'Sign Up';
  signUpButton.type = 'submit';
  signUpButton.setAttribute('aria-describedby', 'terms-info');

  // Add form elements to form
  form.appendChild(emailInput);
  form.appendChild(signUpButton);

  // Add sections to content wrapper
  contentWrapper.appendChild(headingSection);
  contentWrapper.appendChild(form);

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

  // Clear the block and add new structure
  block.innerHTML = '';
  block.appendChild(contentWrapper);
  block.appendChild(termsSection);

  // Ensure the component is announced to screen readers
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Newsletter signup');
}
