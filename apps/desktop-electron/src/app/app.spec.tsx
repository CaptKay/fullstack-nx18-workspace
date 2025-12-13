import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

it('should have a greeting as the title', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Match the actual title in App.tsx
  expect(
    getByText(/Fullstack Nx18 Desktop – Projects/i)
  ).toBeTruthy();
});
});
