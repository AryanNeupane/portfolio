import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Filter, Search, Award } from 'lucide-react';
import { getProjects } from '../services/dataService';

export default function PortfolioPage({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', 'GRC', 'SOC', 'Vulnerability'];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="portfolio-page section">
      <div className="container">
        <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1rem' }}>Security Portfolio</div>
          <h1 style={{ marginBottom: '1rem' }}>Projects & GRC Deliverables</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Demonstrating hands-on cybersecurity capabilities, governance framework implementations, and practical risk assessment deliverables.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-accent' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? 'All Projects' : `${cat} Focus`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="card"
              style={{ 
                border: project.isCapstone ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid var(--border-color)',
                background: project.isCapstone ? 'rgba(15, 23, 42, 0.9)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    {project.isCapstone && <span className="badge badge-blue">Simulated Enterprise Capstone</span>}
                    <span className="badge badge-indigo">{project.category}</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{project.title}</h2>
                </div>

                <button 
                  className="btn btn-sm btn-accent"
                  onClick={() => onNavigate(`/portfolio/${project.slug}`)}
                >
                  <span>Inspect Artifacts</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {project.summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Frameworks Aligned</span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500', marginTop: '0.2rem' }}>
                    {project.frameworks ? project.frameworks.join(' • ') : 'N/A'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Key Deliverables</span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500', marginTop: '0.2rem' }}>
                    {project.deliverables ? `${project.deliverables.length} Documented Artifacts` : 'Standard Technical Documentation'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.technologies?.map((tech, tIdx) => (
                    <span key={tIdx} className="badge">{tech}</span>
                  ))}
                </div>

                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  onClick={() => onNavigate(`/portfolio/${project.slug}`)}
                >
                  <span>View Project Details & Artifacts</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
