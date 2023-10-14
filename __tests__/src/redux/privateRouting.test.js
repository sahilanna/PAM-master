import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../../../src/redux/PrivateRouting';
import AdminDashboard from '../../../src/screens/Dashboard/Admin/AdminDashboard';
import PmCreate from '../../../src/screens/Dashboard/PM/pmCreate';
// Mock the sessionStorage data for your test
const mockSessionStorage = {
  item: JSON.stringify({
    enumRole: 'ADMIN', // Replace with the desired role for your test
    id: '1', // Replace with a user ID if needed
  }),
};



global.sessionStorage = {
  getItem: (key) => mockSessionStorage[key],
};

test('renders the correct route for ADMIN role', async () => {
  render(
    <MemoryRouter initialEntries={['/AdminDashboard']}>
      <PrivateRoutes />
    </MemoryRouter>
  );

});



