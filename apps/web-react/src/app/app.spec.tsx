import { render, screen, waitFor } from '@testing-library/react';
import App from './app';

// Mock the shared API client so tests don't hit the real backend
jest.mock('@fullstack-nx18-workspace/api-client', () => ({
  fetchProjects: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Test Project',
      status: 'ACTIVE',
      description: 'Test project from mock',
      createdAt: new Date('2025-01-01T12:00:00Z').toISOString(),
    },
  ]),
}));

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();

    // Wait until the mocked project appears
    await waitFor(() => {
      expect(screen.getByText(/Test Project/i)).toBeTruthy();
    });
  });

  it('should have the correct heading title', () => {
    render(<App />);

    // Match the new title text (don’t hardcode the dash)
    expect(screen.getByText(/Fullstack Nx18 Workspace/i)).toBeTruthy();
  });
});
