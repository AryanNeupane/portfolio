import React, { useEffect, useState } from 'react';
import {
  Edit,
  FileText,
  HardDrive,
  Image,
  Layers,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  getProjects,
  getBlogPosts,
  getContactMessages,
  saveProject,
  saveBlogPost,
  deleteProject,
  deleteBlogPost,
  setProjectFlag,
  setBlogPostFlag,
  setMessageRead,
  deleteContactMessage,
} from '../../services/dataService';
import { storage, isFirebaseConfigured } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '../../components/Toast';

const EMPTY_PROJECT = {
  title: '',
  slug: '',
  summary: '',
  category: 'GRC',
  published: false,
  featured: false,
  githubUrl: '',
  documentationUrl: '',
  coverImage: '',
  frameworks: [],
  deliverables: [],
};

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'GRC',
  tags: [],
  coverImage: '',
  seoTitle: '',
  seoDescription: '',
  readingTime: '5 min read',
  published: false,
  featured: false,
};

const toList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const formatDate = (value) => {
  if (!value) return '—';
  if (typeof value === 'string') return value.slice(0, 10);
  if (value.seconds) return new Date(value.seconds * 1000).toISOString().slice(0, 10);
  return '—';
};

export default function AdminDashboard({ onLogout }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const refreshData = async () => {
    setLoading(true);
    try {
      const [projectData, postData, messageData] = await Promise.all([
        getProjects(true),
        getBlogPosts(true),
        getContactMessages(),
      ]);
      setProjects(projectData);
      setPosts(postData);
      setMessages(messageData);
    } catch (err) {
      console.error('Dashboard refresh error:', err);
      addToast('Could not load content.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = async (action, successMessage) => {
    try {
      await action();
      await refreshData();
      if (successMessage) addToast(successMessage, 'success');
    } catch (err) {
      console.error(err);
      addToast(err.message || 'Action failed.', 'error');
    }
  };

  const confirmThen = (message, action) => {
    if (window.confirm(message)) run(action, 'Deleted.');
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-dashboard-page section">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Content management</h1>
            {!isFirebaseConfigured && (
              <p className="form-notice" style={{ marginTop: '1rem' }}>
                Firebase is not configured in this environment — changes are stored in this browser only.
              </p>
            )}
          </div>
          <div className="admin-toolbar">
            <button type="button" className="btn btn-outline btn-sm" onClick={refreshData} disabled={loading}>
              <RefreshCw size={14} aria-hidden="true" />
              <span>Refresh</span>
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={onLogout}>
              <LogOut size={14} aria-hidden="true" />
              <span>Log out</span>
            </button>
          </div>
        </header>

        <div className="tab-list" role="tablist" aria-label="Admin sections">
          {[
            { id: 'overview', label: 'Overview', icon: HardDrive },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
            { id: 'blog', label: `Blog (${posts.length})`, icon: FileText },
            { id: 'messages', label: `Messages (${unreadCount} unread)`, icon: Mail },
            { id: 'media', label: 'Media', icon: Image },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`admin-tab-${id}`}
              aria-selected={activeTab === id}
              aria-controls={`admin-panel-${id}`}
              className={`tab-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={14} style={{ marginRight: '0.4rem', display: 'inline' }} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <section id="admin-panel-overview" role="tabpanel" aria-labelledby="admin-tab-overview">
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-value">{projects.filter((p) => p.published).length}</div>
                <div className="stat-label">Published projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{projects.filter((p) => !p.published).length}</div>
                <div className="stat-label">Project drafts</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{posts.filter((p) => p.published).length}</div>
                <div className="stat-label">Published posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{posts.filter((p) => !p.published).length}</div>
                <div className="stat-label">Post drafts</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{unreadCount}</div>
                <div className="stat-label">Unread messages</div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Recent messages</h2>
            {messages.slice(0, 5).map((msg) => (
              <div key={msg.id} className={`admin-row ${msg.read ? '' : 'message-item unread'}`}>
                <div>
                  <h4>{msg.subject || 'No subject'}</h4>
                  <div className="admin-row-meta">
                    <span>{msg.name}</span>
                    <span>{msg.email}</span>
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                </div>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setActiveTab('messages')}>
                  View
                </button>
              </div>
            ))}
            {messages.length === 0 && <p className="empty-state">No messages yet.</p>}
          </section>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <section id="admin-panel-projects" role="tabpanel" aria-labelledby="admin-tab-projects">
            <div className="section-head">
              <h2 style={{ fontSize: '1.1rem' }}>Projects</h2>
              <button type="button" className="btn btn-accent btn-sm" onClick={() => setEditingProject({ ...EMPTY_PROJECT })}>
                <Plus size={14} aria-hidden="true" />
                <span>New project</span>
              </button>
            </div>

            {editingProject && (
              <form
                className="card"
                style={{ marginBottom: '2rem' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => saveProject(editingProject), 'Project saved.').then(() => setEditingProject(null));
                }}
              >
                <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>
                  {editingProject.id ? 'Edit project' : 'New project'}
                </h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-title">
                      Title
                    </label>
                    <input
                      id="project-title"
                      className="form-input"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-slug">
                      Slug
                    </label>
                    <input
                      id="project-slug"
                      className="form-input"
                      required
                      value={editingProject.slug}
                      onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="project-summary">
                    Summary
                  </label>
                  <textarea
                    id="project-summary"
                    className="form-textarea"
                    rows={3}
                    value={editingProject.summary || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-category">
                      Category
                    </label>
                    <input
                      id="project-category"
                      className="form-input"
                      value={editingProject.category || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-github">
                      GitHub URL
                    </label>
                    <input
                      id="project-github"
                      type="url"
                      className="form-input"
                      value={editingProject.githubUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-docs">
                      Artifact / documentation URL
                    </label>
                    <input
                      id="project-docs"
                      type="url"
                      className="form-input"
                      value={editingProject.documentationUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, documentationUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-image">
                      Cover image URL
                    </label>
                    <input
                      id="project-image"
                      type="url"
                      className="form-input"
                      value={editingProject.coverImage || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="project-frameworks">
                    Frameworks (comma separated)
                  </label>
                  <input
                    id="project-frameworks"
                    className="form-input"
                    value={(editingProject.frameworks || []).join(', ')}
                    onChange={(e) => setEditingProject({ ...editingProject, frameworks: toList(e.target.value) })}
                  />
                </div>

                <div className="admin-toolbar" style={{ marginBottom: '1.25rem', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.published)}
                      onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    />
                    <span>Published</span>
                  </label>
                  <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.featured)}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    />
                    <span>Featured</span>
                  </label>
                </div>

                <div className="admin-actions">
                  <button type="submit" className="btn btn-accent btn-sm">
                    <Save size={14} aria-hidden="true" />
                    <span>Save project</span>
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingProject(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {projects.map((project) => (
              <div key={project.id} className="admin-row">
                <div>
                  <h4>{project.title}</h4>
                  <div className="admin-row-meta">
                    <span>{project.category}</span>
                    <span>{project.published ? 'Published' : 'Draft'}</span>
                    {project.featured && <span>Featured</span>}
                  </div>
                </div>
                <div className="admin-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingProject(project)}>
                    <Edit size={12} aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      run(
                        () => setProjectFlag(project.id, 'published', !project.published),
                        project.published ? 'Unpublished.' : 'Published.'
                      )
                    }
                  >
                    {project.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => run(() => setProjectFlag(project.id, 'featured', !project.featured), 'Updated.')}
                  >
                    {project.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmThen(`Delete "${project.title}"?`, () => deleteProject(project.id))}
                  >
                    <Trash2 size={12} aria-hidden="true" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Blog */}
        {activeTab === 'blog' && (
          <section id="admin-panel-blog" role="tabpanel" aria-labelledby="admin-tab-blog">
            <div className="section-head">
              <h2 style={{ fontSize: '1.1rem' }}>Blog posts</h2>
              <button type="button" className="btn btn-accent btn-sm" onClick={() => setEditingPost({ ...EMPTY_POST })}>
                <Plus size={14} aria-hidden="true" />
                <span>New post</span>
              </button>
            </div>

            {editingPost && (
              <form
                className="card"
                style={{ marginBottom: '2rem' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => saveBlogPost(editingPost), 'Post saved.').then(() => setEditingPost(null));
                }}
              >
                <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>{editingPost.id ? 'Edit post' : 'New post'}</h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-title">
                      Title
                    </label>
                    <input
                      id="post-title"
                      className="form-input"
                      required
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-slug">
                      Slug
                    </label>
                    <input
                      id="post-slug"
                      className="form-input"
                      required
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="post-excerpt">
                    Excerpt
                  </label>
                  <textarea
                    id="post-excerpt"
                    className="form-textarea"
                    rows={2}
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="post-content">
                    Content (### headings, * bullets, blank-line paragraphs)
                  </label>
                  <textarea
                    id="post-content"
                    className="form-textarea"
                    rows={10}
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-category">
                      Category
                    </label>
                    <input
                      id="post-category"
                      className="form-input"
                      value={editingPost.category || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-tags">
                      Tags (comma separated)
                    </label>
                    <input
                      id="post-tags"
                      className="form-input"
                      value={(editingPost.tags || []).join(', ')}
                      onChange={(e) => setEditingPost({ ...editingPost, tags: toList(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-cover">
                      Cover image URL
                    </label>
                    <input
                      id="post-cover"
                      type="url"
                      className="form-input"
                      value={editingPost.coverImage || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-reading">
                      Reading time
                    </label>
                    <input
                      id="post-reading"
                      className="form-input"
                      value={editingPost.readingTime || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-seo-title">
                      SEO title
                    </label>
                    <input
                      id="post-seo-title"
                      className="form-input"
                      value={editingPost.seoTitle || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-seo-description">
                      SEO description
                    </label>
                    <input
                      id="post-seo-description"
                      className="form-input"
                      value={editingPost.seoDescription || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-toolbar" style={{ marginBottom: '1.25rem', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={Boolean(editingPost.published)}
                      onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                    />
                    <span>Published</span>
                  </label>
                  <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={Boolean(editingPost.featured)}
                      onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    />
                    <span>Featured</span>
                  </label>
                </div>

                <div className="admin-actions">
                  <button type="submit" className="btn btn-accent btn-sm">
                    <Save size={14} aria-hidden="true" />
                    <span>Save post</span>
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPost(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {posts.map((post) => (
              <div key={post.id} className="admin-row">
                <div>
                  <h4>{post.title}</h4>
                  <div className="admin-row-meta">
                    <span>{post.category}</span>
                    <span>{post.published ? 'Published' : 'Draft'}</span>
                    {post.featured && <span>Featured</span>}
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
                <div className="admin-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPost(post)}>
                    <Edit size={12} aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      run(
                        () => setBlogPostFlag(post.id, 'published', !post.published),
                        post.published ? 'Unpublished.' : 'Published.'
                      )
                    }
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => run(() => setBlogPostFlag(post.id, 'featured', !post.featured), 'Updated.')}
                  >
                    {post.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmThen(`Delete "${post.title}"?`, () => deleteBlogPost(post.id))}
                  >
                    <Trash2 size={12} aria-hidden="true" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <section id="admin-panel-messages" role="tabpanel" aria-labelledby="admin-tab-messages">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Contact messages</h2>
            {messages.length === 0 ? (
              <p className="empty-state">No messages received yet.</p>
            ) : (
              messages.map((msg) => (
                <article key={msg.id} className={`admin-row ${msg.read ? '' : 'message-item unread'}`}>
                  <div style={{ maxWidth: '48rem' }}>
                    <h4>{msg.subject || 'No subject'}</h4>
                    <div className="admin-row-meta">
                      <span>{msg.name}</span>
                      <a href={`mailto:${msg.email}`}>{msg.email}</a>
                      <span>{formatDate(msg.createdAt)}</span>
                      <span>{msg.read ? 'Read' : 'Unread'}</span>
                    </div>
                    <p style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem', fontSize: '0.9rem' }}>{msg.message}</p>
                  </div>
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => run(() => setMessageRead(msg.id, !msg.read), 'Updated.')}
                    >
                      Mark {msg.read ? 'unread' : 'read'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmThen('Delete this message?', () => deleteContactMessage(msg.id))}
                    >
                      <Trash2 size={12} aria-hidden="true" />
                      <span>Delete</span>
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {/* Media */}
        {activeTab === 'media' && (
          <section id="admin-panel-media" role="tabpanel" aria-labelledby="admin-tab-media">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Media &amp; artifacts</h2>
            <div className="card" style={{ maxWidth: '38rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Upload a public asset</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Images or PDFs up to 10 MB. Uploads go to <code>public/</code> in Firebase Storage and are
                world-readable; write access is restricted to the admin account by the storage rules.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="media-file">
                  Select file
                </label>
                <input
                  id="media-file"
                  type="file"
                  className="form-input"
                  accept="image/*,application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadedUrl('');
                    if (file.size > 10 * 1024 * 1024) {
                      setUploadStatus('File exceeds the 10 MB limit.');
                      return;
                    }
                    if (!storage) {
                      setUploadStatus('Firebase Storage is not configured in this environment.');
                      return;
                    }
                    setUploadStatus('Uploading…');
                    try {
                      const fileRef = ref(storage, `public/${Date.now()}_${file.name}`);
                      await uploadBytes(fileRef, file);
                      const url = await getDownloadURL(fileRef);
                      setUploadedUrl(url);
                      setUploadStatus('Upload complete.');
                    } catch (err) {
                      setUploadStatus(`Upload failed: ${err.message}`);
                    }
                  }}
                />
              </div>

              {uploadStatus && (
                <p style={{ fontSize: '0.85rem' }} role="status">
                  <Upload size={14} aria-hidden="true" /> {uploadStatus}
                </p>
              )}
              {uploadedUrl && (
                <p style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                    {uploadedUrl}
                  </a>
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
