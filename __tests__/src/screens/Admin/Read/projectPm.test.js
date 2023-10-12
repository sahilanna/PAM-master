import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectPms from '../../../../../src/screens/Dashboard/Admin/Read/projectPms';
import { MemoryRouter } from 'react-router-dom';
test('renders ProjectList component with props', () => {
  const projectId = '123';
  const projectName = 'Test Project';

  render(<MemoryRouter>
    <ProjectPms projectId={projectId} projectName={projectName} />
  </MemoryRouter>);

});
