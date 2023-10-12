import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddUserUI from '../../../../../../src/screens/Dashboard/Admin/Create/addUserGit/addUserUI';
import '@testing-library/jest-dom'

const selectedRepo = 'SampleRepo';
const options = ['user1', 'user2', 'user3'];
const username = 'user1';
const handleUserNameBChange = jest.fn();
const handleSubmit = jest.fn();
const onClose = jest.fn();

describe('AddUserUI Component', () => {


    test('renders modal header', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('renders Repository Name input field', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    const repoNameLabel = screen.getByTestId('repoNameLabel');
    expect(repoNameLabel).toBeInTheDocument();
    const repoNameInput = screen.getByTestId('repoNameInput');
    expect(repoNameInput).toHaveAttribute('readOnly');
    expect(repoNameInput).toHaveValue(selectedRepo);

  });


  test('renders User Username dropdown', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  test('handles "X" button click', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  test('handles submit button click', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('selects a username from the dropdown', () => {
    render(
      <AddUserUI
        selectedRepo={selectedRepo}
        options={options}
        username={username}
        handleUserNameBChange={handleUserNameBChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    );
    const dropdown =  screen.getByTestId('dropdown');
    fireEvent.click(dropdown);
    const optionToSelect = screen.getByText('user2');
    fireEvent.click(optionToSelect);
    
  });
});
