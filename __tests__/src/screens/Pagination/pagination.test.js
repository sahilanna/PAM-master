import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../../../src/screens/Dashboard/Pagination/Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const itemsPerPage = 5;
  const paginate = jest.fn();

  it('renders the pagination component with the correct number of pages', () => {
    const { container } = render(
      <Pagination data={data} itemsPerPage={itemsPerPage} paginate={paginate} />
    );

    const pages = container.querySelectorAll('.page-item');
    expect(pages.length).toBe(2); // Since there are 10 items and 5 items per page, we should have 2 pages.
  });

  it('calls paginate function when a page button is clicked', () => {
    const { getByText } = render(
      <Pagination data={data} itemsPerPage={itemsPerPage} paginate={paginate} />
    );

    const pageButton = getByText('2'); // Click the second page button
    fireEvent.click(pageButton);

    expect(paginate).toHaveBeenCalledWith(2); // Ensure that the paginate function is called with the correct page number
  });

  it('applies "active" class to the current page button', () => {
    const { getByText } = render(
      <Pagination data={data} itemsPerPage={itemsPerPage} paginate={paginate} />
    );

    const pageButton = getByText('1'); // The first page should be active by default
    expect(pageButton.parentElement).toHaveClass('active');
  });
});
