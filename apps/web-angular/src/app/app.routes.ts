// apps/web-angular/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page/projects-page.component';

export const routes: Routes = [
  { path: '', component: ProjectsPageComponent },
];
