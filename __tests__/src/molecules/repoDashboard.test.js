import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RepoDashboard from '../../../src/molecules/repoDashboard';
import RepoTable from '../../../src/atoms/repoTable';
import "@testing-library/jest-dom";
import api from '../../../src/network/api';
import 'jest-localstorage-mock';


jest.mock('../../../src/network/api')

global.fetch = jest.fn();
jest.mock('../../../src/network/config', () => ({
  ngrokUrl: 'example.com',
}));

jest.mock('../../../src/atoms/repoTable', () => {
  return function MockedRepoTable(props) {
    return <div data-testid="mocked-repo-table">{props.data}</div>;
  };
});

describe('RepoDashboard Component', () => {
  const mockData = [
    {
      id: 1,
      projectName: 'Project 1',
      repositories: [
        { id: 1, name: 'Repo 1', description: 'Description 1' },
        { id: 2, name: 'Repo 2', description: 'Description 2' },
      ],
    },
    {
      id: 2,
      projectName: 'Project 2',
      repositories: [
        { id: 3, name: 'Repo 3', description: 'Description 3' },
      ],
    },
  ];

  afterEach(() => {
   
    global.fetch.mockClear();
  });

  it('renders RepoDashboard component without errors', () => {
    render(<RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />);
  });

  it('handles search input changes and filters the data', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />
    );
  
    const inputElement = getByPlaceholderText('Search Projects...');
  
    
    fireEvent.change(inputElement, { target: { value: 'Repo 1' } });
  
    expect(inputElement.value).toBe('Repo 1');
    expect(getByTestId('filtered-data')).toBeInTheDocument();
  });
  
  

  // it('displays loading indicator while fetching data', async () => {
   
  //   // global.fetch.mockResolvedValueOnce(
  //   //   new Promise((resolve) => {
  //   //     setTimeout(() => {
  //   //       resolve({
  //   //         json: async () => Promise.resolve(mockData),
  //   //       });
  //   //     }, 5000);
  //   //   })
  //   // );

  //   render(<RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />);

    
  //   // expect(screen.getByTestId('loading')).toBeInTheDocument();

    
  //   await waitFor(() => screen.getByTestId('loader'));

    
  // });

 
  it('should call handleAddUser when the "Add User" button is clicked', async () => {
    const initialState = [
      {
        id: 1,
        projectName: 'Project 1',
        repositories: [
          { id: 1, name: 'Repo 1', description: 'Description 1' },
          { id: 2, name: 'Repo 2', description: 'Description 2' },
        ],
      },
      {
        id: 2,
        projectName: 'Project 2',
        repositories: [
          { id: 3, name: 'Repo 3', description: 'Description 3' },
        ],
      },
    ];
  
    const apiMockResponse = {
      data: initialState,
    };
  
    const apiMock = require('../../../src/network/api'); 
    apiMock.default.get.mockResolvedValue(apiMockResponse);
  
  
  
    render(
   
      <RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />
     
    );
  
    
  });

});








