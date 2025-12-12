import express from 'express';
import {Project, sampleProjects} from '@fullstack-nx18-workspace/domain-model';
import cors from 'cors';



const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();


app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
);


app.get('/health' , (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    
  });
});


app.get('/projects', (_req, res)=>{
  const projects: Project[] = sampleProjects;
  res.json(projects);
} )


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] api-express listening at http://${host}:${port}`);
});
