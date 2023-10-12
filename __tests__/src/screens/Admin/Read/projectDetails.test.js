import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import ProjectDetails from '../../../../../src/screens/Dashboard/Admin/Read/ProjectDetails';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('ProjectDetails Component', () => {
    const project = {
        projectName: 'Sample Project',
        projectDescription: 'This is a sample project',
        pmName: 'John Doe',
        repositories: ['Repo 1', 'Repo 2'],
        figma: { figmaURL: 'https://figma.com/project' },
        googleDrive: { driveLink: 'https://drive.google.com/project' },
        lastUpdated: '2023-10-15T12:00:00Z',
      };
      const onClose = jest.fn();
      const showAddEmployeeButton = true;
      const showAddFileButton = true;
      const onAddFile = jest.fn();
      const handleDeleteProjectMock = jest.fn();
  it('renders project details correctly', () => {
    const project = {
      projectName: 'Sample Project',
      projectDescription: 'This is a sample project',
      pmName: 'John Doe',
      repositories: ['Repo 1', 'Repo 2'],
      figma: { figmaURL: 'https://figma.com/project' },
      googleDrive: { driveLink: 'https://drive.google.com/project' },
      lastUpdated: '2023-10-15T12:00:00Z',
    };
    const onClose = jest.fn();
    const showAddEmployeeButton = true;
    const showAddFileButton = true;
    const onAddFile = jest.fn();

    const { getByText, queryByText } = render(
      <MemoryRouter><ProjectDetails
      project={project}
      onClose={onClose}
      showAddEmployeeButton={showAddEmployeeButton}
      showAddFileButton={showAddFileButton}
      onAddFile={onAddFile}
    /></MemoryRouter>
    );
    waitFor(() => {
        expect(getByText('Sample Project')).toBeInTheDocument();
        expect(getByText('This is a sample project')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('Repo 1, Repo 2')).toBeInTheDocument();
        expect(getByText('https://figma.com/project')).toBeInTheDocument();
        expect(getByText('https://drive.google.com/project')).toBeInTheDocument();
        expect(getByText('Created on :')).toBeInTheDocument();
        expect(getByText('October 15, 2023, 12:00:00 PM')).toBeInTheDocument();
        expect(queryByText('Add File')).toBeInTheDocument();

    })

   
  });

  it('calls handleDeleteProject when the delete button is clicked',() => {
    const project = {
      projectName: 'Sample Project',
      projectDescription: 'This is a sample project',
      pmName: 'John Doe',
      repositories: ['Repo 1', 'Repo 2'],
      figma: { figmaURL: 'https://figma.com/project' },
      googleDrive: { driveLink: 'https://drive.google.com/project' },
      lastUpdated: '2023-10-15T12:00:00Z',
    };
    const onClose = jest.fn();
    const showAddEmployeeButton = true;
    const showAddFileButton = true;
    const onAddFile = jest.fn();
    const handleDeleteProjectMock = jest.fn();

    const { getByTestId } = render(
     <MemoryRouter><ProjectDetails
     project={project}
     onClose={onClose}
     showAddEmployeeButton={showAddEmployeeButton}
     showAddFileButton={showAddFileButton}
     onAddFile={onAddFile}
     handleDeleteProject={handleDeleteProjectMock}
   /></MemoryRouter> 
    );

    fireEvent.click(getByTestId('del'));

    waitFor(() => {
      expect(handleDeleteProjectMock).toHaveBeenCalled();
    });
  });




it('does not display the Add File button if showAddFileButton is false', () => {
    const { queryByText } = render(
      <MemoryRouter><ProjectDetails
      project={project}
      onClose={onClose}
      showAddEmployeeButton={showAddEmployeeButton}
      showAddFileButton={false}
      onAddFile={onAddFile}
    /></MemoryRouter>
    );

    expect(queryByText('Add File')).toBeNull();
  });

//   it('displays an error message if OTP submission fails', () => {
//     const project = {
//       projectName: 'Sample Project',
//       projectDescription: 'This is a sample project',
//       pmName: 'John Doe',
//       repositories: ['Repo 1', 'Repo 2'],
//       figma: { figmaURL: 'https://figma.com/project' },
//       googleDrive: { driveLink: 'https://drive.google.com/project' },
//       lastUpdated: '2023-10-15T12:00:00Z',
//     };
//     const onClose = jest.fn();
//     const showAddEmployeeButton = true;
//     const showAddFileButton = true;
//     const onAddFile = jest.fn();
//     const errorMessage = 'Invalid OTP. Please try again.';
//     const showOTPMoal = true;

//     const { getByText } = render(
//       <MemoryRouter><ProjectDetails
//       project={project}
//       onClose={onClose}
//       showAddEmployeeButton={showAddEmployeeButton}
//       showAddFileButton={showAddFileButton}
//       onAddFile={onAddFile}
//       errorMessage={errorMessage}
//       showOTPMoal={showOTPMoal}
//     /></MemoryRouter>
//     );

//     expect(getByText(errorMessage)).toBeInTheDocument();
//   });

  // Add more test cases for different scenarios and interactions within the component.
});
