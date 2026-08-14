import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Shield, Github, Linkedin, ExternalLink, MapPin } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/seedData';
import { submitContactMessage } from '../services/dataService';
import { sendEmailJSMessage } from '../services/emailService';
import { useToast } from '../components/Toast';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company: '',
    reason: 'GRC Discussion',
    message: '',
    website_url_hp: '' // Honeypot
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null, rateLimited: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status.rateLimited) return; // Prevent double submission if already blocked

    // Honeypot check
    if (formData.website_url_hp) {
      console.warn("Honeypot field triggered.");
      setStatus({ submitting: false, success: true, error: null, rateLimited: false });
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please complete all required fields.', rateLimited: false });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, rateLimited: false });

    try {
      // 1. Save Message to Backend (The Backend enforces the rate limit)
      const submitResponse = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Portfolio Inquiry',
        company: formData.company.trim() || 'N/A',
        reason: formData.reason,
        message: formData.message.trim()
      });

      // Simulated error detection (The actual backend would throw or return a status)
      // We will catch it in the catch block if the API fails with a 429
      
      // 2. Transmit via EmailJS (only if backend allows it)
      await sendEmailJSMessage(formData);

      setStatus({ submitting: false, success: true, error: null, rateLimited: false });
      addToast('Message transmitted successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', company: '', reason: 'GRC Discussion', message: '', website_url_hp: '' });
    } catch (err) {
      console.error("Contact form error:", err);
      
      const errorMessage = err.message || '';
      
      // Handle the server-side rate limit response
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('too many') || errorMessage.toLowerCase().includes('rate limit')) {
        setStatus({ submitting: false, success: false, error: 'Too many contact form submissions. Please try again after 24 hours.', rateLimited: true });
        addToast('Rate limit exceeded. Please try again later.', 'error');
      } else {
        setStatus({ submitting: false, success: false, error: 'Failed to send message. Please email directly or try again.', rateLimited: false });
        addToast('Error sending message. Try direct email.', 'error');
      }
    }
  };

  return (
    <div className="contact-page section">
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1.25rem' }}>Secure Communication</div>
          <h1 style={{ marginBottom: '1.25rem', fontSize: '2.5rem', letterSpacing: '-0.04em' }}>Initiate Contact</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '700px' }}>
            Open to professional discussions regarding GRC assessments, ISO 27001 implementations, security testing, and enterprise career opportunities.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {/* Contact Details & Links */}
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Verified Channels</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-secondary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>Primary Communication</div>
                  <a href={`mailto:${PERSONAL_PROFILE.emails[0]}`} style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Mail size={18} />
                    <span>{PERSONAL_PROFILE.emails[0]}</span>
                  </a>
                </div>

                <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Professional Network</div>
                    <div style={{ fontWeight: '500', marginTop: '0.3rem' }}>LinkedIn & GitHub</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={PERSONAL_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} aria-label="LinkedIn">
                      <Linkedin size={22} />
                    </a>
                    <a href={PERSONAL_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} aria-label="GitHub">
                      <Github size={22} />
                    </a>
                  </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <MapPin size={22} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Geographic Availability</div>
                    <div style={{ fontWeight: '500', fontSize: '0.95rem', marginTop: '0.2rem' }}>Nepal • Available for Global Remote</div>
                  </div>
                </div>
              </div>
            </div>

            {/* EmailJS Integrated Contact Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Secure Transmission</h3>

              {status.success ? (
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '2.5rem 2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem', margin: '0 auto' }} />
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Message Transmitted</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Your communication has been securely logged and dispatched.
                  </p>
                  <button 
                    className="btn btn-outline"
                    onClick={() => setStatus({ submitting: false, success: false, error: null, rateLimited: false })}
                    style={{ width: '100%' }}
                  >
                    Initiate New Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input 
                      type="text" 
                      name="website_url_hp" 
                      tabIndex="-1" 
                      autoComplete="off"
                      value={formData.website_url_hp}
                      onChange={handleChange} 
                    />
                  </div>

                  {status.error && (
                    <div style={{ background: status.rateLimited ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${status.rateLimited ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: status.rateLimited ? 'var(--accent-amber)' : 'var(--accent-rose)', fontSize: '0.9rem', fontWeight: '500' }}>
                      <AlertCircle size={20} />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="form-input"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.rateLimited || status.submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="form-input"
                      placeholder="e.g. alex@organization.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status.rateLimited || status.submitting}
                    />
                  </div>

                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Organization</label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        className="form-input"
                        placeholder="Optional"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={status.rateLimited || status.submitting}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reason">Inquiry Type</label>
                      <select
                        id="reason"
                        name="reason"
                        className="form-select"
                        value={formData.reason}
                        onChange={handleChange}
                        disabled={status.rateLimited || status.submitting}
                      >
                        <option value="GRC Discussion">GRC / ISO 27001 Inquiry</option>
                        <option value="Security Assessment">Security Assessment</option>
                        <option value="Career Opportunity">Career Opportunity</option>
                        <option value="General Inquiry">General Discussion</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      className="form-input"
                      placeholder="Brief topic title"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status.rateLimited || status.submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message Body *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="form-textarea"
                      placeholder="Provide details of your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status.rateLimited || status.submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    disabled={status.submitting || status.rateLimited}
                  >
                    <Send size={18} />
                    <span>{status.submitting ? 'Transmitting...' : status.rateLimited ? 'Transmission Locked (24h)' : 'Transmit Secure Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
