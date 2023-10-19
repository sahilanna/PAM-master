import React from 'react';
import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PmNotification from '../../../../src/screens/Dashboard/ProjectManager/pmNotification';
import api from '../../../../src/network/api';
import { toast } from 'react-toastify';
import { ngrokUrl } from '../../../../src/network/config';

jest.mock('../../../../src/network/api');
jest.mock('react-toastify', () => ({
  info: jest.fn(),
  POSITION: { TOP_RIGHT: 'top-right' }, 
}));

describe('PmNotification Component', () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: [] }); 
   
  });

  it('fetches and displays notifications',  () => {
    api.get.mockResolvedValue({
      data: [{ id: 1, response: 'Notification 1', accessRequestId: 101 }],
    });

    render(
      <MemoryRouter>
        <PmNotification />
      </MemoryRouter>
    );

    // Wait for the API request to resolve and render the component
    waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://ngrokUrl/request/unread/PM?pmName=null`
      );
      expect(screen.getByText('Notification 1')).toBeInTheDocument();
    });
  });

  it('fetches and displays notifications',  () => {
    api.get.mockResolvedValue({
      data: [{ id: 1, response: 'Notification 1', accessRequestId: 101 }],
    });

    render(
      <MemoryRouter>
        <PmNotification />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://ngrokUrl/request/unread/PM?pmName=null`
      );
    });

    const showAllNotification = screen.getByTestId('notify');
    fireEvent.click(showAllNotification);

  });

  it('fetches and displays notifications', async () => {
    api.get.mockResolvedValue({
      data: [{ id: 1, response: 'Notification 1', accessRequestId: 101 }],
    });

    render(
      <MemoryRouter>
        <PmNotification />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/request/unread/PM?pmName=null`
      );
    });

    const showAllNotification = screen.getByTestId('notify');
    fireEvent.click(showAllNotification);

    await waitFor(() => {
      const deleteButton = screen.getByTestId('delete');
      fireEvent.click(deleteButton);
    })

    expect(api.put).toHaveBeenCalledWith(
      `https://${ngrokUrl}/request/notifiedPM?accessRequestId=${101}`
    );



  });

  
});
