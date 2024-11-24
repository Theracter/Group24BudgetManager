import React, { useState } from 'react';
import './NewExpense.css'

const Textarea: React.FC = () => {
  // State to store the value of the textarea
  const [text, setText] = useState<string>(''); // Initial value is an empty string

  // Event handler to update the state when the textarea changes
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <textarea
        id = 'notes'
        value={text} // The value of the textarea comes from the state
        onChange={handleChange} // Update state on input change
        placeholder="Type something..."
      />
    </div>
  );
};

export default Textarea;
