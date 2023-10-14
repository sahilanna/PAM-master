import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CreateRepoUI from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/createRepoUI';
import '@testing-library/jest-dom';

describe('CreateRepoUI Component', () => {

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

  it('displays error message for name when clicked and name is empty', () => {
    render(
      <CreateRepoUI
        name=""
        description="Initial Description"
        handleChange={() => {}}
        handleSubmit={() => {}}
        clicked={true} // Simulate that the submit button was clicked
        onClose={() => {}}
      />
    );

    const errorMessage = screen.getByText("Repo name can't be Empty");
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message for description when clicked and description is empty', () => {
    render(
      <CreateRepoUI
        name="Initial Name"
        description=""
        handleChange={() => {}}
        handleSubmit={() => {}}
        clicked={true} // Simulate that the submit button was clicked
        onClose={() => {}}
      />
    );

    const errorMessage = screen.getByText("Repo description can't be Empty");
    expect(errorMessage).toBeInTheDocument();
  });

  it('does not display error message for name when clicked and name is not empty', () => {
    render(
      <CreateRepoUI
        name="Test Name"
        description="Initial Description"
        handleChange={() => {}}
        handleSubmit={() => {}}
        clicked={true} // Simulate that the submit button was clicked
        onClose={() => {}}
      />
    );

    const errorMessage = screen.queryByText("Repo name can't be Empty");
    expect(errorMessage).toBeNull();
  });

  it('does not display error message for description when clicked and description is not empty', () => {
    render(
      <CreateRepoUI
        name="Initial Name"
        description="Test Description"
        handleChange={() => {}}
        handleSubmit={() => {}}
        clicked={true} // Simulate that the submit button was clicked
        onClose={() => {}}
      />
    );

    const errorMessage = screen.queryByText("Repo description can't be Empty");
    expect(errorMessage).toBeNull();
  });




});
