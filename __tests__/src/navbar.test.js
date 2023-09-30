import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/screens/NavBar'; 
import "@testing-library/jest-dom";


jest.mock('../src/Assets/logo1.png', () => 'logo1.png');

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
