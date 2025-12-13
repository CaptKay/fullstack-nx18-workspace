import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from './projects.service';
import { Project } from '@fullstack-nx18-workspace/domain-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fullstack Nx18 Angular – Projects';
  loading = true;
  error: string | null = null;
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load projects (Angular):', err);
        this.error = 'Could not load projects. Please try again.';
        this.loading = false;
      },
    });
  }
}
