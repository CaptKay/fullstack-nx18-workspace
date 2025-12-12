import express from 'express';
import cors from 'cors';

import {
  Project,
  sampleProjects,
} from '@fullstack-nx18-workspace/domain-model';
import { getAllProjects } from '@fullstack-nx18-workspace/db';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.get('/projects', async (_req, res) => {
  try {
    const projects: Project[] = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects from DB:', error);
    res.status(500).json({ message: 'Failed to load projects from database' });
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const server = app.listen(port, host, () => {
  console.log(`[ ready ] api-express listening at http://${host}:${port}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});