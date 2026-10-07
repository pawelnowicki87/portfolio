import emailjs from '@emailjs/browser';

export class ContactError extends Error {
  constructor(code) { super(code); this.code = code; }
}
export function getContactConfig() {
  return {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID?.trim(),
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID?.trim(),
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY?.trim(),
  };
}
export async function sendContact(form, config = getContactConfig()) {
  const params = {
    user_name: form.user_name.trim(),
    user_email: form.user_email.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
  };
  if (!params.user_name || !params.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.user_email)) throw new ContactError('invalid');
  if (!config.serviceId || !config.templateId || !config.publicKey) throw new ContactError('unavailable');
  // Keep legacy template fields and supply Reply-To for templates which use it.
  await emailjs.send(config.serviceId, config.templateId, { ...params, reply_to: params.user_email }, { publicKey: config.publicKey });
}
