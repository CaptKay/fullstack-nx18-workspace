import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@fullstack-nx18-workspace/domain-model';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://localhost:3001/api';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${API_BASE_URL}/projects`);
  }
}
