import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../contexts/ThemeContext';

describe('ThemeToggle', () => {
  it('renders correctly in light mode', () => {
    const contextValue = { darkMode: false, toggleDarkMode: jest.fn() };
    const { getByLabelText } = render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(getByLabelText('Toggle Dark Mode')).toBeInTheDocument();
    expect(getByLabelText('Toggle Dark Mode').firstChild).toHaveClass('text-gray-800');
  });

  it('renders correctly in dark mode', () => {
    const contextValue = { darkMode: true, toggleDarkMode: jest.fn() };
    const { getByLabelText } = render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(getByLabelText('Toggle Dark Mode')).toBeInTheDocument();
    expect(getByLabelText('Toggle Dark Mode').firstChild).toHaveClass('lucide lucide-sun w-6 h-6 text-yellow-400');
  });

  it('toggles dark mode on click', () => {
    const toggleDarkMode = jest.fn();
    const contextValue = { darkMode: false, toggleDarkMode };
    const { getByLabelText } = render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    const toggleButton = getByLabelText('Toggle Dark Mode');
    fireEvent.click(toggleButton);
    expect(toggleDarkMode).toHaveBeenCalledTimes(1);
  });
});