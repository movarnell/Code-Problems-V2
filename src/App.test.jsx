import React from 'react';
import { render, screen } from '@testing-library/react';
import ProblemDisplay from './components/ProblemDisplay';

test('renders problem description', () => {
  const problem = {
    problem_description: 'Test description',
  };
  render(<ProblemDisplay problem={problem} />);
  expect(screen.getByText('Test description')).toBeInTheDocument();
});

test('renders default description when none is provided', () => {
    render(<ProblemDisplay />);
    expect(screen.getByText('No problem generated yet.')).toBeInTheDocument();
  });

test('renders requirements', () => {
  const problem = {
    requirements: ['Requirement 1', 'Requirement 2'],
  };
  render(<ProblemDisplay problem={problem} />);
  expect(screen.getByText('Requirement 1')).toBeInTheDocument();
  expect(screen.getByText('Requirement 2')).toBeInTheDocument();
});