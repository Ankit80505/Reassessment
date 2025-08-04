
import React, { useState, useEffect } from 'react';

export default function App() {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState('');

  // Fetch existing tips on mount
  useEffect(() => {
    fetch('/api/tips')
      .then((res) => res.json())
      .then(setTips)
      .catch(console.error);
  }, []);

  // Submit a new tip
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTip.trim()) return;
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTip.trim() }),
      });
      const created = await res.json();
      setTips([created, ...tips]);
      setNewTip('');
    } catch (err) {
      console.error(err);
    }
  };

  // Upvote an existing tip
  const handleVote = async (id) => {
    try {
      await fetch(`/api/tips/${id}/vote`, { method: 'POST' });
      setTips(tips.map(t => t.id === id ? { ...t, votes: t.votes + 1 } : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Eco Tip Board</h1>

      <form onSubmit={handleSubmit} className="flex mb-6">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Share a green tip..."
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Post
        </button>
      </form>

      <ul>
        {tips.map((tip) => (
          <li
            key={tip.id}
            className="flex justify-between items-center border-b border-gray-200 py-3"
          >
            <span>{tip.text}</span>
            <button
              onClick={() => handleVote(tip.id)}
              className="flex items-center space-x-1 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a6 6 0 0111.122-2.121A4 4 0 0118 8a4 4 0 010 8h-1.5a3.5 3.5 0 00-3.5 3.5V20H6a4 4 0 01-4-4v-6z" />
              </svg>
              <span>{tip.votes}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
