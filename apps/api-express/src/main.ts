import express from 'express';
import cors from 'cors';
import { requestLogger, formatDateTime } from '@fullstack-nx18-workspace/utils';

import {
  Project,
  sampleProjects,
} from '@fullstack-nx18-workspace/domain-model';
import { getAllProjects } from '@fullstack-nx18-workspace/db';

const host = process.env.HOST ?? '0.0.0.0'; //change back to localhost
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.use(express.json());
app.use(requestLogger);



app.get('/health', (req, res) => {
  const now = new Date();

  res.json({
    status: 'ok',
    timestamp: now.toISOString(),
    friendlyTime: formatDateTime(now),
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

app.get('/', (_req, res) => {
  res.send({ message: 'Hello API' });
});

const server = app.listen(port, host, () => {
  console.log(`[ ready ] api-express listening at http://${host}:${port}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});