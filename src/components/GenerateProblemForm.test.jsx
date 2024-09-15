import React from 'react';  // Import React
import { render, screen, fireEvent, act } from '@testing-library/react';  // Add `act`
import { QueryClient, QueryClientProvider } from 'react-query';
import GenerateProblemForm from './GenerateProblemForm';

const queryClient = new QueryClient();

// Utility to wrap components with the query client provider
const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

test('renders form with default values', () => {
  renderWithClient(<GenerateProblemForm setProblem={jest.fn()} />);

  expect(screen.getByLabelText(/Language:/i).value).toBe('JavaScript');
  expect(screen.getByLabelText(/Difficulty:/i).value).toBe('Easy');
  expect(screen.getByLabelText(/Problem Type:/i).value).toBe('Fundamentals');
});

test('handles input changes', () => {
  renderWithClient(<GenerateProblemForm setProblem={jest.fn()} />);

  fireEvent.change(screen.getByLabelText(/Language:/i), { target: { value: 'Python' } });
  fireEvent.change(screen.getByLabelText(/Difficulty:/i), { target: { value: 'Medium' } });
  fireEvent.change(screen.getByLabelText(/Problem Type:/i), { target: { value: 'Loops' } });

  expect(screen.getByLabelText(/Language:/i).value).toBe('Python');
  expect(screen.getByLabelText(/Difficulty:/i).value).toBe('Medium');
  expect(screen.getByLabelText(/Problem Type:/i).value).toBe('Loops');
});

test('calls generateProblemMutation on form submit', async () => {
  const mockSetProblem = jest.fn();
  renderWithClient(<GenerateProblemForm setProblem={mockSetProblem} />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ problem: 'Test Problem' }),
    })
  );

  await act(async () => {
    fireEvent.submit(screen.getByRole('button', { name: /Generate Problem/i }));
  });

  expect(global.fetch).toHaveBeenCalledWith('https://backend.michaelvarnell.com:8000/generate', expect.any(Object));
});

test('displays loading state during mutation', async () => {
  const mockSetProblem = jest.fn();
  renderWithClient(<GenerateProblemForm setProblem={mockSetProblem} />);

  global.fetch = jest.fn(() =>
    new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({ problem: 'Test Problem' }) }), 1000))
  );

  await act(async () => {
    fireEvent.submit(screen.getByRole('button', { name: /Generate Problem/i }));
  });

  expect(screen.getByText(/Generating.../i)).toBeInTheDocument();
});