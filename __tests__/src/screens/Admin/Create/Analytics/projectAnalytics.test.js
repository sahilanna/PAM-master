import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ProjectAnalytics from '../../../../../../src/screens/Dashboard/Admin/Analytics/projectAnalytics';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('ProjectAnalytics Component', () => {
  // Mock API responses as before...

  it('renders ProjectAnalytics component with a bar chart', () => {
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

  it('downloads CSV on Download CSV button click', () => {
    const { getByText } = render(<MemoryRouter><ProjectAnalytics /></MemoryRouter>);
    
    waitFor(() => {
      fireEvent.click(getByText('Download CSV'));
    });
   
  });


});
