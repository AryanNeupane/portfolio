import React, { useEffect, useMemo, useState } from 'react';
import { getBlogPosts } from '../services/dataService';

export default function BlogPage({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    let cancelled = false;
    async function fetchPosts() {
      try {
        const data = await getBlogPosts();
        if (!cancelled) setPosts(data);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(() => ['All', ...new Set(posts.flatMap((p) => p.tags || []))], [posts]);

  const visiblePosts = useMemo(
    () => (activeTag === 'All' ? posts : posts.filter((p) => p.tags?.includes(activeTag))),
    [posts, activeTag]
  );

  return (
    <div className="blog-page section">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Writing</p>
          <h1>Notes on GRC and security practice</h1>
          <p className="page-lead">
            Framework comparisons, lab observations and documentation lessons from work that is published in the
            linked repositories.
          </p>
        </header>

        {tags.length > 2 && (
          <div className="filter-row" role="group" aria-label="Filter posts by tag">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="filter-chip"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="empty-state">Loading posts…</p>
        ) : visiblePosts.length === 0 ? (
          <p className="empty-state">No posts published under this tag yet.</p>
        ) : (
          <div className="post-list">
            {visiblePosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="post-item"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/blog/${post.slug}`);
                }}
              >
                <div className="post-item-meta">
                  <span>{post.category}</span>
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="post-item-title">{post.title}</h2>
                <p>{post.excerpt}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
