import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; // You may need to wrap your component with BrowserRouter
import CustomSidebar from '../../../../src/screens/Dashboard/SideBar/SideBar';

const links = [
    { to: '/link1', icon: 'icon1', text: 'Link 1' },
    { to: '/link2', icon: 'icon2', text: 'Link 2' },
  ];
  
  // Mock the title
  const title = 'My Sidebar';
  
  // Custom text matcher function
  function customTextMatcher(content, element) {
    return element.textContent === content;
  }
  
  test('renders CustomSidebar component with links', () => {
    render(
      <BrowserRouter>
        <CustomSidebar title={title} links={links} />
      </BrowserRouter>
    );
  
    // Use getByText with custom text matcher
    const titleElement = screen.getByText((content, element) => customTextMatcher(title, element));
    expect(titleElement).toBeInTheDocument();
  
    // Check if each link in the links array is rendered
    links.forEach((link) => {
      const linkText = screen.getByText((content, element) => customTextMatcher(link.text, element));
      expect(linkText).toBeInTheDocument();
  
      // You can add more assertions as needed for each link
    });
  });
  