import React from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast'; // Import toast for notifications

function GenerateProblemForm({ setProblem }) {
  const [formData, setFormData] = React.useState({
    language: 'JavaScript',
    difficulty: 'Easy',
    problemType: 'Algorithm'
  });

  const generateProblemMutation = useMutation(async () => {
    const response = await fetch('https://backend.michaelvarnell.com:8000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }, {
    onSuccess: (data) => {
      console.log(data);
      setProblem(data);
      toast.success('Problem generated successfully!');
    },
    onError: (error) => {
      console.error('Error generating problem:', error);
      toast.error('Error generating problem. Please try again.');
    }
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateProblemMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="language" className="block mb-1 text-sm font-medium text-gray-700">
            Language:
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="JavaScript">JavaScript</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block mb-1 text-sm font-medium text-gray-700">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="problemType" className="block mb-1 text-sm font-medium text-gray-700">
            Problem Type:
          </label>
          <select
            id="problemType"
            value={formData.problemType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Algorithm">Algorithm</option>
            <option value="Data Structure">Data Structure</option>
            <option value="String Manipulation">String Manipulation</option>
            <option value="Array">Array</option>
            <option value="Object-Oriented">Object-Oriented</option>
            {/* Add more problem types as needed */}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={generateProblemMutation.isLoading}
        className="w-full px-4 py-2 mt-6 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
      >
        {generateProblemMutation.isLoading ? 'Generating...' : 'Generate Problem'}
      </button>
    </form>
  );
}

export default GenerateProblemForm;