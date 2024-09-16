import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './ThemeContext';

const TestComponent = () => {
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{darkMode ? 'dark' : 'light'}</span>
      <button onClick={toggleDarkMode}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('sets initial theme based on local storage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  test('toggles theme correctly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const button = screen.getByText('Toggle Theme');
    act(() => {
      button.click();
    });
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    act(() => {
      button.click();
    });
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  test('stores theme in local storage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const button = screen.getByText('Toggle Theme');
    act(() => {
      button.click();
    });
    expect(localStorage.getItem('theme')).toBe('dark');
    act(() => {
      button.click();
    });
    expect(localStorage.getItem('theme')).toBe('light');
  });
});