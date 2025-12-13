import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from './App';

jest.mock('@fullstack-nx18-workspace/api-client', () => ({
  fetchProjects: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Test Project',
      description: 'Test description',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
  ]),
}));

describe('Mobile App', () => {
  it('renders title', async () => {
    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(
        getByText(/Fullstack Nx18 Workspace – Mobile Projects/i),
      ).toBeTruthy();
    });
  });
});
