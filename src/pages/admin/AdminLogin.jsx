import React, { useState } from 'react';
import { Lock, AlertCircle, Key } from 'lucide-react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AdminLogin({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null });

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    if (!auth) {
      setStatus({
        loading: false,
        error: 'Firebase Authentication is not configured. Add credentials to your local .env file.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.code?.startsWith('auth/') ? 'Invalid email or password.' : err.message,
      });
    }
  };

  return (
    <div className="admin-login-page section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--accent-primary)',
              }}
            >
              <Lock size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Administration</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Authorized access for portfolio content management.
            </p>
          </div>

          {status.error && (
            <div
              style={{
                background: 'rgba(196, 122, 122, 0.08)',
                border: '1px solid var(--border-color)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-rose)',
                fontSize: '0.875rem',
              }}
            >
              <AlertCircle size={16} />
              <span>{status.error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-email">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                className="form-input"
                placeholder="contact@aryanneupane.com.np"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="admin-pass">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                autoComplete="current-password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '0.5rem' }} disabled={status.loading}>
              <Key size={16} />
              <span>{status.loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              onClick={() => onNavigate('/')}
            >
              Return to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
