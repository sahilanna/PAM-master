import React from 'react';
import { render } from '@testing-library/react';
import RepoPmDashboard from '../../../../src/screens/Dashboard/ProjectManager/repoPmDashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('RepoPmDashboard', () => {
  it('should render RepoDashboard component with correct props', () => {
    render(<MemoryRouter><RepoPmDashboard /></MemoryRouter>);
    
  });
});
