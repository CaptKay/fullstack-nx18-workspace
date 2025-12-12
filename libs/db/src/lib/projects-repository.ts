import { prisma } from "./prisma";

import type {Project as DomainProject, ProjectStatus} from '@fullstack-nx18-workspace/domain-model';

export async function getAllProjects(): Promise<DomainProject[]> {
    const projects = await prisma.project.findMany({
        orderBy: {createdAt: 'desc'},
    })

    return projects.map((project)=>({
        id: project.id,
        name: project.name,
        status: project.status as ProjectStatus,
        createdAt: project.createdAt.toISOString(),
        description: project.name,
    }))






}