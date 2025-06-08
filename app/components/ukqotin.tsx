'use client';

import { useState } from 'react';
import { createClient } from '../api/supabase/client';

export default function UKQotin() {
  const [quote, setQuote] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('qod')
        .insert([{ quotes: quote, username: username }]);

      if (error) throw error;

      // Clear form after successful submission
      setQuote('');
      setUsername('');
      alert('Quote added successfully!');
    } catch (error) {
      console.error('Error adding quote:', error);
      alert('Failed to add quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Enter your quote..."
          className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          rows={3}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black rounded hover:opacity-80 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Quote'}
      </button>
    </form>
  );
}
