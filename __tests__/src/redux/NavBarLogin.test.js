import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import NavBarLogin from '../../../src/redux/NavBarLogin';
import '@testing-library/jest-dom';

jest.mock('../../src/Assets/logo1.png', () => 'logo1.png')

test('renders navigation links correctly', () => {
  render(
    <MemoryRouter>
      <NavBarLogin />
    </MemoryRouter>
  );

  // Check for the logo image
  const logo = screen.getByAltText('Logo');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src', 'logo1.png');
  expect(logo).toHaveStyle({ width: '50px', height: '50px', marginLeft: '-90px' });

  
  expect(screen.getByText('Project Access Management')).toBeInTheDocument();

  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('This application lets you add projects, users, and project managers into a certain project or to the platform')).toBeInTheDocument();
  expect(screen.getByText('Large pool of people who work on various projects and move between the projects')).toBeInTheDocument();
  expect(screen.getByText('Providing and revoking the access for various tools under the project for the DevOps team.')).toBeInTheDocument();
  expect(screen.getByText('With this platform, we want to build a solution which helps DevOps team to manage access across the projects.')).toBeInTheDocument();


  expect(screen.getByText('Tools')).toBeInTheDocument();
  expect(screen.getByText('GitHub')).toBeInTheDocument();
  expect(screen.getByText('Figma')).toBeInTheDocument();
  expect(screen.getByText('GDrive')).toBeInTheDocument();
});

test('navigates to home page when logo is clicked', () => {
    render(
      <BrowserRouter> 
        <NavBarLogin />
      </BrowserRouter>
    );
  
    const logo = screen.getByAltText('Logo');
    fireEvent.click(logo);
  
    expect(window.location.pathname).toBe('/'); 
  });

