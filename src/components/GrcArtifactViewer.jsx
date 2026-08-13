import React, { useState, useMemo } from 'react';
import { Shield, FileText, Eye, ExternalLink } from 'lucide-react';

const CATEGORY_LABELS = {
  GOVERNANCE: 'Governance',
  RISK: 'Risk',
  CONTROLS: 'Controls',
  ASSESSMENT: 'Assessment',
  CONTINUAL_IMPROVEMENT: 'Continual Improvement',
};

const CATEGORY_ORDER = ['GOVERNANCE', 'RISK', 'CONTROLS', 'ASSESSMENT', 'CONTINUAL_IMPROVEMENT'];

function severityBadgeClass(value = '') {
  const v = value.toLowerCase();
  if (v.includes('critical') || v.includes('high')) return 'badge badge-rose';
  if (v.includes('medium') || v.includes('partial') || v.includes('progress')) return 'badge badge-amber';
  if (v.includes('low') || v.includes('effective') || v.includes('established') || v.includes('implemented')) {
    return 'badge badge-emerald';
  }
  return 'badge';
}

function DataTable({ columns, rows, renderCell }) {
  return (
    <div className="grc-table-container">
      <table className="grc-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || row.riskId || row.controlId || i}>
              {columns.map((c) => (
                <td key={c.key}>{renderCell ? renderCell(c.key, row[c.key], row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GrcArtifactViewer({ artifactData, githubUrl }) {
  const catalog = useMemo(() => artifactData?.artifactCatalog || [], [artifactData]);

  const categories = useMemo(() => {
    const present = [...new Set(catalog.map((a) => a.category))];
    return CATEGORY_ORDER.filter((k) => present.includes(k)).map((key) => ({
      key,
      label: CATEGORY_LABELS[key] || key,
      count: catalog.filter((a) => a.category === key).length,
    }));
  }, [catalog]);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.key || 'GOVERNANCE');
  const [selectedArtifactId, setSelectedArtifactId] = useState(null);

  if (!artifactData || catalog.length === 0) return null;

  const filteredArtifacts = catalog.filter((a) => a.category === activeCategory);
  const selected = filteredArtifacts.find((a) => a.id === selectedArtifactId) || filteredArtifacts[0];
  const repoUrl = githubUrl || artifactData.sourceRepo;

  const renderArtifactContent = () => {
    if (!selected) return null;

    switch (selected.id) {
      case 'ismsScope': {
        const scope = artifactData.ismsScope;
        if (!scope) break;
        return (
          <div className="artifact-body">
            <p className="artifact-lead">{scope.boundary}</p>

            <dl className="definition-grid">
              {scope.boundaries?.map((b) => (
                <div key={b.label}>
                  <dt>{b.label}</dt>
                  <dd>{b.value}</dd>
                </div>
              ))}
            </dl>

            <div className="artifact-split">
              <div>
                <h5>In scope</h5>
                <ul className="tick-list">
                  {scope.inScope?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5>Excluded</h5>
                <ul className="tick-list tick-list-muted">
                  {scope.exclusions?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }

      case 'riskRegister': {
        const rows = artifactData.riskRegister;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'riskId', label: 'ID' },
              { key: 'asset', label: 'Asset' },
              { key: 'threat', label: 'Threat' },
              { key: 'inherent', label: 'Inherent' },
              { key: 'effectiveness', label: 'Control effectiveness' },
              { key: 'residual', label: 'Residual' },
              { key: 'owner', label: 'Owner' },
            ]}
            renderCell={(key, value) => {
              if (key === 'riskId') return <span className="mono accent">{value}</span>;
              if (key === 'inherent' || key === 'residual') {
                return <span className={severityBadgeClass(value)}>{value}</span>;
              }
              return value;
            }}
          />
        );
      }

      case 'riskTreatment': {
        const rows = artifactData.riskTreatment;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'priority', label: 'Priority' },
              { key: 'item', label: 'Gap / risk' },
              { key: 'treatment', label: 'Treatment decision' },
              { key: 'owner', label: 'Owner' },
              { key: 'target', label: 'Target' },
            ]}
            renderCell={(key, value) =>
              key === 'priority' ? <span className={severityBadgeClass(value)}>{value}</span> : value
            }
          />
        );
      }

      case 'soa': {
        const rows = artifactData.statementOfApplicability;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'controlId', label: 'Ref' },
              { key: 'controlName', label: 'Control' },
              { key: 'selected', label: 'Selected' },
              { key: 'risks', label: 'Treats risk' },
              { key: 'justification', label: 'Justification' },
              { key: 'status', label: 'Status' },
            ]}
            renderCell={(key, value) => {
              if (key === 'controlId') return <span className="mono accent">{value}</span>;
              if (key === 'selected') {
                return value ? (
                  <span className="badge badge-emerald">Selected</span>
                ) : (
                  <span className="badge">Excluded</span>
                );
              }
              if (key === 'risks') return <span className="mono">{value}</span>;
              if (key === 'status') return <span className={severityBadgeClass(value)}>{value}</span>;
              return value;
            }}
          />
        );
      }

      case 'controlOwnership': {
        const rows = artifactData.controlOwnership;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'control', label: 'Control' },
              { key: 'owner', label: 'Owner (accountable)' },
              { key: 'operator', label: 'Operator' },
              { key: 'reviewer', label: 'Reviewer' },
              { key: 'evidenceOwner', label: 'Evidence owner' },
            ]}
          />
        );
      }

      case 'controlEffectiveness': {
        const rows = artifactData.controlEffectiveness;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'control', label: 'Control' },
              { key: 'design', label: 'Design effectiveness' },
              { key: 'operating', label: 'Operating effectiveness' },
              { key: 'classification', label: 'Classification' },
            ]}
            renderCell={(key, value) =>
              key === 'classification' ? <span className={severityBadgeClass(value)}>{value}</span> : value
            }
          />
        );
      }

      case 'nistAssessment':
      case 'nistDashboard': {
        const rows = artifactData.nistCsfProfile;
        if (!rows) break;
        return (
          <div className="artifact-body">
            {artifactData.csfTier && (
              <div className="tier-strip">
                <div>
                  <span className="label">Current tier</span>
                  <strong>{artifactData.csfTier.current}</strong>
                </div>
                <div>
                  <span className="label">Target</span>
                  <strong>{artifactData.csfTier.target}</strong>
                </div>
              </div>
            )}
            <div className="csf-grid">
              {rows.map((fn) => (
                <div key={fn.function} className="csf-card">
                  <div className="csf-card-head">
                    <span className="mono accent">{fn.function}</span>
                    <span className={severityBadgeClass(fn.status)}>{fn.status}</span>
                  </div>
                  <p className="csf-current">{fn.current}</p>
                  <p className="csf-gap">
                    <strong>Gap:</strong> {fn.gap}
                  </p>
                  <p className="csf-target">
                    <strong>Target:</strong> {fn.target}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'continualImprovement': {
        const rows = artifactData.continualImprovement;
        if (!rows) break;
        return (
          <DataTable
            rows={rows}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'idea', label: 'Opportunity' },
              { key: 'source', label: 'Source' },
              { key: 'owner', label: 'Owner' },
              { key: 'priority', label: 'Priority' },
              { key: 'status', label: 'Status' },
            ]}
            renderCell={(key, value) => {
              if (key === 'id') return <span className="mono accent">{value}</span>;
              if (key === 'priority') return <span className={severityBadgeClass(value)}>{value}</span>;
              return value;
            }}
          />
        );
      }

      default:
        break;
    }

    return null;
  };

  const content = renderArtifactContent();

  return (
    <section className="artifact-explorer" aria-label="GRC artifact explorer">
      <div className="artifact-explorer-head">
        <div>
          <div className="artifact-explorer-title">
            <Shield size={18} aria-hidden="true" />
            <h3>GRC Artifact Explorer</h3>
          </div>
          <p>
            Capstone documentation organised by governance lifecycle. Extracts are shown inline; complete documents
            live in the project repository.
          </p>
        </div>
        <span className="badge badge-amber">Simulated capstone</span>
      </div>

      <div className="tab-list" role="tablist" aria-label="Artifact categories">
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            type="button"
            id={`artifact-tab-${cat.key}`}
            aria-selected={activeCategory === cat.key}
            aria-controls="artifact-panel"
            className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.key);
              setSelectedArtifactId(null);
            }}
          >
            {cat.label} <span className="tab-count">{cat.count}</span>
          </button>
        ))}
      </div>

      <div className="artifact-layout" id="artifact-panel" role="tabpanel" aria-labelledby={`artifact-tab-${activeCategory}`}>
        <ul className="artifact-list">
          {filteredArtifacts.map((artifact) => (
            <li key={artifact.id}>
              <button
                type="button"
                className={`artifact-item ${selected?.id === artifact.id ? 'active' : ''}`}
                onClick={() => setSelectedArtifactId(artifact.id)}
                aria-pressed={selected?.id === artifact.id}
              >
                <span className="artifact-item-head">
                  <span className="artifact-item-title">{artifact.title}</span>
                  {artifact.viewable ? (
                    <Eye size={14} aria-hidden="true" />
                  ) : (
                    <FileText size={14} aria-hidden="true" className="muted-icon" />
                  )}
                </span>
                <span className="artifact-item-framework mono">{artifact.framework}</span>
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <div className="artifact-detail">
            <h4>{selected.title}</h4>
            <div className="artifact-detail-tags">
              <span className="badge">{selected.type}</span>
              <span className="badge badge-blue">{selected.framework}</span>
            </div>
            <p className="artifact-purpose">{selected.purpose}</p>

            {content || (
              <div className="artifact-placeholder">
                <FileText size={22} aria-hidden="true" />
                <p>{selected.description}</p>
                {repoUrl && (
                  <a
                    href={`${repoUrl}/tree/main/${(selected.repoPath || '').split('/')[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>Open in repository</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {repoUrl && (
        <div className="artifact-explorer-foot">
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <ExternalLink size={14} aria-hidden="true" />
            <span>Full artifact repository</span>
          </a>
        </div>
      )}
    </section>
  );
}
