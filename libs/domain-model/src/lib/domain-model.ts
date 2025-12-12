export type ProjectStatus = 'ACTIVE' | 'ARCHIVED';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export const sampleProjects: Project[] = [
  {
    id: 'p1',
    name: 'Nx Fullstack Lab',
    description: 'A fullstack project using Nx',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'Legacy Cleanup',
    description: 'A fullstack project using Nx',
    status: 'ARCHIVED',
    createdAt: new Date().toISOString(),
  },
];
