import emailjs from '@emailjs/browser';
import { sendContact } from './contactService';

jest.mock('@emailjs/browser', () => ({ send: jest.fn() }));
const config = { serviceId: 'test-service', templateId: 'test-template', publicKey: 'test-public' };
const form = { user_name: '  Paweł  ', user_email: '  pawel@example.com ', subject: ' Test ', message: ' Hello ' };
beforeEach(() => jest.resetAllMocks());

test('never reports success or contacts the provider without configuration', async () => {
  await expect(sendContact(form, {})).rejects.toMatchObject({ code: 'unavailable' });
  expect(emailjs.send).not.toHaveBeenCalled();
});

test.each([
  { ...form, user_name: '   ' },
  { ...form, message: '   ' },
  { ...form, user_email: 'not-an-email' },
])('rejects incomplete or invalid messages before sending', async input => {
  await expect(sendContact(input, config)).rejects.toMatchObject({ code: 'invalid' });
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('preserves the legacy template fields and supplies the sender as Reply-To', async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  await sendContact(form, config);
  expect(emailjs.send).toHaveBeenCalledWith('test-service', 'test-template', {
    user_name: 'Paweł', user_email: 'pawel@example.com', reply_to: 'pawel@example.com', subject: 'Test', message: 'Hello',
  }, { publicKey: 'test-public' });
});

test('propagates provider rejection, including a disconnected Gmail service', async () => {
  const failure = { status: 412, text: 'Invalid grant' };
  emailjs.send.mockRejectedValue(failure);
  await expect(sendContact(form, config)).rejects.toBe(failure);
});

test('waits for provider confirmation before resolving', async () => {
  let accept;
  emailjs.send.mockReturnValue(new Promise(resolve => { accept = resolve; }));
  let done = false;
  const pending = sendContact(form, config).then(() => { done = true; });
  await Promise.resolve();
  expect(done).toBe(false);
  accept({ status: 200 });
  await pending;
  expect(done).toBe(true);
});
