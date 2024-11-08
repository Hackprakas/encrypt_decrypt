"use client"

import { useEffect, useState } from 'react';
import { getname } from '../../../actions/actions1';

export default function HomePage() {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    setStatus('');
    setProgress(0);

    try {
      const response = await fetch('/api/stre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          const update = JSON.parse(line);
          console.log("here we go");
            console.log(update);

          if (update.error) {
            setError(update.error);
            setIsProcessing(false);
            return;
          }

          setStatus(update.status);
          setProgress(update.progress);
        }
      }
    } catch (err) {
      setError('Failed to process: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <button 
          type="submit"
          disabled={isProcessing}
          className={`w-full px-4 py-2 rounded text-white transition-colors
            ${isProcessing 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isProcessing ? 'Processing...' : 'Start Process'}
        </button>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {status && !error && (
          <div className="space-y-2">
            <p className="text-gray-700">{status}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-right">
              {progress}%
            </p>
          </div>
        )}
      </form>
    </div>
  );
}