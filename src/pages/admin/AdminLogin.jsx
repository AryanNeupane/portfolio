import React, { useState, useEffect } from 'react';
import { Lock, AlertCircle, Key, LogIn } from 'lucide-react';
import { auth } from '../../services/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function AdminLogin({ onNavigate }) {
  const [status, setStatus] = useState({ loading: false, loadingMessage: '', error: null });

  const handleGoogleLogin = async (e) => {
    if (e) e.preventDefault();
    setStatus({ loading: true, loadingMessage: 'Signing in...', error: null });

    if (!auth) {
      setStatus({
        loading: false,
        loadingMessage: '',
        error: 'Firebase Authentication is not configured. Add credentials to your local .env file.',
      });
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      // Prompt user to select account if they have multiple
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      
      setStatus({ loading: true, loadingMessage: 'Checking authorization...', error: null });
      
      // Explicit Frontend Authorization Check
      if (result.user.email !== 'official.aryanneupane@gmail.com') {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
        setStatus({ 
          loading: false, 
          loadingMessage: '',
          error: 'Access denied. This account is not authorized for administration.' 
        });
        return;
      }
      
      // If authorized, App.jsx's onAuthStateChanged will handle the routing.

    } catch (err) {
      console.error("Firebase Auth Error:", err);
      // Ignore if user just closed the popup
      if (err.code === 'auth/popup-closed-by-user') {
        setStatus({ loading: false, loadingMessage: '', error: null });
        return;
      }
      setStatus({
        loading: false,
        loadingMessage: '',
        error: `Firebase Auth Error: ${err.code || err.message}`,
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
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ wordBreak: 'break-word' }}>{status.error}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={handleGoogleLogin}
              className="btn btn-accent" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} 
              disabled={status.loading}
            >
              <LogIn size={18} />
              <span>{status.loading ? status.loadingMessage : 'Continue with Google'}</span>
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              onClick={() => onNavigate('/')}
              disabled={status.loading}
            >
              Return to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
