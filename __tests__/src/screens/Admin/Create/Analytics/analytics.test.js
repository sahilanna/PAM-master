import React from 'react';
import { MemoryRouter, Route, Router  } from 'react-router-dom';
import { render, screen,waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom'; 
import Analytics from '../../../../../../src/screens/Dashboard/Admin/Analytics/Analytics';



jest.mock('../../../../../../src/network/api');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Analytics Component', () => {
 
  beforeAll(() => {
    global.fetch = jest.fn();
    fetch
      .mockResolvedValueOnce({
        json: async () => [{ name: 'Admins', count: 5 }],
      })
      .mockResolvedValueOnce({
        json: async () => [{ name: 'Project Managers', count: 3 }],
      })
      .mockResolvedValueOnce({
        json: async () => [{ name: 'Users', count: 7 }],
      });
  });

  it('renders analytics component with a loader', () => {
    render(<MemoryRouter><Analytics /></MemoryRouter>);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  
  it('displays the pie chart after loading', () => {
    render(<MemoryRouter><Analytics /></MemoryRouter>);
    waitFor(() => {
      expect(screen.getByText('Count of Admin, PMs, and Users')).toBeInTheDocument();
    });
  
  });

  it('navigates to projectAnalytics on Next button click', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    
   

    const { getByText } = render( 
        <MemoryRouter history={history}>
        <Analytics/>
        </MemoryRouter>
      );


    waitFor(() => {
      expect(screen.getByText('Count of Admin, PMs, and Users')).toBeInTheDocument();
    });

    const navigateMock = history.navigate;


    waitFor(() => {
      fireEvent.click(getByText('Next'));
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/projectAnalytics');
    });
 
});

  it('downloads CSV on Download CSV button click', () => {
    const { getByText } = render(<MemoryRouter><Analytics /></MemoryRouter>);
     waitFor(() => {
      fireEvent.click(getByText('Download CSV'));
    });
    
  });
});