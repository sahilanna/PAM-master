import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CreateRepoUI from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/createRepoUI';
import '@testing-library/jest-dom';

describe('CreateRepoUI Component', () => {
  it('renders correctly and handles form input', async() => {
   
    const name = 'Initial Name';
    const description = 'Initial Description';
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
   
    render(
      <CreateRepoUI
        name={name}
        description={description}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        clicked={false}
        onClose={() => {}}
      />
    );

    // Verify that the initial values are displayed in the input fields
    expect(screen.getByPlaceholderText('Name')).toHaveValue(name);
    expect(screen.getByPlaceholderText('Description')).toHaveValue(description);

    

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New Name' } });
    await waitFor(() => {
        expect(screen.getByPlaceholderText('Name')).toHaveValue('New Name');

      });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { name: 'description', value: 'New Description' } }));
    
  });

  it('calls handleSubmit when the submit button is clicked', () => {
    const handleSubmit = jest.fn();
    render(
      <CreateRepoUI
        name="Test Name"
        description="Test Description"
        handleChange={() => {}}
        handleSubmit={handleSubmit}
        clicked={false}
        onClose={() => {}}
      />
    );
  
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
  
   
    expect(handleSubmit).toHaveBeenCalledTimes(1);
   
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <CreateRepoUI
        name="Test Name"
        description="Test Description"
        handleChange={() => {}}
        handleSubmit={() => {}}
        clicked={false}
        onClose={onClose}
      />
    );
    
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });


});
