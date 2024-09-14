import React from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { RefreshCcw } from 'lucide-react';

function GenerateProblemForm({ setProblem }) {
  const [formData, setFormData] = React.useState({
    language: 'JavaScript',
    difficulty: 'Easy',
    problemType: 'Fundamentals',
  });

  const generateProblemMutation = useMutation(
    async () => {
      const response = await fetch('https://backend.michaelvarnell.com:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setProblem(data);
        toast.success('Problem generated successfully!');
      },
      onError: (error) => {
        console.error('Error generating problem:', error);
        toast.error('Error generating problem. Please try again.');
      },
    }
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateProblemMutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-8 transition-colors duration-300 rounded-lg shadow-md bg-card-light dark:bg-card-dark"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Language Select */}
        <div>
          <label htmlFor="language" className="block mb-1 text-sm font-medium text-text-light dark:text-text-dark">
            Language:
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 transition-colors duration-300 border border-gray-300 rounded-md text-text-light dark:text-text-dark dark:border-gray-600 bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {/* Difficulty Select */}
        <div>
          <label htmlFor="difficulty" className="block mb-1 text-sm font-medium text-text-light dark:text-text-dark">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full px-3 py-2 transition-colors duration-300 border border-gray-300 rounded-md text-text-light dark:text-text-dark dark:border-gray-600 bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          >
            <option value="Very Easy">Very Easy</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Problem Type Select */}
        <div>
          <label htmlFor="problemType" className="block mb-1 text-sm font-medium text-text-light dark:text-text-dark">
            Problem Type:
          </label>
          <select
            id="problemType"
            value={formData.problemType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 transition-colors duration-300 border border-gray-300 rounded-md text-text-light dark:text-text-dark dark:border-gray-600 bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          >
            <option value="Fundamentals">Fundamentals</option>
            <option value="Loops">Loops</option>
            <option value="Conditionals">Conditionals</option>
            <option value="Functions">Functions</option>
            <option value="String Manipulation">String Manipulation</option>
            <option value="Arrays">Arrays</option>
            <option value="Array Methods">Array Methods</option>
            <option value="Data Structure">Data Structure</option>
            <option value="Object-Oriented">Object-Oriented</option>
            {/* Add more problem types as needed */}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={generateProblemMutation.isLoading}
        className="flex items-center justify-center w-full px-4 py-2 mt-6 text-white transition-colors rounded-md bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-opacity-50 disabled:bg-primary-light dark:disabled:bg-primary-dark"
      >
        {generateProblemMutation.isLoading ? (
          <>
            <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            Generate Problem
          </>
        )}
      </button>
    </form>
  );
}

export default GenerateProblemForm;