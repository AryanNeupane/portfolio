import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '../services/dataService';

export default function PortfolioPage({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;
    async function loadProjects() {
      try {
        const data = await getProjects();
        if (!cancelled) setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);

  const visibleProjects = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)),
    [projects, activeCategory]
  );

  return (
    <div className="portfolio-page section">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Portfolio</p>
          <h1>Documented security &amp; GRC work</h1>
          <p className="page-lead">
            Each project links to the repository that holds its artefacts. Simulated work is labelled as simulated.
          </p>
        </header>

        {categories.length > 2 && (
          <div className="filter-row" role="group" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="filter-chip"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="empty-state">Loading projects…</p>
        ) : visibleProjects.length === 0 ? (
          <p className="empty-state">No projects in this category yet.</p>
        ) : (
          <div className="work-list">
            {visibleProjects.map((project) => (
              <a
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="work-item"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/portfolio/${project.slug}`);
                }}
              >
                <div className="work-item-meta">
                  <span>{project.category}</span>
                  <span>{project.createdAt}</span>
                  {project.isCapstone && <span className="badge badge-amber">Simulated capstone</span>}
                </div>
                <h2 className="work-item-title">{project.title}</h2>
                <p className="work-item-summary">{project.summary}</p>
                <div className="tag-row">
                  {project.frameworks?.map((framework) => (
                    <span key={framework} className="badge">
                      {framework}
                    </span>
                  ))}
                  {project.deliverables?.length > 0 && (
                    <span className="badge badge-emerald">{project.deliverables.length} deliverables</span>
                  )}
                </div>
                <span
                  className="link-inline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem', fontSize: '0.875rem' }}
                >
                  Read case study
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
