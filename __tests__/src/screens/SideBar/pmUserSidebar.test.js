import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // You may need to wrap your component with BrowserRouter
import CustomSidebar from '../../../../src/screens/Dashboard/SideBar/SideBar';

describe('CustomSidebar Component', () => {
 
 

  it('renders the CustomSidebar component with title and links', () => {
    render(
      <Router>
        <CustomSidebar/>
      </Router>
    );
   
  });
});