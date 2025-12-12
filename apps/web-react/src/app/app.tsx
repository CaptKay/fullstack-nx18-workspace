
import { useEffect, useState } from 'react';
import type { Project } from '@fullstack-nx18-workspace/domain-model';
import { fetchProjects } from '@fullstack-nx18-workspace/api-client';
import { formatDateTime } from '@fullstack-nx18-workspace/utils';


export function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProjects();
        if (!cancelled) {
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
        if (!cancelled) {
          setError('Could not load projects. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Fullstack Nx18 Workspace – Projects</h1>

      {loading && <p>Loading projects...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p>No projects found. Try running <code>npm run db:seed</code>.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
          {projects.map((project) => (
            <li
              key={project.id}
              style={{
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{project.name}</strong>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  Created: {formatDateTime(project.createdAt)}
                </div>
              </div>
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  border: '1px solid #d1d5db',
                  background:
                    project.status === 'ACTIVE' ? '#dcfce7' : '#e5e7eb',
                }}
              >
                {project.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
