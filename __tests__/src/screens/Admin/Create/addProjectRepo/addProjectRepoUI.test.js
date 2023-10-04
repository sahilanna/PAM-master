import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import CreateUI from '../../../../../../src/screens/Dashboard/Admin/Create/addProjectRepo/addProjectRepoUI';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Make sure to import Semantic UI CSS


describe('CreateUI Component', () => {
    it('calls onSubmit when the form is submitted', () => {
     
      const onSubmit = jest.fn();
      const onClose = jest.fn();
      const handleProjectChange = jest.fn();
      const handleRepoChange = jest.fn();
  
      render(
        <CreateUI
          onSubmit={onSubmit}
          onClose={onClose}
          projItem={[{ key: '1', value: 'project1', text: 'Project 1' }]}
          temp={[{ key: '1', value: 'repo1', text: 'Repo 1' }]}
          handleProjectChange={handleProjectChange}
          handleRepoChange={handleRepoChange}
        />
      );
  
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
  
      expect(onSubmit).toHaveBeenCalledTimes(1);
      
    });
  
    it('calls onClose when the close button is clicked', () => {

      const onSubmit = jest.fn();
      const onClose = jest.fn();

      const handleProjectChange = jest.fn();
      const handleRepoChange = jest.fn();
  
      render(
        <CreateUI
          onSubmit={onSubmit}
          onClose={onClose}
          projItem={[{ key: '1', value: 'project1', text: 'Project 1' }]}
          temp={[{ key: '1', value: 'repo1', text: 'Repo 1' }]}
          handleProjectChange={handleProjectChange}
          handleRepoChange={handleRepoChange}
        />
      );
  

      const closeButton = screen.getByText('X');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    
    });

   
it('calls handleProjectChange when a project is selected', () => {
      
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const handleRepoChange = jest.fn();
  
    const handleProjectChange = jest.fn();
  
   
    render(
      <CreateUI
        onSubmit={onSubmit}
        onClose={onClose}
        projItem={[{ key: '1', value: 'project1', text: 'Project 1' }]}
        temp={[{ key: '1', value: 'repo1', text: 'Repo 1' }]}
        handleProjectChange={handleProjectChange}
        handleRepoChange={handleRepoChange}
      />
    );
  
    const projectDropdown = screen.getByTestId('project-dropdown');
    fireEvent.click(projectDropdown);

    const optionText = 'Project 1'; 
    const option = screen.getByText(optionText);
    fireEvent.click(option);
   
  });
      

  });