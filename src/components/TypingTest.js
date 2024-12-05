'use client'
import React, { useState, useEffect } from 'react';


const TypingTest = () => {
  const [text] = useState("The quick brown fox jumps over the lazy dog. Typing tests help improve your speed and accuracy.");
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    errors: 0
  });

  const calculateStats = (currentInput) => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wordsTyped = currentInput.length / 5;
    const wpm = Math.round(wordsTyped / timeElapsed);

    let errors = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] !== text[i]) errors++;
    }

    const accuracy = Math.round(((currentInput.length - errors) / currentInput.length) * 100) || 100;

    setStats({ wpm, accuracy, errors });
  };

  const handleInput = (e) => {
    const newInput = e.target.value;
    if (!startTime) setStartTime(Date.now());
    
    setInput(newInput);
    calculateStats(newInput);

    if (newInput.length === text.length) {
      setShowStats(true);
    }
  };

  const resetTest = () => {
    setInput('');
    setStartTime(null);
    setShowStats(false);
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {!showStats ? (
          <>
            <div className="font-mono text-3xl leading-relaxed bg-black bg-opacity-50 p-6 rounded-lg">
              {text.split('').map((char, index) => {
                let color = 'text-gray-600';
                if (index < input.length) {
                  color = input[index] === char ? 'text-white' : 'text-red-400';
                }
                return (
                  <span key={index} className={color}>
                    {char}
                  </span>
                );
              })}
            </div>

            <textarea
              value={input}
              onChange={handleInput}
              className="w-full bg-transparent border-none font-mono text-3xl focus:outline-none focus:ring-0 text-white p-6 resize-none"
              rows={3}
              placeholder="start typing..."
              autoFocus
            />
          </>
        ) : (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-5 p-6 rounded-lg">
                <div className="text-4xl font-bold text-green-400">{stats.wpm}</div>
                <div className="text-sm text-gray-400 mt-2">WPM</div>
              </div>
              <div className="bg-white bg-opacity-5 p-6 rounded-lg">
                <div className="text-4xl font-bold text-green-400">{stats.accuracy}%</div>
                <div className="text-sm text-gray-400 mt-2">Accuracy</div>
              </div>
              <div className="bg-white bg-opacity-5 p-6 rounded-lg">
                <div className="text-4xl font-bold text-green-400">{stats.errors}</div>
                <div className="text-sm text-gray-400 mt-2">Errors</div>
              </div>
            </div>

            <button
              onClick={resetTest}
              className="px-8 py-3 bg-green-500 bg-opacity-20 hover:bg-opacity-30 text-green-400 rounded-lg transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;