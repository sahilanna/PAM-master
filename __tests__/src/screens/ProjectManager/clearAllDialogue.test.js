import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClearAllDialogue from '../../../../src/screens/Dashboard/ProjectManager/clearAllDialogue';

describe('ClearAllDialogue Component', () => {
  it('renders ClearAllDialogue component with confirmation content', () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();

    const { getByText } = render(
      <ClearAllDialogue show={true} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    
    expect(getByText('Confirm Clear')).toBeInTheDocument();
    expect(getByText('Are you sure you want to clear all the notifications?')).toBeInTheDocument();

   
    const cancelButton = getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();

    
    const deleteButton = getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('does not render ClearAllDialogue component when show is false', () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();

    const { queryByText } = render(
      <ClearAllDialogue show={false} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    
    expect(queryByText('Confirm Clear')).toBeNull();
    expect(queryByText('Are you sure you want to clear all the notifications?')).toBeNull();
    expect(queryByText('Cancel')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
  });
});
