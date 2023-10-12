import React from 'react';
import { render, screen } from '@testing-library/react';
import PmProfile from '../../../../src/screens/Dashboard/ProjectManager/pmprofile';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValue(
  JSON.stringify({
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    enumRole: 'PM',
  })
);

test('renders PmProfile with profile data from sessionStorage', () => {
  render(<MemoryRouter>
    <PmProfile />
  </MemoryRouter>
  );

  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
  expect(screen.getByText('Role')).toBeInTheDocument();
  expect(screen.getByText('PM')).toBeInTheDocument();
  expect(screen.getByText('ID')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
});
