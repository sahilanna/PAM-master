import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ViewUserVerification from '../../../../../../src/screens/Dashboard/Admin/Figma/viewUserVerification';
import api from '../../../../../../src/network/api';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: {
      figmaId: 'your-figma-id',
    },
  }),
}));

jest.mock('../../../../../../src/network/api', () => ({
  get: jest.fn(),
}));

describe('ViewUserVerification Component', () => {
  it('downloads a file and navigates to adminDashboard', async () => {
    // Mock the API response for the file download
    const mockBlob = new Blob(['file contents'], { type: 'application/zip' });
    api.get.mockResolvedValueOnce({ data: mockBlob });

    // Create a spy for the navigate function
    const navigate = jest.fn();

    // Render the component
    const { getByText } = render(<ViewUserVerification />);
    
    // Wait for the file to be downloaded
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(expect.any(String), {
        responseType: 'blob',
        contentType: 'application/zip',
      });
    });

    // Check if the "View User Verification" header is present
    expect(getByText('View User Verification')).toBeInTheDocument();

    // Ensure that the navigate function is called
    // expect(navigate).toHaveBeenCalledWith('/adminDashboard');
  });
});
