// EmailJS Integration Service with Firestore Fallback
import emailjs from '@emailjs/browser';

export const sendEmailJSMessage = async (formData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'General Portfolio Inquiry',
          company: formData.company || 'N/A',
          reason: formData.reason || 'General Contact',
          message: formData.message
        },
        publicKey
      );

      return { success: true, method: 'emailjs', response };
    } catch (error) {
      console.warn("EmailJS failed, falling back to local/Firestore storage:", error.text || error.message);
    }
  } else {
    console.info("EmailJS environment variables not configured yet. Using Firestore/Local storage fallback.");
  }

  // Fallback return signal
  return { success: true, method: 'fallback' };
};
