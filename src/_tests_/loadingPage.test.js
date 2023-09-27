import React from 'react';
import { render } from '@testing-library/react';
import LoadingPage from '../atoms/loadingPage';

describe('LoadingPage Component', () => {
  it('renders loading indicator when loading is true', () => {
    const { container } = render(<LoadingPage />);
    const loadingIndicator = container.querySelector('.loader-container');

    expect(loadingIndicator).toBeInTheDocument();
  });

  it('does not render loading indicator when loading is false', () => {
    const { container } = render(<LoadingPage />);
    const loadingIndicator = container.querySelector('.loader-container');

    expect(loadingIndicator).toBeNull();
  });
});



























// import React from 'react';
// import { render } from '@testing-library/react';
// import LoadingPage from '../atoms/loadingPage';

// describe('LoadingPage Component', () => {
//   it('renders loading indicator', () => {
//     const { getByText } = render(<LoadingPage />);
//     const loadingText = getByText('Loading');

//     expect(loadingText).toBeInTheDocument();
//   });

// });

