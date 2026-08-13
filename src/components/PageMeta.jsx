import { useEffect } from 'react';

const SITE_URL = 'https://aryanneupane.com.np';
const DEFAULT_TITLE = 'Aryan Neupane | Cybersecurity & GRC';
const DEFAULT_DESCRIPTION =
  'Early-career cybersecurity and GRC portfolio showcasing ISO/IEC 27001:2022, NIST CSF 2.0, hands-on security practice, and evidence-based governance work.';

function setMeta(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function PageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  article = null,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Aryan Neupane` : DEFAULT_TITLE;
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`;

    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:type', type, true);
    setMeta('og:url', canonical, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setCanonical(canonical);

    if (article) {
      setJsonLd('page-structured-data', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        author: { '@type': 'Person', name: 'Aryan Neupane' },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        mainEntityOfPage: canonical,
      });
    } else {
      const existing = document.getElementById('page-structured-data');
      existing?.remove();
    }
  }, [title, description, path, type, article]);

  return null;
}
