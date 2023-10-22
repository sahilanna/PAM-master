import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ProjectAnalytics from '../../../../../../src/screens/Dashboard/Admin/Analytics/projectAnalytics';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import api from '../../../../../../src/network/api';

jest.mock('../../../../../../src/network/api');

describe('ProjectAnalytics Component', () => {
  // Mock API responses as before...

  it('renders ProjectAnalytics component with a bar chart', async () => {

    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: 42 });
    await api.default.get.mockResolvedValueOnce({ data: 21 });


    render(<MemoryRouter><ProjectAnalytics /></MemoryRouter>);
    
    waitFor(() => {
      expect(screen.getByText('Project Status')).toBeInTheDocument();
    });
  });



  it('navigates back to Analytics on Back button click', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByText } = render( 
        <MemoryRouter history={history}>
          <ProjectAnalytics />
        </MemoryRouter>
    );
    waitFor(() => {
      fireEvent.click(getByText('Back'));
    });

    waitFor(() => {
      expect(history.location.pathname).toBe('/Analytics');
    });
  });

  it('downloads CSV on Download CSV button click',async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(<MemoryRouter history={history}><ProjectAnalytics /></MemoryRouter>);
    
    await waitFor(() =>{
      fireEvent.click(screen.getByTestId('download-csv'));
    })
   
   
  });


});
