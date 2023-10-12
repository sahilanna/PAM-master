import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Create from '../../../../../../src/screens/Dashboard/Admin/Create/addProjectRepo/Create';
import { MemoryRouter } from 'react-router-dom';

test('Render Create component', () => {
  const { getByText, getByTestId } = render(<MemoryRouter><Create /></MemoryRouter>);
  
  fireEvent.click(getByTestId('X'))
});
