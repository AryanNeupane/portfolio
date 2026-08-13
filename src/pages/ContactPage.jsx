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

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website_url_hp) {
      console.warn("Honeypot field triggered.");
      setStatus({ submitting: false, success: true, error: null });
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please complete all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      // 1. Attempt EmailJS Transmission
      await sendEmailJSMessage(formData);

      // 2. Save Message to Firestore/Local Storage for Admin Review
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Portfolio Inquiry',
        company: formData.company.trim() || 'N/A',
        reason: formData.reason,
        message: formData.message.trim()
      });

      setStatus({ submitting: false, success: true, error: null });
      addToast('Message transmitted successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', company: '', reason: 'GRC Discussion', message: '', website_url_hp: '' });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ submitting: false, success: false, error: 'Failed to send message. Please email directly or try again.' });
      addToast('Error sending message. Try direct email.', 'error');
    }
  };

  return (
    <div className="contact-page section">
      <div className="container">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1rem' }}>Communication Channel</div>
          <h1 style={{ marginBottom: '1rem' }}>Let's connect.</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Open to discussions regarding GRC assessments, ISO 27001 implementations, security testing, and career opportunities.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Contact Details & Links */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Verified Communication Links</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>Primary Email</div>
                  <a href={`mailto:${PERSONAL_PROFILE.emails[0]}`} style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    <span>{PERSONAL_PROFILE.emails[0]}</span>
                  </a>
                </div>

                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>Secondary Email</div>
                  <a href={`mailto:${PERSONAL_PROFILE.emails[1]}`} style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    <span>{PERSONAL_PROFILE.emails[1]}</span>
                  </a>
                </div>

                <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Professional Network</div>
                    <div style={{ fontWeight: '600', marginTop: '0.2rem' }}>LinkedIn & GitHub</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href={PERSONAL_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                    <a href={PERSONAL_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} aria-label="GitHub">
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Location Availability</div>
                    <div style={{ fontWeight: '600', fontSize: '0.925rem' }}>Nepal / Available for Remote Global Roles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* EmailJS Integrated Contact Form */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Send Message</h3>

              {status.success ? (
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={40} style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Message Transmitted</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Thank you. Your message has been received and logged.
                  </p>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                  >
                    Send Another Message
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
                    <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', fontSize: '0.875rem' }}>
                      <AlertCircle size={16} />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="form-input"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={handleChange}
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
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company / Org (Optional)</label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        className="form-input"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reason">Reason for Contact</label>
                      <select
                        id="reason"
                        name="reason"
                        className="form-select"
                        value={formData.reason}
                        onChange={handleChange}
                      >
                        <option value="GRC Discussion">GRC / ISO 27001 Inquiry</option>
                        <option value="Security Assessment">Vulnerability / Security Testing</option>
                        <option value="Career Opportunity">Career / Recruitment</option>
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
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="form-textarea"
                      placeholder="Write your message details..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ width: '100%' }}
                    disabled={status.submitting}
                  >
                    <Send size={16} />
                    <span>{status.submitting ? 'Transmitting...' : 'Send Message'}</span>
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
