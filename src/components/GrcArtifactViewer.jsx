import React, { useState, useMemo } from 'react';
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Eye,
  Download,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

const CATEGORY_LABELS = {
  GOVERNANCE: 'Governance',
  RISK: 'Risk',
  CONTROLS: 'Controls',
  ASSESSMENT: 'Assessment',
  CONTINUAL_IMPROVEMENT: 'Continual Improvement',
};

export default function GrcArtifactViewer({ artifactData, githubUrl }) {
  const [activeCategory, setActiveCategory] = useState('GOVERNANCE');
  const [selectedArtifactId, setSelectedArtifactId] = useState(null);

  const catalog = artifactData?.artifactCatalog || [];

  const categories = useMemo(() => {
    const keys = [...new Set(catalog.map((a) => a.category))];
    return keys.map((key) => ({ key, label: CATEGORY_LABELS[key] || key }));
  }, [catalog]);

  const filteredArtifacts = catalog.filter((a) => a.category === activeCategory);
  const selected = catalog.find((a) => a.id === selectedArtifactId) || filteredArtifacts[0];

  if (!artifactData) return null;

  const getRiskBadge = (rating) => {
    switch (rating?.toLowerCase()) {
      case 'high':
      case 'critical':
        return (
          <span className="badge badge-amber">
            <ShieldAlert size={12} /> {rating}
          </span>
        );
      case 'medium':
        return (
          <span className="badge badge-blue">
            <AlertTriangle size={12} /> {rating}
          </span>
        );
      default:
        return (
          <span className="badge badge-emerald">
            <CheckCircle size={12} /> {rating}
          </span>
        );
    }
  };

  const renderArtifactContent = () => {
    if (!selected) return null;

    if (selected.id === 'ismsScope' && artifactData.ismsScope) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem' }}>
            <strong>Scope Boundary:</strong> {artifactData.ismsScope.boundary}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <strong>Exclusions:</strong> {artifactData.ismsScope.exclusions}
          </p>
          <div>
            <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Strategic Objectives</h5>
            <ul style={{ listStyle: 'square', paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {artifactData.ismsScope.keyObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (selected.id === 'riskRegister' && artifactData.riskRegister) {
      return (
        <div className="grc-table-container">
          <table className="grc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset</th>
                <th>Threat</th>
                <th>Score</th>
                <th>Rating</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {artifactData.riskRegister.map((item) => (
                <tr key={item.riskId}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{item.riskId}</td>
                  <td>{item.asset}</td>
                  <td style={{ fontSize: '0.825rem' }}>{item.threat}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{item.riskScore}</td>
                  <td>{getRiskBadge(item.riskRating)}</td>
                  <td style={{ fontSize: '0.825rem' }}>{item.riskOwner}</td>
                  <td>
                    <span className="badge">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selected.id === 'soa' && artifactData.statementOfApplicability) {
      return (
        <div className="grc-table-container">
          <table className="grc-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Control</th>
                <th>Status</th>
                <th>Justification</th>
              </tr>
            </thead>
            <tbody>
              {artifactData.statementOfApplicability.map((item) => (
                <tr key={item.controlId}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{item.controlId}</td>
                  <td>{item.controlName}</td>
                  <td>
                    {item.status === 'Included' ? (
                      <span className="badge badge-emerald">Included</span>
                    ) : (
                      <span className="badge">Excluded</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{item.justification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selected.id === 'controlOwnership' && artifactData.controlOwnership) {
      return (
        <div className="grc-table-container">
          <table className="grc-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Owner Role</th>
                <th>Review Cadence</th>
              </tr>
            </thead>
            <tbody>
              {artifactData.controlOwnership.map((item, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{item.controlDomain}</td>
                  <td style={{ color: 'var(--accent-primary)' }}>{item.ownerRole}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{item.reviewFrequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if ((selected.id === 'nistDashboard' || selected.id === 'nistAssessment') && artifactData.nistCsfDashboard) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {artifactData.nistCsfDashboard.map((fn, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
                  {fn.function}
                </span>
                <span className="badge">{fn.maturity} / 4.0</span>
              </div>
              <p style={{ fontSize: '0.825rem', marginBottom: '0.5rem' }}>{fn.category}</p>
              <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(fn.maturity / 4) * 100}%`,
                    background: 'var(--accent-primary)',
                    borderRadius: '2px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (selected.id === 'continualImprovement') {
      return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '0.15rem' }} />
            <span>
              <strong>CAPA-2026-01:</strong> Enforce mandatory SSO/MFA on contractor accounts — Verified
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <RefreshCw size={14} style={{ color: 'var(--accent-primary)', marginTop: '0.15rem' }} />
            <span>
              <strong>CAPA-2026-02:</strong> Automate Splunk SPL alert triggers for brute force thresholds — In Testing
            </span>
          </li>
        </ul>
      );
    }

    return (
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Full artifact content is maintained in the project repository. Use the GitHub link below to access complete documentation.
      </p>
    );
  };

  return (
    <div className="card" style={{ padding: '2rem', marginTop: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <Shield size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.3rem' }}>GRC Artifact Explorer</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Simulated enterprise capstone documentation organized by governance lifecycle.
          </p>
        </div>
        <span className="badge badge-amber">Simulated Capstone</span>
      </div>

      <div className="tab-list">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.key);
              setSelectedArtifactId(null);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredArtifacts.map((artifact) => (
            <button
              key={artifact.id}
              onClick={() => setSelectedArtifactId(artifact.id)}
              style={{
                textAlign: 'left',
                background: selected?.id === artifact.id ? 'var(--bg-tertiary)' : 'transparent',
                border: `1px solid ${selected?.id === artifact.id ? 'var(--border-hover)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.925rem', marginBottom: '0.25rem' }}>{artifact.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {artifact.framework}
                  </div>
                </div>
                {artifact.viewable ? (
                  <Eye size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                ) : (
                  <FileText size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: 0 }}>
                {artifact.description}
              </p>
            </button>
          ))}
        </div>

        {selected && (
          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{selected.title}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <span className="badge">{selected.type}</span>
                <span className="badge badge-blue">{selected.framework}</span>
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong>Purpose:</strong> {selected.purpose}
              </p>
            </div>

            {selected.viewable ? (
              renderArtifactContent()
            ) : (
              <div
                style={{
                  padding: '1.25rem',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <FileText size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Full artifact available in the project repository.
                </p>
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                    <ExternalLink size={14} />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {githubUrl && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <Download size={14} />
            <span>Access Full Artifact Repository</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  );
}
