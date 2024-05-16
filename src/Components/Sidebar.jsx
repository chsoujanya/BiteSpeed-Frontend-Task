import React from 'react';
import messageImg from '../Images/message.png'


//having draaging functionality so that a new node is created whenever we drag the message button
const Sidebar = ({ addNode }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', '');
  };

  return (
    <div style={{ marginTop:"-10px",position: 'fixed', top: 61, right: 0, height: '100vh', width: '200px', background: 'white', padding: '10px', borderLeft: '1px solid grey', borderTop: '1px solid grey'}}>
      <button
    style={{
      border: '1px solid darkblue',
      borderRadius: '5px',
      padding: '5px 10px',
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '10px',
      outline: 'none',
      textAlign: 'center',
      margin: "auto",
      width: "150px"
    }}
    draggable
    onDragStart={onDragStart}
    onClick={addNode}
>
<img src={messageImg} alt="message img" style={{ width: '30px', height: '30px' }} />


  <span style = {{ color: "darkblue"}}>Message</span>
</button>
    </div>
  );
};

export default Sidebar;
