import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GenerateProblemForm from './components/GenerateProblemForm';
import ProblemDisplay from './components/ProblemDisplay';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css'

const queryClient = new QueryClient();

function App() {
  const [problem, setProblem] = React.useState(null);

  const handleSetProblem = (newProblem) => {
    console.log('Setting new problem:', newProblem);
    setProblem(newProblem);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen px-4 py-12 transition-colors duration-300 bg-background-light dark:bg-background-dark sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            <h1 className="mb-8 text-4xl font-bold text-center text-text-light dark:text-text-dark">
              Coding Problems App
            </h1>
            <h2 className="mb-4 text-2xl font-bold text-text-light dark:text-text-dark">
              V2 Beta Release
            </h2>
            <GenerateProblemForm setProblem={handleSetProblem} />
            <ProblemDisplay problem={problem} />
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;