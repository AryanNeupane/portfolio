import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Tag, Shield, Share2 } from 'lucide-react';
import { getBlogPostBySlug } from '../services/dataService';

export default function BlogPostPage({ slug, onNavigate }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getBlogPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to load blog post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2>Post Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The requested blog post could not be located.</p>
        <button className="btn btn-outline" onClick={() => onNavigate('/blog')}>
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </button>
      </div>
    );
  }

  return (
    <article className="blog-post-page section">
      <div className="container">
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onNavigate('/blog')}
          style={{ marginBottom: '2rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Articles</span>
        </button>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', pb: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge badge-indigo">{post.category}</span>
              {post.tags?.map((t, i) => (
                <span key={i} className="badge">#{t}</span>
              ))}
            </div>

            <h1 style={{ marginBottom: '1.25rem', lineHeight: '1.3' }}>{post.title}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                <span>{post.publishedAt}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} />
                <span>{post.readingTime}</span>
              </div>
              <span>By Aryan Neupane</span>
            </div>
          </header>

          {/* Article Body */}
          <div 
            style={{ 
              fontSize: '1.05rem', 
              lineHeight: '1.8', 
              color: 'var(--text-secondary)' 
            }}
          >
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.35rem' }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('* ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
