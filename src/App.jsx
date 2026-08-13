import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import PageMeta from './components/PageMeta';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './components/Toast';
import { getInitialTheme, applyTheme, initThemeListeners } from './utils/theme';
import { auth, db } from './services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ROUTE_META = {
  '/': {
    description:
      'Building practical cybersecurity governance, risk and compliance work backed by hands-on security foundations.',
  },
  '/about': {
    title: 'About',
    description:
      'Background in BIM studies, cybersecurity internship, GRC mentorship, and hands-on security practice.',
  },
  '/portfolio': {
    title: 'Portfolio',
    description: 'Evidence-based security projects, ISO 27001 GRC capstone, SOC lab, and vulnerability assessment work.',
  },
  '/blog': {
    title: 'Blog',
    description: 'Technical notes on ISO 27001, NIST CSF 2.0, risk registers, and security operations.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Get in touch regarding GRC opportunities, security practice, and professional inquiries.',
  },
  '/admin/login': {
    title: 'Admin',
    description: 'Portfolio administration.',
  },
  '/admin/dashboard': {
    title: 'Admin Dashboard',
    description: 'Portfolio content management.',
  },
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    applyTheme(getInitialTheme());
    const removeThemeListener = initThemeListeners();

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);

    let unsubscribe = () => {};
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdminAuthenticated(true);
            } else {
              // Valid login but not an admin
              setIsAdminAuthenticated(false);
              // Optionally sign them out since this app is only for admins
              // await signOut(auth);
            }
          } catch (err) {
            console.error("Authorization check failed:", err);
            setIsAdminAuthenticated(false);
          }
        } else {
          setIsAdminAuthenticated(false);
        }
        setAuthReady(true);
      });
    } else {
      setAuthReady(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      removeThemeListener();
      unsubscribe();
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setIsAdminAuthenticated(false);
    navigateTo('/');
  };

  const getMeta = () => {
    if (currentPath.startsWith('/portfolio/')) {
      return {
        title: 'Project',
        description: 'Portfolio project case study and GRC artifacts.',
        path: currentPath,
      };
    }
    if (currentPath.startsWith('/blog/')) {
      return {
        title: 'Article',
        description: 'Cybersecurity and GRC technical article.',
        path: currentPath,
      };
    }
    return { ...ROUTE_META[currentPath], path: currentPath };
  };

  const meta = getMeta();

  const renderRoute = () => {
    if (currentPath === '/') {
      return <HomePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/portfolio') {
      return <PortfolioPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/portfolio/')) {
      const slug = currentPath.replace('/portfolio/', '');
      return <ProjectDetailPage slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath === '/blog') {
      return <BlogPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return <BlogPostPage slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/admin/login' || currentPath === '/admin') {
      if (!authReady) {
        return (
          <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Verifying session...</p>
          </div>
        );
      }
      if (isAdminAuthenticated) {
        return <AdminDashboard onLogout={handleLogout} onNavigate={navigateTo} />;
      }
      return <AdminLogin onNavigate={navigateTo} />;
    }
    if (currentPath === '/admin/dashboard') {
      if (!authReady) {
        return (
          <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Verifying session...</p>
          </div>
        );
      }
      if (!isAdminAuthenticated) {
        return <AdminLogin onNavigate={navigateTo} />;
      }
      return <AdminDashboard onLogout={handleLogout} onNavigate={navigateTo} />;
    }

    return <NotFoundPage onNavigate={navigateTo} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <ToastProvider>
      <PageMeta title={meta.title} description={meta.description} path={meta.path} />
      <ScrollToTop path={currentPath} />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!isAdminRoute && <Navbar currentPath={currentPath} onNavigate={navigateTo} />}
        <main style={{ flex: 1 }}>{renderRoute()}</main>
        {!isAdminRoute && <Footer onNavigate={navigateTo} />}
      </div>
    </ToastProvider>
  );
}
