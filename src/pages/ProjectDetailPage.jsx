import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug } from '../services/dataService';
import GrcArtifactViewer from '../components/GrcArtifactViewer';
import PageMeta from '../components/PageMeta';

const LIFECYCLE = ['Scope', 'Risk', 'Controls', 'Assessment', 'Treatment', 'Evidence', 'Continual improvement'];

export default function ProjectDetailPage({ slug, onNavigate }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadProject() {
      setLoading(true);
      try {
        const data = await getProjectBySlug(slug);
        if (!cancelled) setProject(data);
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProject();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="section container">
        <p className="empty-state">Loading project…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section container">
        <div className="empty-state">
          <h2>Project not found</h2>
          <p>The requested case study could not be located.</p>
          <button type="button" className="btn btn-outline" onClick={() => onNavigate('/portfolio')}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to portfolio</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="project-detail-page section">
      <PageMeta title={project.title} description={project.summary} path={`/portfolio/${project.slug}`} />
      <div className="container">
        <a
          href="/portfolio"
          className="back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/portfolio');
          }}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>All projects</span>
        </a>

        <header className="page-head">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="page-lead">{project.summary}</p>

          <div className="detail-meta">
            {project.createdAt && <span>{project.createdAt}</span>}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} aria-hidden="true" />
                Repository
              </a>
            )}
            {project.documentationUrl && (
              <a href={project.documentationUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} aria-hidden="true" />
                Additional documentation
              </a>
            )}
          </div>
        </header>

        {project.simulationNotice && (
          <div className="notice-panel" role="note">
            <p>
              <strong>Simulated enterprise GRC capstone project.</strong> {project.simulationNotice}
            </p>
          </div>
        )}

        {project.isCapstone && (
          <div className="lifecycle-track" aria-label="ISMS lifecycle covered by this case study">
            {LIFECYCLE.map((step, index) => (
              <React.Fragment key={step}>
                {index > 0 && <span aria-hidden="true">→</span>}
                <span className="step">{step}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="detail-sections">
          {project.objective && (
            <section className="detail-block">
              <h3>Objective</h3>
              <p>{project.objective}</p>
            </section>
          )}
          {project.businessContext && (
            <section className="detail-block">
              <h3>Context</h3>
              <p>{project.businessContext}</p>
            </section>
          )}
          {project.scope && (
            <section className="detail-block">
              <h3>Scope</h3>
              <p>{project.scope}</p>
            </section>
          )}
          {project.methodology && (
            <section className="detail-block">
              <h3>Methodology</h3>
              <p>{project.methodology}</p>
            </section>
          )}
          {project.frameworks?.length > 0 && (
            <section className="detail-block">
              <h3>Frameworks</h3>
              <ul className="tick-list">
                {project.frameworks.map((framework) => (
                  <li key={framework}>{framework}</li>
                ))}
              </ul>
            </section>
          )}
          {project.controls?.length > 0 && (
            <section className="detail-block">
              <h3>Control areas</h3>
              <ul className="tick-list">
                {project.controls.map((control) => (
                  <li key={control}>{control}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {project.artifactData && (
          <GrcArtifactViewer artifactData={project.artifactData} githubUrl={project.githubUrl} />
        )}

        <div className="detail-sections">
          {project.findings?.length > 0 && (
            <section className="detail-block">
              <h3>Findings</h3>
              <ul className="tick-list">
                {project.findings.map((finding) => (
                  <li key={finding}>{finding}</li>
                ))}
              </ul>
            </section>
          )}
          {project.recommendations?.length > 0 && (
            <section className="detail-block">
              <h3>Recommendations</h3>
              <ul className="tick-list">
                {project.recommendations.map((rec) => (
                  <li key={rec}>{rec}</li>
                ))}
              </ul>
            </section>
          )}
          {project.lessonsLearned?.length > 0 && (
            <section className="detail-block">
              <h3>Lessons learned</h3>
              <ul className="tick-list">
                {project.lessonsLearned.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </section>
          )}
          {project.deliverables?.length > 0 && (
            <section className="detail-block">
              <h3>Deliverables</h3>
              <ul className="tick-list tick-list-muted">
                {project.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {project.githubUrl && (
          <div className="cta-band">
            <div>
              <p className="eyebrow">Evidence</p>
              <h2>Read the source documentation</h2>
              <p>Every artefact referenced above lives in the project repository.</p>
            </div>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              <Github size={16} aria-hidden="true" />
              <span>Open repository</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
