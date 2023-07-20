import 'babel-polyfill';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import CreateRepo from './CreateRepo';

describe('CreateRepo Component', () => {
    it('renders the component correctly', () => {
      render(<CreateRepo />);
      expect(screen.getByText('Create New Repository')).toBeInTheDocument();
    }); 
  
    it('submits the form with valid data', () => {
      render(<CreateRepo />);
  
      const nameInput = screen.getByPlaceholderText('Name');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const submitButton = screen.getByRole('button', { name: /submit/i });
  
      fireEvent.change(nameInput, { target: { value: 'My New Repo' } });
      fireEvent.change(descriptionInput, { target: { value: 'A new repository description' } });
  
     
      fireEvent.click(submitButton);
  
      
    });
  
    it('disables the submit button when required fields are empty', () => {
      render(<CreateRepo />);
  
      const submitButton = screen.getByRole('button', { name: /submit/i });
  
      expect(submitButton).toBeDisabled();
  
    
      expect(submitButton).toBeDisabled();
  
      
      fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'My New Repo' } });
      fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'A new repository description' } });
  
      
      expect(submitButton).not.toBeDisabled();
    });
  
    
  });
  