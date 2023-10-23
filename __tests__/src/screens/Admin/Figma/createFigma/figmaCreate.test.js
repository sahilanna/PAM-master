import React from 'react';
import { render, screen, fireEvent, waitFor, userEvent } from '@testing-library/react';
import FigmaCreate from '../../../../../../src/screens/Dashboard/Admin/Figma/FigmaCreate';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../../../../src/network/api';

jest.mock("../../../../../../src/network/api")

jest.mock('../../../../../../src/network/api', () => ({
    post: jest.fn(),
    get: jest.fn(),
  }));

describe('FigmaCreate Component', () => {
  const onCloseMock = jest.fn();
  const figmaURL = 'https://example.com/figma-url';
  const projectId = 'project-123';
  const figmaId = 'figma-456';

  const mockUsers = [
    { key: 0, text: 'User 1', value: 'User 1' },
    { key: 1, text: 'User 2', value: 'User 2' },
  ];

  const mockApiPost = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the FigmaCreate component', () => {
    render(
      <MemoryRouter>
        <FigmaCreate 
        onClose={onCloseMock} 
        figmaURL={figmaURL} 
        projectId={projectId} 
        figmaId={figmaId} />
      </MemoryRouter>
    );

    expect(screen.getByText('Add User')).toBeInTheDocument();
    
  });

  it('selects a user and handles form submission', () => {
    render(
        <MemoryRouter>
        <FigmaCreate 
        onClose={onCloseMock} 
        figmaURL={figmaURL} 
        projectId={projectId} 
        figmaId={figmaId} />
      </MemoryRouter>
    );

   
    const userDropdown = screen.getByTestId('User');
    waitFor(() => {
        fireEvent.change(userDropdown, { target: { value: 'User 1' } });
    })
   


    const fileInput = screen.getByTestId('Upload');
    Object.defineProperty(fileInput, 'files', {
      value: [new File(['screenshot'], 'screenshot.png', { type: 'image/png' })],
    });

   
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    
    waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith(`https://example.com/figmas/${figmaId}/user`, {
        user: 'User 1',
        screenshotImage: expect.any(File),
      });
    });

   waitFor(() => {
    expect(onCloseMock).toHaveBeenCalled();
   })
    
  });

it('handles file upload and sets screenshotImage', () => {
    const figmaURL = 'https://example.com/figma';
    const figmaId = 'sampleFigmaId';
    const projectId = 'projectId';
  
    render(
                <MemoryRouter>
                <FigmaCreate 
                onClose={onCloseMock} 
                figmaURL={figmaURL} 
                projectId={projectId} 
                figmaId={figmaId} />
              </MemoryRouter>
            );
  
    
    const screenshotImageFile = new File(['image data'], 'screenshot.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('ss');
  
   
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/png;base64,...',
    };
    window.FileReader = jest.fn(() => mockFileReader);
  
    
    fireEvent.change(fileInput, { target: { files: [screenshotImageFile] } });
  
    waitFor(() => {
        expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(screenshotImageFile);
    })
    
  
    
    // expect(screen.getByLabelText('screenshotImage')).toHaveValue(mockFileReader.result);
  
    
    delete window.FileReader;
  });




  it('catch block of form submission', () => {
    render(
        <MemoryRouter>
        <FigmaCreate 
        onClose={onCloseMock} 
        figmaURL={figmaURL} 
        projectId={projectId} 
        figmaId={figmaId} />
      </MemoryRouter>
    );

   
    const userDropdown = screen.getByTestId('User');
    waitFor(() => {
        fireEvent.change(userDropdown, { target: { value: 'User 1' } });
    })
   


    const fileInput = screen.getByTestId('Upload');
    Object.defineProperty(fileInput, 'files', {
      value: [new File(['screenshot'], 'screenshot.png', { type: 'image/png' })],
    });

   
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    
    waitFor(() => {
      // expect(mockApiPost).toHaveBeenCalledWith(`https://example.com/figmas/${figmaId}/user`, {
      //   user: 'User 1',
      //   screenshotImage: expect.any(File),
      // });
      mockApiPost.mockRejectedValue('Sample Error');
    });

   waitFor(() => {
    expect(onCloseMock).toHaveBeenCalled();
   })
    
  });


});
