import React, { useState, useEffect } from 'react';
import { 
  Shield, Plus, Edit, Trash2, FileText, Mail, LogOut, CheckCircle, 
  Layers, Save, RefreshCw, Image, HardDrive, Settings, Award, User, X
} from 'lucide-react';
import { 
  getProjects, getBlogPosts, getContactMessages, getCertifications, getSettings,
  saveProject, saveBlogPost, saveCertification, saveSettings
} from '../../services/dataService';
import { storage, auth } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [editingSettings, setEditingSettings] = useState({});
  const [uploadStatus, setUploadStatus] = useState('');

  const currentUser = auth?.currentUser;

  const refreshData = async () => {
    setLoading(true);
    try {
      const [projData, blogData, msgData, certData, settingsData] = await Promise.all([
        getProjects(true),
        getBlogPosts(true),
        getContactMessages(),
        getCertifications(),
        getSettings()
      ]);
      setProjects(projData);
      setPosts(blogData);
      setMessages(msgData);
      setCertifications(certData);
      setSettings(settingsData || {});
      setEditingSettings(settingsData || {});
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

  const handleSaveCertForm = async (e) => {
    e.preventDefault();
    await saveCertification(editingCert);
    setEditingCert(null);
    refreshData();
  };

  const handleSaveSettingsForm = async (e) => {
    e.preventDefault();
    await saveSettings(editingSettings);
    refreshData();
    alert('Settings saved successfully.');
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
  const publishedPostsCount = posts.filter(b => b.published).length;

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      className={`admin-nav-item ${activeTab === id ? 'active' : ''}`}
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Shield size={24} style={{ color: 'var(--accent-primary)' }} />
          <h2>GRC Portfolio CMS</h2>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="admin-sidebar-nav">
          <div className="nav-group-label">Content</div>
          <NavItem id="overview" icon={HardDrive} label="Dashboard" />
          <NavItem id="projects" icon={Layers} label="Portfolio" />
          <NavItem id="blog" icon={FileText} label="Blog Articles" />
          <NavItem id="certifications" icon={Award} label="Certifications" />
          
          <div className="nav-group-label" style={{ marginTop: '1.5rem' }}>Operations</div>
          <NavItem id="messages" icon={Mail} label="Messages" />
          <NavItem id="media" icon={Image} label="Media / Storage" />
          
          <div className="nav-group-label" style={{ marginTop: '1.5rem' }}>System</div>
          <NavItem id="settings" icon={Settings} label="Site Settings" />
          <NavItem id="security" icon={Shield} label="Security" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <div style={{ width: '20px', height: '2px', background: 'var(--text-primary)', marginBottom: '4px' }} />
              <div style={{ width: '20px', height: '2px', background: 'var(--text-primary)', marginBottom: '4px' }} />
              <div style={{ width: '20px', height: '2px', background: 'var(--text-primary)' }} />
            </button>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="admin-user-profile">
              <div className="admin-user-info">
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Aryan Neupane</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cybersecurity & GRC</div>
              </div>
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
              ) : (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} />
                </div>
              )}
            </div>
            <button className="btn btn-outline btn-sm" onClick={onLogout} title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="admin-content-scroll">
          
          {/* Dashboard Overview */}
          {activeTab === 'overview' && (
            <div className="admin-fade-in">
              <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
                <div className="stat-card">
                  <div className="stat-label">Projects</div>
                  <div className="stat-value">{projects.length}</div>
                  <div className="stat-desc">{publishedProjectsCount} published</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Articles</div>
                  <div className="stat-value">{posts.length}</div>
                  <div className="stat-desc">{publishedPostsCount} published</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Certifications</div>
                  <div className="stat-value">{certifications.length}</div>
                  <div className="stat-desc">Verified credentials</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Messages</div>
                  <div className="stat-value">{messages.length}</div>
                  <div className="stat-desc">Contact form submissions</div>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={18} style={{ color: 'var(--accent-emerald)' }} />
                    System Status
                  </h3>
                  <ul className="status-list">
                    <li><CheckCircle size={14} className="text-emerald" /> Firestore Connection Active</li>
                    <li><CheckCircle size={14} className="text-emerald" /> Authentication Enforced</li>
                    <li><CheckCircle size={14} className="text-primary" /> Storage Rules Verified</li>
                  </ul>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => { setActiveTab('projects'); setEditingProject({}); }}>+ Add Project</button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setActiveTab('blog'); setEditingPost({}); }}>+ Write Article</button>
                    <button className="btn btn-outline btn-sm" onClick={refreshData}><RefreshCw size={14} /> Sync Data</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Portfolio Management</h3>
                <button className="btn btn-accent btn-sm" onClick={() => setEditingProject({ title: '', slug: '', summary: '', category: 'GRC', published: true, featured: false, frameworks: [], technologies: [] })}>
                  <Plus size={14} /> New Project
                </button>
              </div>

              {editingProject && (
                <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>{editingProject.id ? 'Edit Project' : 'Create Project'}</h4>
                  <form onSubmit={handleSaveProjectForm}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Project Title</label>
                        <input type="text" className="form-input" required value={editingProject.title || ''} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">URL Slug</label>
                        <input type="text" className="form-input" required value={editingProject.slug || ''} onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Summary / Short Description</label>
                      <textarea className="form-textarea" rows={3} value={editingProject.summary || ''} onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })} />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-input" value={editingProject.category || ''} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GitHub URL</label>
                        <input type="url" className="form-input" value={editingProject.githubUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={Boolean(editingProject.published)} onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })} />
                        <span>Published</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={Boolean(editingProject.featured)} onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })} />
                        <span>Featured</span>
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-accent btn-sm"><Save size={14} /> Save Project</button>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingProject(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grc-table-container card" style={{ padding: 0, overflow: 'hidden' }}>
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
                        <td style={{ fontWeight: '600' }}>{p.title}</td>
                        <td><span className="badge">{p.category}</span></td>
                        <td>{p.published ? <span className="badge badge-emerald">Published</span> : <span className="badge badge-amber">Draft</span>}</td>
                        <td>
                          <button className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem' }} onClick={() => setEditingProject(p)}><Edit size={12} /></button>
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
            <div className="admin-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Blog Articles</h3>
                <button className="btn btn-accent btn-sm" onClick={() => setEditingPost({ title: '', slug: '', excerpt: '', content: '', category: 'GRC', published: false, readingTime: '5 min read' })}>
                  <Plus size={14} /> New Post
                </button>
              </div>

              {editingPost && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <form onSubmit={handleSavePostForm}>
                    <div className="grid-2">
                      <div className="form-group"><label className="form-label">Article Title</label><input type="text" className="form-input" required value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} /></div>
                      <div className="form-group"><label className="form-label">Slug</label><input type="text" className="form-input" required value={editingPost.slug} onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })} /></div>
                    </div>
                    <div className="form-group"><label className="form-label">Content (Markdown)</label><textarea className="form-textarea" rows={10} value={editingPost.content || ''} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} /></div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem' }}><input type="checkbox" checked={Boolean(editingPost.published)} onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })} /><span>Published</span></label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-accent btn-sm"><Save size={14} /> Save Article</button>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPost(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Blog Table */}
              <div className="grc-table-container card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="grc-table">
                  <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td style={{ fontWeight: '600' }}>{post.title}</td>
                        <td><span className="badge badge-indigo">{post.category}</span></td>
                        <td>{post.published ? <span className="badge badge-emerald">Published</span> : <span className="badge">Draft</span>}</td>
                        <td><button className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem' }} onClick={() => setEditingPost(post)}><Edit size={12} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="admin-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Certifications</h3>
                <button className="btn btn-accent btn-sm" onClick={() => setEditingCert({ title: '', issuer: '', issued: '', expires: '', credentialId: '', verificationUrl: '', featured: false, skills: [] })}>
                  <Plus size={14} /> Add Certification
                </button>
              </div>

              {editingCert && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <form onSubmit={handleSaveCertForm}>
                    <div className="grid-2">
                      <div className="form-group"><label className="form-label">Title</label><input type="text" className="form-input" required value={editingCert.title} onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })} /></div>
                      <div className="form-group"><label className="form-label">Provider/Issuer</label><input type="text" className="form-input" required value={editingCert.issuer} onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })} /></div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group"><label className="form-label">Issued Date</label><input type="text" className="form-input" value={editingCert.issued || ''} onChange={(e) => setEditingCert({ ...editingCert, issued: e.target.value })} /></div>
                      <div className="form-group"><label className="form-label">Credential ID</label><input type="text" className="form-input" value={editingCert.credentialId || ''} onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-accent btn-sm"><Save size={14} /> Save</button>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingCert(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Certs Table */}
              <div className="grc-table-container card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="grc-table">
                  <thead><tr><th>Title</th><th>Provider</th><th>Issued</th><th>Actions</th></tr></thead>
                  <tbody>
                    {certifications.map((cert) => (
                      <tr key={cert.id}>
                        <td style={{ fontWeight: '600' }}>{cert.title}</td>
                        <td>{cert.issuer}</td>
                        <td>{cert.issued}</td>
                        <td><button className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem' }} onClick={() => setEditingCert(cert)}><Edit size={12} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="admin-fade-in">
              <h3 style={{ marginBottom: '1.5rem', margin: 0 }}>Contact Form Submissions</h3>
              {messages.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}><p className="text-muted">No messages received yet.</p></div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', margin: 0 }}>{msg.subject || 'General Inquiry'}</h4>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>From: <strong>{msg.name}</strong> (&lt;{msg.email}&gt;)</div>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{msg.createdAt}</span>
                      </div>
                      <p style={{ fontSize: '0.925rem', whiteSpace: 'pre-wrap', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: 0 }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="admin-fade-in">
              <h3 style={{ marginBottom: '1.5rem', margin: 0 }}>Media & Storage</h3>
              <div className="card" style={{ maxWidth: '600px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Upload Asset</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Upload files directly to Firebase Storage (Max 10MB).</p>
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="form-input" style={{ marginBottom: '1rem' }} />
                {uploadStatus && <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>{uploadStatus}</div>}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="admin-fade-in">
              <h3 style={{ marginBottom: '1.5rem', margin: 0 }}>Site Settings</h3>
              <div className="card" style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSaveSettingsForm}>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" value={editingSettings.name || ''} onChange={(e) => setEditingSettings({...editingSettings, name: e.target.value})} /></div>
                    <div className="form-group"><label className="form-label">Professional Title</label><input type="text" className="form-input" value={editingSettings.title || ''} onChange={(e) => setEditingSettings({...editingSettings, title: e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" rows={3} value={editingSettings.bio || ''} onChange={(e) => setEditingSettings({...editingSettings, bio: e.target.value})} /></div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-accent btn-sm"><Save size={14} /> Save Settings</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="admin-fade-in">
              <h3 style={{ marginBottom: '1.5rem', margin: 0 }}>Security Configuration</h3>
              <div className="grid-2">
                <div className="card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}><Shield size={18} /> Authentication</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div><span className="text-muted">Provider:</span> GoogleAuthProvider</div>
                    <div><span className="text-muted">Authorized Admin:</span> official.aryanneupane@gmail.com</div>
                    <div><span className="text-muted">Session ID:</span> {currentUser?.uid.substring(0,8)}***</div>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}><HardDrive size={18} /> Database Rules</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div><span className="text-muted">Firestore:</span> Enforced (Read-Only Public, Write Admin)</div>
                    <div><span className="text-muted">Storage:</span> Enforced (10MB Limit, Mime-type locked)</div>
                    <div><span className="text-muted">Project ID:</span> portfolio-92c05</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
