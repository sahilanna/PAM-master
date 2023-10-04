import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PmDetails from '../../../../src/screens/Dashboard/PM/PmDetails';
import '@testing-library/jest-dom';

const onClose = jest.fn();

const mockProject = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
};

test('renders User Details modal with project information', () => {
    render(<PmDetails project={mockProject} onClose={onClose} />);

    const getByLabelTextAndValue = (label, value) =>
      screen.getByText((content, node) => {
        const hasLabel = node.querySelector('strong')?.textContent === label;
        const hasValue = new RegExp(`^${value}$`).test(content);
        return hasLabel && hasValue;
      });
  
    
    expect(getByLabelTextAndValue('PM ID:', '1')).toBeInTheDocument();
    expect(getByLabelTextAndValue('PM Name:', 'John Doe')).toBeInTheDocument();
    expect(getByLabelTextAndValue('PM Email:', 'johndoe@example.com')).toBeInTheDocument();
  
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();
  
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

test('does not render when project prop is null', () => {
  render(<PmDetails project={null} onClose={onClose} />);

  const modal = screen.queryByRole('dialog');
  expect(modal).not.toBeInTheDocument();
});
