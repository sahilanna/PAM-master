import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import UserRepoRead from '../../../../src/screens/Dashboard/UserDashboard/userRepoRead';

describe('UserRepoRead Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserRepoRead />
      </MemoryRouter>
    );

    // You can add more specific assertions as needed
    expect(getByText('PAM')).toBeInTheDocument();
    expect(getByText('My Profile')).toBeInTheDocument();
    expect(getByText('Projects')).toBeInTheDocument();
    expect(getByText('Repository')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
