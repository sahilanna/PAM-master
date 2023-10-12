import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddPmUserName from '../../../../src/screens/Dashboard/PM/addPmUsername';
import api from '../../../../src/network/api';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../../../../src/network/api');

describe('AddPmUserName Component', () => {
  it('renders AddPmUserName component without errors', () => {
    render(<MemoryRouter><AddPmUserName /></MemoryRouter>);
  });

  it('calls navigate with -1 when the close button is clicked', () => {
    const navigate = require('react-router-dom').useNavigate;
    const mockNavigate = jest.fn();
    
    render(<MemoryRouter><AddPmUserName /></MemoryRouter>);
    
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })
    
  });

  
});
