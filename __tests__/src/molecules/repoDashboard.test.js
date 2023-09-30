import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RepoDashboard from '../../../src/molecules/repoDashboard';
import "@testing-library/jest-dom";


global.fetch = jest.fn();


jest.mock('../../../src/network/config', () => ({
  ngrokUrl: 'example.com',
}));

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

  it('handles search input changes and filters the data', async () => {
    
    global.fetch.mockResolvedValueOnce({
      json: async () => Promise.resolve(mockData),
    });

    render(<RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />);

   
    await waitFor(() => screen.getByTestId('dimmer'));

   
    fireEvent.change(screen.getByPlaceholderText('Search Projects...'), { target: { value: 'Repo 1' } });

    
    await waitFor(() => screen.getByText('Project 1'));

    
  });

  it('displays loading indicator while fetching data', async () => {
   
    global.fetch.mockResolvedValueOnce(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: async () => Promise.resolve(mockData),
          });
        }, 2000);
      })
    );

    render(<RepoDashboard role="admin" SidebarComponent={() => <div>Mock Sidebar</div>} />);

    
    expect(screen.getByTestId('dimmer')).toBeInTheDocument();

    
    await waitFor(() => screen.getByTestId('loader'), { timeout: 5000 });

    
  });
});
