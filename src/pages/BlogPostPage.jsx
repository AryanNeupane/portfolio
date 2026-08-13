import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '../services/dataService';
import PageMeta from '../components/PageMeta';

// Minimal renderer for the markdown subset used in post content:
// "### " headings, "* " bullet lists, and paragraphs.
function renderContent(content) {
  return content.split('\n\n').map((block, index) => {
    if (block.startsWith('### ')) {
      return <h2 key={index}>{block.replace('### ', '')}</h2>;
    }
    if (block.startsWith('* ')) {
      return (
        <ul key={index}>
          {block.split('\n').map((item, i) => (
            <li key={i}>{item.replace(/^\* /, '')}</li>
          ))}
        </ul>
      );
    }
    return <p key={index}>{block}</p>;
  });
}

export default function BlogPostPage({ slug, onNavigate }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchPost() {
      setLoading(true);
      try {
        const data = await getBlogPostBySlug(slug);
        if (!cancelled) setPost(data);
      } catch (err) {
        console.error('Failed to load blog post:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="section container">
        <p className="empty-state">Loading article…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section container">
        <div className="empty-state">
          <h2>Post not found</h2>
          <p>The requested article could not be located.</p>
          <button type="button" className="btn btn-outline" onClick={() => onNavigate('/blog')}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to writing</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-post-page section">
      <PageMeta
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        article={{
          title: post.title,
          description: post.seoDescription || post.excerpt,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        }}
      />
      <div className="container">
        <a
          href="/blog"
          className="back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/blog');
          }}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>All posts</span>
        </a>

        <header className="article-header">
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="page-lead">{post.excerpt}</p>
          <div className="article-meta">
            <span>Aryan Neupane</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="article-body article-content">{renderContent(post.content || '')}</div>

        {post.tags?.length > 0 && (
          <div className="article-body tag-row" style={{ marginTop: '2.5rem' }}>
            {post.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
