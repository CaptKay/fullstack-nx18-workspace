import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@fullstack-nx18-workspace/domain-model';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return await this.projectsService.findAll()
  }
}
