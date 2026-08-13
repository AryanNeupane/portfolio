import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, FileText, Github, ExternalLink, Calendar, Layers } from 'lucide-react';
import { getProjectBySlug } from '../services/dataService';
import GrcArtifactViewer from '../components/GrcArtifactViewer';

export default function ProjectDetailPage({ slug, onNavigate }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error("Failed to load project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2>Project Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The requested project slug could not be located.</p>
        <button className="btn btn-outline" onClick={() => onNavigate('/portfolio')}>
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-page section">
      <div className="container">
        {/* Back Button */}
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onNavigate('/portfolio')}
          style={{ marginBottom: '2rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>

        {/* Header */}
        <div style={{ maxWidth: '900px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {project.isCapstone && <span className="badge badge-blue">Simulated Enterprise Capstone</span>}
            <span className="badge badge-indigo">{project.category}</span>
          </div>

          <h1 style={{ marginBottom: '1.25rem' }}>{project.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {project.summary}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} />
              <span>Created: {project.createdAt}</span>
            </div>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)' }}>
                <Github size={14} />
                <span>GitHub Repository</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* VertexOne Disclaimers / Context if Capstone */}
        {project.isCapstone && (
          <div className="card" style={{ marginBottom: '2.5rem', borderLeft: '4px solid var(--accent-blue)', background: 'var(--bg-secondary)' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.4rem' }}>Capstone Project Taxonomy & Evidence Statement</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
              VertexOne Digital Services is a simulated enterprise capstone project designed to showcase practical capability in constructing ISO/IEC 27001:2022 and NIST CSF 2.0 ISMS documentation, risk registers, control ownership matrices, and executive governance dashboards. 
              <em> (Not real-world employment or customer engagement).</em>
            </p>
          </div>
        )}

        {/* Structured Grid Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {project.businessContext && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Business Context & Objective</h3>
              <p style={{ fontSize: '0.925rem', marginBottom: '0.75rem' }}>{project.businessContext}</p>
              <p style={{ fontSize: '0.925rem', color: 'var(--accent-blue)' }}><strong>Objective:</strong> {project.objective}</p>
            </div>
          )}

          {project.scope && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Assessment Scope & Methodology</h3>
              <p style={{ fontSize: '0.925rem', marginBottom: '0.75rem' }}><strong>Scope:</strong> {project.scope}</p>
              <p style={{ fontSize: '0.925rem' }}><strong>Methodology:</strong> {project.methodology}</p>
            </div>
          )}
        </div>

        {/* Interactive GRC Artifact Viewer (For VertexOne or projects with artifactData) */}
        {project.artifactData && (
          <GrcArtifactViewer artifactData={project.artifactData} />
        )}

        {/* Controls, Risks, Findings & Deliverables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {project.controls?.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Controls Evaluated</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {project.controls.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)' }} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.deliverables?.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Documented Deliverables</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {project.deliverables.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <FileText size={14} style={{ color: 'var(--accent-blue)' }} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
