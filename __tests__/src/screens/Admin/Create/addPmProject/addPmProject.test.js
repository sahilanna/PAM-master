import React from 'react';
import { render } from '@testing-library/react';
import AddPmProject from '../../../../../../src/screens/Dashboard/Admin/Create/addPmProject/addPmProject';
import '@testing-library/jest-dom';

jest.mock('../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/commonAddProject', () => {
  return function MockCommonAddProject(props) {
    return <div data-testid="mock-common-add-project" />;
  };
});

describe('AddPmProject Component', () => {
  it('renders the AddPmProject component', () => {
    const { getByTestId } = render(<AddPmProject />);
    
    
    const addPmProjectComponent = getByTestId('mock-common-add-project');
    expect(addPmProjectComponent).toBeInTheDocument();
  });

  
});
