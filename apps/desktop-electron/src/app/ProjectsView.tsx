import { useEffect, useState } from 'react';
import type { Project } from '@fullstack-nx18-workspace/domain-model';
import { fetchProjects } from '@fullstack-nx18-workspace/api-client';
import { formatDateTime } from '@fullstack-nx18-workspace/utils';

export function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchProjects();
        if (!cancelled) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load projects (desktop):', err);
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

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {projects.map((project) => (
        <li
          key={project.id}
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        >
          <strong>{project.name}</strong>
          <div>Status: {project.status}</div>
          <div>Created: {formatDateTime(project.createdAt)}</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {project.description}
          </div>
        </li>
      ))}
    </ul>
  );
}
