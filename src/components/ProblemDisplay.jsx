import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Play } from 'lucide-react';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-typescript';

import 'ace-builds/src-noconflict/theme-vibrant_ink';

function ProblemDisplay({ problem }) {
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset state when a new problem is generated
  useEffect(() => {
    setUserCode('');
    setFeedback('');
    setResults([]);
  }, [problem]);

  if (!problem) {
    return <div className="mt-8 text-center text-text-light dark:text-text-dark">No problem generated yet.</div>;
  }

  const { problem_title, difficulty, language, problem_description, requirements, test_cases } = problem;

  const handleRunCode = async () => {
    setLoading(true);
    console.log('Running code:', userCode);
    console.log('Problem:', problem);

    const response = await fetch('https://backend.michaelvarnell.com:8000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userCode, problem }),
    });

    const text = await response.text();
    console.log('Response Status:', response.status);
    console.log('Raw response:', text);

    if (!response.ok) {
      console.error('Network response was not ok:', response.status, text);
      return;
    }

    try {
      const data = JSON.parse(text);
      console.log('Code execution result:', data);
      setFeedback(data.feedback);
      setResults(data.results);
      setLoading(false);

      data.results.forEach((result) => {
        console.log(`Test Case: ${result.testCase}`);
        console.log(`Expected Output: ${result.expectedOutput}`);
        console.log(`Actual Output: ${result.actualOutput}`);
        console.log(`Passed: ${result.passed}`);
      });
    } catch (error) {
      setLoading(false);
      console.error('Error parsing JSON:', error.message);
      console.error('Response text:', text);
    }
  };

  return (
    <div className="p-6 transition-colors duration-300 rounded-lg shadow-md bg-card-light dark:bg-card-dark">
      <h2 className="mb-4 text-2xl font-bold text-text-light dark:text-text-dark">
        {problem_title || 'Untitled Problem'}
      </h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <p className="px-3 py-1 text-sm font-semibold text-white rounded-full dark:text-blue-100 bg-primary-light dark:bg-primary-dark">
          Difficulty: {difficulty || 'Not specified'}
        </p>
        <p className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
          Language: {language || 'Not specified'}
        </p>
      </div>
      <p className="mb-6 text-text-light dark:text-text-dark">
        {problem_description || 'No description available.'}
      </p>

      {requirements && requirements.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-text-light dark:text-text-dark">Requirements:</h3>
          <ul className="list-disc list-inside text-text-light dark:text-text-dark">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-text-light dark:text-text-dark">Code Editor:</h3>
        <AceEditor
          mode={language.toLowerCase()}
          theme="vibrant_ink"
          onChange={setUserCode}
          value={userCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={"1.15em"}
          setOptions={{
            enableAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
          className="overflow-hidden rounded-md"
          style={{ width: '100%', height: '300px', borderRadius: '0.375rem', border: '1px solid #4b5563' }} // Tailwind Gray-700
        />
        <button
          onClick={handleRunCode}
          className="flex items-center justify-center px-4 py-2 mt-4 text-white transition-colors duration-300 rounded bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light"
        >
          {loading ? (
            <div className="mr-2 loader"></div> // Add a loader spinner here
          ) : (
            <Play className="w-5 h-5 mr-2" />
          )}
          Run Code
        </button>
      </div>

      {feedback && (
        <div className="mt-4 text-lg font-semibold text-text-light dark:text-text-dark">
          <h3 className="text-2xl font-bold">Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-2xl font-semibold text-text-light dark:text-text-dark">Test Results:</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 mb-4 rounded-md ${
                result.passed ? 'bg-green-100 dark:bg-green-700' : 'bg-red-100 dark:bg-red-700'
              } transition-colors duration-300`}
            >
              <p className="mb-1">
                <strong className="text-text-light dark:text-white">Test Case:</strong> {result.testCase}
              </p>
              <p className="mb-1">
                <strong className="text-text-light dark:text-white">Expected Output:</strong> {result.expectedOutput}
              </p>
              <p className="mb-1">
                <strong className="text-text-light dark:text-white">Actual Output:</strong> {result.actualOutput}
              </p>
              <p className={`font-semibold ${result.passed ? 'text-green-600 dark:text-green-400 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                {result.passed ? 'Passed' : 'Failed'}
              </p>
            </div>
          ))}
        </div>
      )}

      {test_cases && test_cases.length > 0 && results.length < 1 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-text-light dark:text-text-dark">Test Cases:</h3>
          {test_cases.map((testCase, index) => (
            <div key={index} className="p-4 mb-4 transition-colors duration-300 rounded-md bg-gray-50 dark:bg-gray-700">
              <p className="mb-1">
                <strong className="text-text-light dark:text-text-dark">Input:</strong>{' '}
                <code className="bg-gray-200 dark:bg-gray-600 dark:text-white px-1 py-0.5 rounded">
                  {JSON.stringify(testCase.input)}
                </code>
              </p>
              <p className="mb-1">
                <strong className="text-text-light dark:text-text-dark">Expected Output:</strong>{' '}
                <code className="bg-gray-200 dark:bg-gray-600 dark:text-white px-1 py-0.5 rounded">
                  {JSON.stringify(testCase.expectedOutput)}
                </code>
              </p>
              {testCase.explanation && (
                <p className="text-sm text-text-light dark:text-white">
                  <strong>Explanation:</strong> {testCase.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProblemDisplay;