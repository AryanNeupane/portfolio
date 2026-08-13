import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Eye, FileText, Mail, LogOut, CheckCircle, AlertTriangle, Layers, Save, RefreshCw, Image, Upload, HardDrive } from 'lucide-react';
import { getProjects, getBlogPosts, getContactMessages, saveProject, saveBlogPost } from '../../services/dataService';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const refreshData = async () => {
    setLoading(true);
    try {
      const [projData, blogData, msgData] = await Promise.all([
        getProjects(true),
        getBlogPosts(true),
        getContactMessages()
      ]);
      setProjects(projData);
      setPosts(blogData);
      setMessages(msgData);
    } catch (err) {
      console.error("Dashboard refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSaveProjectForm = async (e) => {
    e.preventDefault();
    await saveProject(editingProject);
    setEditingProject(null);
    refreshData();
  };

  const handleSavePostForm = async (e) => {
    e.preventDefault();
    await saveBlogPost(editingPost);
    setEditingPost(null);
    refreshData();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('File size exceeds 10MB limit.');
      return;
    }

    setUploadStatus('Uploading file...');
    try {
      if (storage) {
        const fileRef = ref(storage, `public/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        setUploadStatus(`File uploaded successfully! URL: ${url}`);
      } else {
        setUploadStatus('Firebase Storage offline / simulation mode.');
      }
    } catch (err) {
      setUploadStatus(`Upload error: ${err.message}`);
    }
  };

  const publishedProjectsCount = projects.filter(p => p.published).length;
  const draftProjectsCount = projects.filter(p => !p.published).length;
  const publishedPostsCount = posts.filter(b => b.published).length;
  const draftPostsCount = posts.filter(b => !b.published).length;

  return (
    <div className="admin-dashboard-page section">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', pb: '1.5rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Authenticated Control Panel</div>
            <h1>Portfolio CMS Administration</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline btn-sm" onClick={refreshData}>
              <RefreshCw size={14} />
              <span>Refresh Data</span>
            </button>
            <button className="btn btn-outline btn-sm" onClick={onLogout}>
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="tab-list">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <HardDrive size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            Overview
          </button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Layers size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            Projects ({projects.length})
          </button>
          <button className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => setActiveTab('blog')}>
            <FileText size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            Blog ({posts.length})
          </button>
          <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <Mail size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            Messages ({messages.length})
          </button>
          <button className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <Image size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            Media & Storage
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
              <div className="card">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Published Projects</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--accent-primary)', margin: '0.4rem 0' }}>{publishedProjectsCount}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Drafts: {draftProjectsCount}</div>
              </div>

              <div className="card">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Published Articles</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--accent-indigo)', margin: '0.4rem 0' }}>{publishedPostsCount}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Drafts: {draftPostsCount}</div>
              </div>

              <div className="card">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Received Messages</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>{messages.length}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contact form submissions</div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>System Status & Activity</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Firestore Data Engine: Nominal / Operating</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Firebase Authentication: Active</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span>VertexOne Capstone Deliverables: 14 Artifacts Online</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Projects & Case Studies</h3>
              <button 
                className="btn btn-accent btn-sm"
                onClick={() => setEditingProject({ title: '', slug: '', summary: '', category: 'GRC', published: true, featured: false, frameworks: [], deliverables: [] })}
              >
                <Plus size={14} />
                <span>New Project</span>
              </button>
            </div>

            {editingProject && (
              <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--accent-primary)' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                  {editingProject.id ? 'Edit Project' : 'Create Project'}
                </h4>
                <form onSubmit={handleSaveProjectForm}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={editingProject.title} 
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Slug</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={editingProject.slug} 
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Summary</label>
                    <textarea 
                      className="form-textarea" 
                      rows={3} 
                      value={editingProject.summary || ''} 
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={Boolean(editingProject.published)} 
                        onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })} 
                      />
                      <span>Published (Public)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={Boolean(editingProject.featured)} 
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })} 
                      />
                      <span>Featured</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className="btn btn-accent btn-sm">
                      <Save size={14} />
                      <span>Save Project</span>
                    </button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingProject(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grc-table-container">
              <table className="grc-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{p.title}</td>
                      <td><span className="badge">{p.category}</span></td>
                      <td>{p.published ? <span className="badge badge-emerald">Published</span> : <span className="badge badge-amber">Draft</span>}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem' }} onClick={() => setEditingProject(p)}>
                          <Edit size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Journal Articles</h3>
              <button 
                className="btn btn-accent btn-sm"
                onClick={() => setEditingPost({ title: '', slug: '', excerpt: '', content: '', category: 'GRC', published: true, readingTime: '5 min read' })}
              >
                <Plus size={14} />
                <span>New Post</span>
              </button>
            </div>

            {editingPost && (
              <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--accent-indigo)' }}>
                <h4 style={{ color: 'var(--accent-indigo)', marginBottom: '1rem' }}>
                  {editingPost.id ? 'Edit Article' : 'Write New Article'}
                </h4>
                <form onSubmit={handleSavePostForm}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Article Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={editingPost.title} 
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Slug</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={editingPost.slug} 
                        onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Excerpt</label>
                    <textarea 
                      className="form-textarea" 
                      rows={2} 
                      value={editingPost.excerpt || ''} 
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Content (Markdown)</label>
                    <textarea 
                      className="form-textarea" 
                      rows={8} 
                      value={editingPost.content || ''} 
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className="btn btn-accent btn-sm">
                      <Save size={14} />
                      <span>Save Article</span>
                    </button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPost(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grc-table-container">
              <table className="grc-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Reading Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{post.title}</td>
                      <td><span className="badge badge-indigo">{post.category}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{post.readingTime}</td>
                      <td>{post.published ? <span className="badge badge-emerald">Published</span> : <span className="badge">Draft</span>}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem' }} onClick={() => setEditingPost(post)}>
                          <Edit size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Contact Form Submissions</h3>
            {messages.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{msg.subject || 'General Inquiry'}</h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          From: <strong>{msg.name}</strong> (&lt;{msg.email}&gt;) {msg.company ? `• ${msg.company}` : ''}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {msg.createdAt}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.925rem', whiteSpace: 'pre-wrap', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media Management Tab */}
        {activeTab === 'media' && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Media & Artifact Storage (Firebase Storage)</h3>
            <div className="card" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Upload Public Asset</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Upload cover images, diagrams, or PDF report evidence (Max file size: 10MB).
              </p>
              
              <div className="form-group">
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={handleFileUpload} 
                  className="form-input" 
                />
              </div>

              {uploadStatus && (
                <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem', wordBreak: 'break-all' }}>
                  {uploadStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
