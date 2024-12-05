'use client'
import React, { useState } from 'react';

const TypingTest = () => {
  const [text] = useState("The quick brown fox jumps over the lazy dog. Typing tests help improve your speed and accuracy.");
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [lastError, setLastError] = useState(false);
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
    const isError = newInput.length > 0 && newInput[newInput.length - 1] !== text[newInput.length - 1];
    
    if (isError !== lastError) {
      setLastError(isError);
    }

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
    setLastError(false);
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4">
        {!showStats ? (
          <>
            <div className="font-mono text-3xl leading-relaxed overflow-hidden">
              {text.split('').map((char, index) => {
                let classes = 'inline-block';
                
                if (index === input.length) {
                  classes += ' relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-green-400';
                }
                
                if (index < input.length) {
                  if (input[index] === char) {
                    classes += ' text-green-400';
                  } else {
                    classes += ' text-red-400 animate-shake';
                  }
                } else {
                  classes += ' text-gray-600';
                }
                
                return (
                  <span key={index} className={classes}>
                    {char}
                  </span>
                );
              })}
            </div>

            <textarea
              value={input}
              onChange={handleInput}
              className="w-full mt-8 bg-transparent border-none font-mono text-3xl focus:outline-none focus:ring-0 text-green-400 resize-none overflow-hidden"
              rows={1}
              placeholder="start typing..."
              autoFocus
            />
          </>
        ) : (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-5 p-3 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{stats.wpm}</div>
                <div className="text-xs text-gray-400 mt-1">WPM</div>
              </div>
              <div className="bg-white bg-opacity-5 p-3 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{stats.accuracy}%</div>
                <div className="text-xs text-gray-400 mt-1">Accuracy</div>
              </div>
              <div className="bg-white bg-opacity-5 p-3 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{stats.errors}</div>
                <div className="text-xs text-gray-400 mt-1">Errors</div>
              </div>
            </div>

            <button
              onClick={resetTest}
              className="px-6 py-2 text-base bg-green-500 bg-opacity-20 hover:bg-opacity-30 text-green-400 rounded-lg transition-all"
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