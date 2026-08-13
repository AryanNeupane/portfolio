// EmailJS Integration Service with Firestore Fallback

export const sendEmailJSMessage = async (formData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'General Portfolio Inquiry',
            company: formData.company || 'N/A',
            reason: formData.reason || 'General Contact',
            message: formData.message
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`EmailJS Transmission Error: ${errText}`);
      }

      return { success: true, method: 'emailjs' };
    } catch (error) {
      console.warn("EmailJS failed, falling back to local/Firestore storage:", error.message);
    }
  } else {
    console.info("EmailJS environment variables not configured yet. Using Firestore/Local storage fallback.");
  }

  // Fallback return signal
  return { success: true, method: 'fallback' };
};
