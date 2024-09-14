import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

function ProblemDisplay({ problem }) {
  const [userCode, setUserCode] = React.useState('');

  if (!problem) {
    return <div className="mt-8 text-center text-gray-500">No problem generated yet.</div>;
  }

  const { problem_title, difficulty, language, problem_description, requirements, test_cases } = problem;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">{problem_title || 'Untitled Problem'}</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <p className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
          Difficulty: {difficulty || 'Not specified'}
        </p>
        <p className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
          Language: {language || 'Not specified'}
        </p>
      </div>
      <p className="mb-6 text-gray-600">{problem_description || 'No description available.'}</p>

      {requirements && (
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Requirements:</h3>
          <p className="text-gray-600">{requirements}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">Code Editor:</h3>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={setUserCode}
          value={userCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: '100%', height: '300px', borderRadius: '0.375rem' }}
        />
      </div>

      {test_cases && test_cases.length > 0 && (
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Test Cases:</h3>
          {test_cases.map((testCase, index) => (
            <div key={index} className="p-4 mb-4 rounded-md bg-gray-50">
              <p className="mb-1"><strong className="text-gray-700">Input:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">{testCase.input}</code></p>
              <p className="mb-1"><strong className="text-gray-700">Expected Output:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">{testCase.expectedOutput}</code></p>
              {testCase.explanation && (
                <p className="text-sm text-gray-600"><strong>Explanation:</strong> {testCase.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProblemDisplay;
