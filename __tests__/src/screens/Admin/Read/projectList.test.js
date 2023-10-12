import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProjectList from '../../../../../src/screens/Dashboard/Admin/Read/projectList';
import { MemoryRouter } from 'react-router-dom';


describe('ProjectList Component', () => {
  it('calls handleAddItem when the "Add User" button is clicked', () => {
    const projectId = '123';
    const projectName = 'Sample Project';
    const type = 'pms';
    const handleAddItemMock = jest.fn();

    render(
      <MemoryRouter><ProjectList projectId={projectId} projectName={projectName} type={type} handleAddItem={handleAddItemMock} /></MemoryRouter>
    );

    waitFor(() => {
        expect(handleAddItemMock).toHaveBeenCalledWith(projectId, projectName);
    })
   
  });

  it('renders the list of PMs or users', () => {
    const projectId = '123';
    const projectName = 'Sample Project';
    const type = 'users';
    const items = [
      { id: '1', name: 'User1', email: 'user1@example.com', gitHubUsername: 'user1github' },
      { id: '2', name: 'User2', email: 'user2@example.com', gitHubUsername: 'user2github' },
    ];

    const { getByText, queryByText } = render(
     <MemoryRouter><ProjectList projectId={projectId} projectName={projectName} type={type} items={items} /></MemoryRouter>
    );

    waitFor(() => {
        expect(getByText('User1')).toBeInTheDocument();
    expect(getByText('User2')).toBeInTheDocument();
    expect(queryByText('No users found')).toBeNull();
    })
    
  });

  it('calls handleDeleteItem when the "Delete User" button is clicked', () => {
    const projectId = '123';
    const projectName = 'Sample Project';
    const type = 'pms';
    const items = [
      { id: '1', name: 'PM1', email: 'pm1@example.com', gitHubUsername: 'pm1github' },
    ];
    const handleDeleteItemMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter><ProjectList projectId={projectId} projectName={projectName} type={type} items={items} handleDeleteItem={handleDeleteItemMock} /></MemoryRouter>
    );
    waitFor(()=>{
        fireEvent.click(getByTestId('del'));
    })
    
    waitFor(() => {

    expect(handleDeleteItemMock).toHaveBeenCalledWith('1', 'pm1github');
    })
  });

//   it('displays an error message if OTP submission fails', () => {
//     const projectId = '123';
//     const projectName = 'Sample Project';
//     const type = 'users';
//     const errorMessage = 'Invalid OTP. Please try again.';
//     const showOTPMoal = true;

//     const { getByText } = render(
//       <ProjectList projectId={projectId} projectName={projectName} type={type} showOTPMoal={showOTPMoal} errorMessage={errorMessage} />
//     );

//     expect(getByText(errorMessage)).toBeInTheDocument();
//   });



});
