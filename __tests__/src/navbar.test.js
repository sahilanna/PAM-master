import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/screens/NavBar'; 
import "@testing-library/jest-dom";


jest.mock('../../src/assets/logo1.png', () => 'logo1.png');

test('renders navigation links correctly', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  expect(screen.getByText('Project Access Management')).toBeInTheDocument();
  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('Tools')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders the logo with correct attributes', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  const logo = screen.getByAltText('Logo');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src', 'logo1.png');
  expect(logo).toHaveStyle({ width: '50px', height: '50px', marginLeft: '-90px' });
});

