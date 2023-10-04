import React from 'react';
import { render, screen } from '@testing-library/react';
import Faq from "/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/faq.js"
import '@testing-library/jest-dom';



// Mock the NavBar and Footer components
jest.mock('../../../src/screens/NavBar', () => () => <div data-testid="navbar" />);
jest.mock('../../../src/screens/Footer', () => () => <div data-testid="footer" />);

describe('Faq Component', () => {
  it('renders Faq component with FAQ content', () => {
   const {getByText}= render(<Faq/>);
    
    // Check for specific text content in the FAQ
    const account=getByText('1 How to sign up for my account?')
    expect(account).toBeInTheDocument();
    const sso=getByText('1.You can login using Single-Sign-On with google. Add your google credentials and register.')
    expect(sso).toBeInTheDocument();
    const present=getByText('2 What third party apps are present in the application?')
    expect(present).toBeInTheDocument();
    expect(screen.getByText('2.GitHub, Figma')).toBeInTheDocument();
    expect(screen.getByText('3. If I am a PM, how do I grant access to a user for a specific project?')).toBeInTheDocument();
    expect(screen.getByText('4. Login to your PM account, In the dashboard click on projects, List of projects is visible, click on Add User. Fill the details required and click on submit. The request will be sent to admin.')).toBeInTheDocument();
    expect(screen.getByText('5. What is visible for the users?')).toBeInTheDocument();
    expect(screen.getByText('6. Users can see the list of projects they are assgined to, list of repos and figma links associated with that project.')).toBeInTheDocument();

    // Check if the NavBar and Footer components are rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
