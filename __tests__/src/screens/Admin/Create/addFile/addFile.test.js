import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFile from '../../../../../../src/screens/Dashboard/Admin/Create/addFiile/addFile';


jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: {
      projectId: 'your-project-id',
      projectName: 'Your Project Name',
    },
  }),
}));

Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue(
        JSON.stringify({ token: 'your-access-token' })
      ),
      
    },
  });
  
  describe('AddFile Component', () => {
    it('renders AddFile component without errors', () => {
      render(<AddFile />);
      
      expect(screen.getByText('Upload File')).toBeInTheDocument();
      
    });
  
    it('handles file selection and upload', async () => {
      const { container } = render(<AddFile />);
      const fileInput = container.querySelector('input[type="file"]');
  
     
      const mockFile = new File(['file contents'], 'example.pdf', {
        type: 'application/pdf',
      });
  
     
      fireEvent.change(fileInput, { target: { files: [mockFile] } });
  
     
      expect(screen.getByText('Selected File: example.pdf')).toBeInTheDocument();
  
    
      const uploadButton = screen.getByText('Upload');
      fireEvent.click(uploadButton);
  
     
      await waitFor(() => {
        expect(screen.getByText('Upload File')).toBeInTheDocument();
      });
    });
  });