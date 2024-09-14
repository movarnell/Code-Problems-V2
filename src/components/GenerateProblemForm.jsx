import React from 'react';
import { useMutation } from 'react-query';
import { OpenAI } from 'openai';
import toast from 'react-hot-toast'; // Import toast for notifications

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

function GenerateProblemForm({ setProblem }) {
  const [formData, setFormData] = React.useState({
    language: 'JavaScript',
    difficulty: 'Easy',
    problemType: 'Algorithm'
  });

  const generateProblemMutation = useMutation(async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: "Act as a educator. Create a coding problem using the users desired language, difficulty level, and type of problem. Create some text cases with input, output, explanation. Test cases can vary in the number returned. Return JSON with the following properties: problem_title, difficulty, language, problem_description, requirements, test_cases = [{input: string, expectedOutput: string, explanation: string}]"
        },
        {
          role: "user",
          content: `Generate a ${formData.problemType} problem in ${formData.language} at a ${formData.difficulty} difficulty. Provide an appropriate number of test cases if applicable for the type of problem.`
        }
      ],
      temperature: 1,
      max_tokens: 2714,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return JSON.parse(response.choices[0].message.content);
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
