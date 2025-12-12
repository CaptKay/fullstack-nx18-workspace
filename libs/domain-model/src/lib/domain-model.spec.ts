import { sampleProjects } from "./domain-model";

describe('domain-model sampleProjects', ()=>{
  it('should have at least one project', ()=>{
    expect(sampleProjects.length).toBeGreaterThan(0)
  });

  it('should have valid project structure', ()=>{
    const first = sampleProjects[0];

    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('description');
    expect(first).toHaveProperty('status');
    expect(first).toHaveProperty('createdAt');
    
  })


})