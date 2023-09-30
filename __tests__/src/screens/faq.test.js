import React from 'react';
import { render, screen } from '@testing-library/react';
import Faq from '../../../src/screens/faq';
import "@testing-library/jest-dom";

describe('Faq Component', () => {
  it('renders Faq component with FAQ content', () => {
    render(<Faq />);
    
    
    expect(screen.getByText('How to sign up for my account?')).toBeInTheDocument();
    expect(screen.getByText('What third party apps are present in the application?')).toBeInTheDocument();
    expect(screen.getByText('If I am a PM, how do I grant access to a user for a specific project?')).toBeInTheDocument();
    expect(screen.getByText('What is visible for the users?')).toBeInTheDocument();

   
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
