// CRA embeds these public EmailJS identifiers at build time. Never put SMTP passwords here.
process.env.NODE_ENV = 'production';
require('react-scripts/config/env');

const keys = ['REACT_APP_EMAILJS_SERVICE_ID', 'REACT_APP_EMAILJS_TEMPLATE_ID', 'REACT_APP_EMAILJS_PUBLIC_KEY'];
const missing = keys.filter(key => !process.env[key]?.trim() || /^(your_|replace|example)/i.test(process.env[key]));
if (missing.length) {
  console.error('EmailJS configuration missing: ' + missing.join(', '));
  console.error('Set .env.local locally or repository Actions variables before building. See README.md.');
  process.exit(1);
}
console.log('EmailJS build configuration is present.');
