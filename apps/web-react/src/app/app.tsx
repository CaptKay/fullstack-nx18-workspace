import { useEffect, useState } from 'react';
import type { Project } from '@fullstack-nx18-workspace/domain-model';

export function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Nx 18 Fullstack Workspace</h1>

      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> – {project.status} | {project.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
