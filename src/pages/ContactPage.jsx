import React, { useRef, useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin, MapPin } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/seedData';
import { submitContactMessage } from '../services/dataService';
import { sendEmailJSMessage, isEmailJsConfigured } from '../services/emailService';
import { useToast } from '../components/Toast';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '', website_url_hp: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });
  const renderedAt = useRef(Date.now());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Please enter your name.';
    if (!formData.email.trim()) next.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(formData.email.trim())) next.email = 'Please enter a valid email address.';
    if (!formData.subject.trim()) next.subject = 'Please enter a subject.';
    if (!formData.message.trim()) next.message = 'Please enter a message.';
    else if (formData.message.trim().length < 20) next.message = 'Please provide at least 20 characters.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam traps: hidden field completion, and submission faster than a human.
    if (formData.website_url_hp || Date.now() - renderedAt.current < 2500) {
      setFormData(EMPTY_FORM);
      setStatus({ submitting: false, success: true, error: null });
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ submitting: false, success: false, error: 'Please correct the highlighted fields.' });
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    setStatus({ submitting: true, success: false, error: null });

    try {
      await sendEmailJSMessage(payload);
    } catch (err) {
      console.error('EmailJS delivery failed:', err);
      setStatus({
        submitting: false,
        success: false,
        error: `Message could not be sent. Please email ${PERSONAL_PROFILE.emails[0]} directly.`,
      });
      addToast('Message could not be sent.', 'error');
      return;
    }

    // Delivery succeeded; archiving to Firestore is best-effort.
    try {
      await submitContactMessage(payload);
    } catch (err) {
      console.warn('Message delivered but not archived:', err.message);
    }

    setFormData(EMPTY_FORM);
    setErrors({});
    setStatus({ submitting: false, success: true, error: null });
    addToast('Message sent.', 'success');
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `form-input ${errors[name] ? 'has-error' : ''}`,
  });

  return (
    <div className="contact-page section">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Contact</p>
          <h1>Let&rsquo;s connect</h1>
          <p className="page-lead">
            Open to conversations about GRC and ISO 27001 work, security testing, and junior analyst roles.
          </p>
        </header>

        <div className="contact-layout">
          <aside className="contact-details" aria-label="Direct contact channels">
            <div className="contact-detail">
              <span className="label mono">Email</span>
              <a href={`mailto:${PERSONAL_PROFILE.emails[0]}`}>
                <Mail size={15} aria-hidden="true" />
                {PERSONAL_PROFILE.emails[0]}
              </a>
            </div>

            <div className="contact-detail">
              <span className="label mono">Elsewhere</span>
              <a href={PERSONAL_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={15} aria-hidden="true" />
                LinkedIn
              </a>
              <a href={PERSONAL_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <Github size={15} aria-hidden="true" />
                GitHub
              </a>
            </div>

            <div className="contact-detail">
              <span className="label mono">Based in</span>
              <p>
                <MapPin size={15} aria-hidden="true" /> {PERSONAL_PROFILE.location} — available for remote roles
              </p>
            </div>
          </aside>

          <div className="contact-form-panel">
            {status.success ? (
              <div className="form-success" role="status">
                <CheckCircle2 size={32} aria-hidden="true" />
                <h2>Message sent</h2>
                <p>Thanks for reaching out — I&rsquo;ll reply to the address you provided.</p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    renderedAt.current = Date.now();
                    setStatus({ submitting: false, success: false, error: null });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="form-title">Send a message</h2>

                {!isEmailJsConfigured && (
                  <p className="form-notice" role="status">
                    Email delivery is not configured in this environment. Please email{' '}
                    <a href={`mailto:${PERSONAL_PROFILE.emails[0]}`}>{PERSONAL_PROFILE.emails[0]}</a> directly.
                  </p>
                )}

                {status.error && (
                  <p className="form-error-summary" role="alert">
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>{status.error}</span>
                  </p>
                )}

                {/* Honeypot — hidden from users and assistive technology. */}
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website_url_hp">Leave this field empty</label>
                  <input
                    id="website_url_hp"
                    type="text"
                    name="website_url_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_url_hp}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input type="text" autoComplete="name" required {...fieldProps('name')} />
                  {errors.name && (
                    <span className="field-error" id="name-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input type="email" autoComplete="email" required {...fieldProps('email')} />
                  {errors.email && (
                    <span className="field-error" id="email-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <input type="text" required {...fieldProps('subject')} />
                  {errors.subject && (
                    <span className="field-error" id="subject-error">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    rows={6}
                    required
                    {...fieldProps('message')}
                    className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                  />
                  {errors.message && (
                    <span className="field-error" id="message-error">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-accent btn-block" disabled={status.submitting}>
                  <Send size={16} aria-hidden="true" />
                  <span>{status.submitting ? 'Sending…' : 'Send message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
