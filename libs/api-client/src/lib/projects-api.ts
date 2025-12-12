import type { Project } from '@fullstack-nx18-workspace/domain-model';
import { get } from './http-client';

export async function fetchProjects(): Promise<Project[]>{
    return get<Project[]>('/projects');
}
