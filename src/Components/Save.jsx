import React, { useState } from 'react';

const Save = ({ nodes, targetHandles }) => {
  const [message, setMessage] = useState(null);

  const handleSave = () => {
    if (nodes.length > 1) {
      const nodesWithEmptyTarget = nodes.filter((node) => {
        return node.data.label === '' || !targetHandles.includes(node.id);
      });
      if (nodesWithEmptyTarget.length > 1) {
        setMessage('Cannot save Flow');
        setTimeout(() => {
          setMessage(null);
        }, 5000); // Hide the message after 5 seconds
        return;
      }
    }
    // Implement save functionality here
    setMessage('Saved Flow');
    setTimeout(() => {
      setMessage(null);
    }, 5000); // Hide the message after 5 seconds
  };

  return (
    <div style={{ backgroundColor: '#ccc', padding: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'fixed', top: '0', right: '0', width: '100%',  }}>
      {message && (
        <div style={{ color: 'black', textAlign: 'center', width: 'fit-content', backgroundColor: '#edccd5', padding: '5px', borderRadius: '3px', margin: '0 auto' }}>
          <strong>{message}</strong>
        </div>
      )}
      <button
        style={{  color:"darkblue", lineHeight: '1px',outline: 'none',borderRadius: '3px', cursor: 'pointer', border: '1px solid darkblue', height: 30 }}
        onClick={handleSave}
      >
        Save
        
      </button>
    </div>
  );
};

export default Save;
