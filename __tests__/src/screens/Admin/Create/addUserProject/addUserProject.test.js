import React from 'react';
import { render, screen } from '@testing-library/react';
import AddUserProject from '../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/addUserProject';
import '@testing-library/jest-dom';

// Mocking the CommonAddProject component
jest.mock('../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/commonAddProject', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="commonAddProjectMock">CommonAddProject Mock</div>,
  };
});

describe('AddUserProject', () => {
  it('renders the AddUserProject component', () => {
    render(<AddUserProject />);
    const commonAddProjectMock = screen.getByTestId('commonAddProjectMock');
    expect(commonAddProjectMock).toBeInTheDocument();
  });
});
