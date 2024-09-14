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
      <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">Coding Problems App</h1>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">V2 Beta Release</h2>
          <GenerateProblemForm setProblem={handleSetProblem} />
          <ProblemDisplay problem={problem} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;