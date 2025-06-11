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

  // Create form section
  const formSection = document.createElement('div');
  formSection.className = 'sign-up-form';

  // Create email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.className = 'email-input';
  emailInput.placeholder = 'Your email address';
  emailInput.required = true;

  // Create sign-up button
  const signUpButton = document.createElement('button');
  signUpButton.className = 'sign-up-button';
  signUpButton.textContent = 'Sign Up';
  signUpButton.type = 'submit';

  // Add form elements to form section
  formSection.appendChild(emailInput);
  formSection.appendChild(signUpButton);

  // Add sections to content wrapper
  contentWrapper.appendChild(headingSection);
  contentWrapper.appendChild(formSection);

  // Create terms and conditions section
  const termsSection = document.createElement('div');
  termsSection.className = 'terms-conditions';

  // Move the terms content
  if (rows[1]) {
    const termsDiv = rows[1].querySelector('div');
    if (termsDiv) {
      termsSection.appendChild(termsDiv);
    }
  }

  // Clear the block and add new structure
  block.innerHTML = '';
  block.appendChild(contentWrapper);
  block.appendChild(termsSection);
}
