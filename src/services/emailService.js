const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailJsConfigured = Boolean(serviceId && templateId && publicKey);

/**
 * Sends the contact form through EmailJS.
 *
 * The payload carries each value under the common EmailJS variable spellings
 * ({{name}}/{{from_name}}, {{email}}/{{from_email}}/{{reply_to}},
 * {{subject}}/{{title}}, {{message}}) so the template renders regardless of
 * which naming the template author used. Unused keys are ignored by EmailJS.
 *
 * Throws on failure — the caller is responsible for the error state.
 */
export const sendEmailJSMessage = async ({ name, email, subject, message }) => {
  if (!isEmailJsConfigured) {
    throw new Error('Email delivery is not configured.');
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name,
        from_name: name,
        email,
        from_email: email,
        reply_to: email,
        subject,
        title: subject,
        message,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `EmailJS request failed with status ${response.status}`);
  }

  return { success: true };
};
