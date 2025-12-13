import { Injectable } from '@nestjs/common';
import { Project } from '@fullstack-nx18-workspace/domain-model';
import { getAllProjects } from '@fullstack-nx18-workspace/db';

@Injectable()
export class ProjectsService {
    async findAll(): Promise<Project[]> {
        const projects = await getAllProjects()
        return projects
    }
}
