import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GenerateProblemForm from './components/GenerateProblemForm';
import ProblemDisplay from './components/ProblemDisplay';

const queryClient = new QueryClient();

function App() {
  const [problem, setProblem] = React.useState(null);

  const handleSetProblem = (newProblem) => {
    console.log('Setting new problem:', newProblem);
    setProblem(newProblem);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Coding Problem Generator</h1>
          <GenerateProblemForm setProblem={handleSetProblem} />
          <ProblemDisplay problem={problem} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;