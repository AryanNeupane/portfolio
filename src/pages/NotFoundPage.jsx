import React from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFoundPage({ onNavigate }) {
  return (
    <div className="section container" style={{ textAlign: 'center', padding: '7rem 0', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
        <ShieldAlert size={28} />
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>404 — Page Not Found</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2rem' }}>
        The requested URL path does not exist on this portfolio platform.
      </p>

      <button className="btn btn-accent" onClick={() => onNavigate('/')}>
        <ArrowLeft size={16} />
        <span>Return to Homepage</span>
      </button>
    </div>
  );
}
