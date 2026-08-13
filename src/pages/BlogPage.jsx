import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Calendar, Clock, Tag } from 'lucide-react';
import { getBlogPosts } from '../services/dataService';

export default function BlogPage({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const allTags = ['All', ...new Set(posts.flatMap(p => p.tags || []))];

  const filteredPosts = posts.filter(p => {
    if (selectedTag === 'All') return true;
    return p.tags?.includes(selectedTag);
  });

  return (
    <div className="blog-page section">
      <div className="container">
        <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '1rem' }}>Technical Writing & Notes</div>
          <h1 style={{ marginBottom: '1rem' }}>Cybersecurity & GRC Journal</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Documenting practical observations, framework comparisons, laboratory experiments, and governance lessons.
          </p>
        </div>

        {/* Tag Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`btn btn-sm ${selectedTag === tag ? 'btn-accent' : 'btn-outline'}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Post List */}
        <div className="grid-2">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="card"
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-indigo">{post.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                  </span>
                </div>

                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {post.tags?.map((t, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.75rem' }}>#{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.publishedAt}</span>
                  <span style={{ color: 'var(--accent-blue)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Read Article</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
