import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import RepoTable from '../../../src/atoms/repoTable';

describe('RepoTable', () => {
  it('renders a table with data', () => {
    const data = [
      {
        projectName: 'Project 1',
        repositories: [
          { name: 'Repo 1', description: 'Description 1' },
          { name: 'Repo 2', description: 'Description 2' },
        ],
      },
      {
        projectName: 'Project 2',
        repositories: [{ name: 'Repo 3', description: 'Description 3' }],
      },
    ];

    render(<RepoTable data={data} />);

 
    expect(screen.getByText('Project Name')).toBeInTheDocument();
    expect(screen.getByText('Repository Name')).toBeInTheDocument();
    expect(screen.getByText('Repository Description')).toBeInTheDocument();

   
    const project1Cells = screen.queryAllByText('Project 1');
    const project2Cells = screen.queryAllByText('Project 2');
    const repo1Cells = screen.queryAllByText('Repo 1');
    const repo2Cells = screen.queryAllByText('Repo 2');
    const repo3Cells = screen.queryAllByText('Repo 3');

    expect(project1Cells).toHaveLength(2); 
    expect(project2Cells).toHaveLength(1); 
    expect(repo1Cells).toHaveLength(1); 
    expect(repo2Cells).toHaveLength(1); 
    expect(repo3Cells).toHaveLength(1); 
  });

  it('renders a message when there is no data', () => {
    const data = [];

    render(<RepoTable data={data} />);

  
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
