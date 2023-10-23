import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDialogBox from '../../../../src/screens/Dashboard/DialogBox/newDialogBox';

describe('DialogBox Component', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  it('renders the dialog box with content', () => {
    const { getByText } = render(
      <NewDialogBox show={true} onClose={onClose} onConfirm={onConfirm} />
    );

    // Checking if the dialog content is displayed
    expect(getByText('Confirm Delete')).toBeInTheDocument();
    expect(getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<NewDialogBox show={true} onClose={onClose} onConfirm={onConfirm} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Ensure that onClose is called
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when Delete button is clicked', () => {
    render(<NewDialogBox show={true} onClose={onClose} onConfirm={onConfirm} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Ensure that onConfirm is called
    expect(onConfirm).toHaveBeenCalled();
  });

  it('does not call onConfirm when Cancel button is clicked', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(<NewDialogBox show={true} onClose={onClose} onConfirm={onConfirm} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Ensure that onConfirm is not called
    expect(onConfirm).not.toHaveBeenCalled();

    // Ensure that onClose is called
    expect(onClose).toHaveBeenCalled();
  });
  

  it('does not call onClose when Delete button is clicked', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(<NewDialogBox show={true} onClose={onClose} onConfirm={onConfirm} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Ensure that onClose is not called
    expect(onClose).not.toHaveBeenCalled();

    // Ensure that onConfirm is called
    expect(onConfirm).toHaveBeenCalled();
  });
});
