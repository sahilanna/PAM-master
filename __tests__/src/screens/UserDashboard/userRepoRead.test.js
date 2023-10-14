import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import UserRepoRead from '../../../../src/screens/Dashboard/UserDashboard/userRepoRead';

describe('UserRepoRead Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserRepoRead />
      </MemoryRouter>
    );

  });

  
});
