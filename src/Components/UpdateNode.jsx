import React, { useState } from 'react';
import backIcon from '../Images/back.png'

const UpdateNode = ({ selectedNode, onUpdate, onBack }) => {
  const [name, setName] = useState(selectedNode.data.label);

  
//when the message for the node is changed
  const handleChange = (event) => {
    setName(event.target.value);
    onUpdate(event.target.value);
    
  };

  return (
    <div style={{ marginTop:"-10px",position: 'fixed', top: 61, right: 0, height: '100vh', width: '200px', background: 'white', padding: '10px', borderLeft: '1px solid grey', borderTop: '1px solid grey'}}>
      <div style={{ height: "10px",display: 'flex', alignItems: 'center', borderBottom: '1px solid black', padding: '10px 0' }}>
        <img
          src={backIcon}
          alt="Back"
          onClick={onBack}
          style={{
            borderRadius: '5px',
            marginRight: '5px',
            cursor: 'pointer',
            verticalAlign: 'middle', // Ensures the line appears complete
          }}
        />
        <p 
          style={{ margin: 0, cursor: 'default', textAlign: 'center', paddingBottom: '5px' }}
        >
          Message
        </p>
      </div>
      <p>Text</p>
      <textarea
        value={name}
        onChange={handleChange}
        style={{ width: '90%', height: '150px', padding: 'px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
  );
};


export default UpdateNode;
