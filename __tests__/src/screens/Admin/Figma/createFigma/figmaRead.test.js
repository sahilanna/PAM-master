import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import FigmaRead from '../../../../../../src/screens/Dashboard/Admin/Figma/FigmaRead';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import api from '../../../../../../src/network/api';
import { ngrokUrl } from '../../../../../../src/network/config';
import DialogBox from '../../../../../../src/screens/Dashboard/DialogBox/DialogBox';


jest.mock('../../../../../../src/network/api', () => ({
    delete:jest.fn(),
}));

describe('FigmaRead Component', () => {
  const navigateMock = jest.fn();
  const handleAddUserMock = jest.fn();
  const handleDeleteUrlMock = jest.fn();
  const setShowModalMock = jest.fn();
  const setShowConfirmDialogMock = jest.fn();

  const projects = [
    {
      figmaId: '1',
      projectDTO: { projectName: 'Project 1' },
      figmaURL: 'https://figma.com/project1',
    },
    {
      figmaId: '2',
      projectDTO: { projectName: 'Project 2' },
      figmaURL: 'https://figma.com/project2',
    },
  ];

  it('renders Figma URLs correctly', () => {
    render(
      <MemoryRouter><FigmaRead/></MemoryRouter>
    );
  });

  it('calls handleAddUser when "Add User Verification" button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FigmaRead
        projects={projects}
        navigate={navigateMock}
        handleAddUser={handleAddUserMock}
        handleDeleteUrl={handleDeleteUrlMock}
        setShowModal={setShowModalMock}
      />
      </MemoryRouter>
    );
    
    FigmaRead.handleAddUser = handleAddUserMock;

    waitFor(() => {
        fireEvent.click(getByTestId('add'));
    })
    waitFor(()=> {
        expect(handleAddUserMock).toHaveBeenCalled();
    })
    
  });

it('should open the delete dialog and call handleDeleteUrl on confirm', async() => {
    // Create a sample project for testing
    const project = {
      figmaId: 'sampleFigmaId',
      
    };

    
    const { getByTestId } = render(
      <MemoryRouter>
        <DialogBox/>
        <FigmaRead
        projects={[project]}
        navigate={navigateMock}
        setShowConfirmDialog={setShowConfirmDialogMock}
      />
      </MemoryRouter>
    );
    
    waitFor(() => {
        fireEvent.click(getByTestId('delete'));
    })
    
    waitFor(() => {
        expect(setShowConfirmDialogMock).toHaveBeenCalledWith('sampleFigmaId');
    })
    

    waitFor(() => {
        fireEvent.click(getByTestId('confirm'));
    })

 
    waitFor(async() => {

        expect(setShowConfirmDialogMock).toHaveBeenCalledWith(null);
     
        expect(api.delete).toHaveBeenCalledWith(`https://${ngrokUrl}/figmas/sampleFigmaId`);
        
        expect(navigateMock).toHaveBeenCalledWith('/FigmaRead');
    
    });
  });



  it('calls setShowModal when the "Create Figma" button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FigmaRead
        projects={projects}
        navigate={navigateMock}
        handleAddUser={handleAddUserMock}
        handleDeleteUrl={handleDeleteUrlMock}
        setShowModal={setShowModalMock}
      />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('create'));
    waitFor(() => {
        expect(setShowModalMock).toHaveBeenCalledWith(true);
    })
    
  });

  it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
      
        <MemoryRouter>
          <FigmaRead/>
        </MemoryRouter>
     
    );

    const searchInput = getByPlaceholderText('Search Figma...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

  });

  
});
