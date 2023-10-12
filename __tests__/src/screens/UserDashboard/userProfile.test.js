import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../../../../src/screens/Dashboard/UserDashboard/userProfile';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValue(
  JSON.stringify({
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    enumRole: 'PM',
  })
);

test('renders UserProfile with profile data from sessionStorage', () => {
  render(<MemoryRouter>
    <UserProfile />
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
