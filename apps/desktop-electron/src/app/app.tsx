import './app.module.css';
import { ProjectsView } from './ProjectsView';

export function App() {
  return (
    <main
      style={{
        padding: '1.5rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1>Fullstack Nx18 Desktop – Projects</h1>
      <p>This is the Electron desktop client talking to the same API.</p>
      <ProjectsView />
    </main>
  );
}

export default App;
