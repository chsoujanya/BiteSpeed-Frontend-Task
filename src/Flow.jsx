import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, Handle } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Components/Sidebar';
import UpdateName from './Components/UpdateNode';
import { useCallback, useRef, useState, useMemo } from 'react';
import Save from './Components/Save';
import { ReactFlowProvider } from 'reactflow';
import whatsAppImg from './Images/whatsapp.png'
import messageImg from './Images/message.png'

const initialNodes = [

];

const initialEdges = [];


//create a node with the images and text
const CustomNode = ({ data }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: 4, width: "200px" }}>
      <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ccede7', borderBottom: "1px solid black" }}>
        <img src={messageImg} alt="message Image" style={{ width: 15, height: 15, marginLeft: 'auto', marginRight: 5 }} />
        <strong style={{ fontWeight: 'bold', marginRight: 5 }}> {data.heading}</strong>
        <img src={whatsAppImg} alt="whatsApp image" style={{ width: 20, height: 20, marginRight: 'auto', marginLeft: 5 }} />
      </div>
      <div style={{ padding: 10, marginTop: 5, background: 'white' }}>{data.label}</div>
      <Handle type="source" position="right" style={{ background: '#555' }} />
      <Handle type="target" position="left" style={{ background: '#555' }} />
    </div>
  );
};




//defing the node as a custom node
const nodeTypes = {
  custom: CustomNode,
};


//main component
export default function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [targetHandles, setTargetHandles] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  //to drag
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

//to drop and create a new node after dropping
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const newPosX = event.clientX - reactFlowBounds.left;
    const newPosY = event.clientY - reactFlowBounds.top;

    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'custom',
      data: { 
        heading: 'Send Message',label: `text message ${nodes.length + 1}` },
      position: { x: newPosX, y: newPosY },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };




  let sourceHandles = [];
  let targetHandle = [];


  //to connect the nodes
  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      // Check if source handle is already connected
      if (sourceHandles.includes(source)) return;
      sourceHandles = sourceHandles.concat(source);

      setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds));

      // Check if target handle is already connected
      if (targetHandle.includes(target)) return;
      targetHandle = targetHandle.concat(target);
      setTargetHandles(targetHandle);
    },
    [setEdges]
  );

//update the node name
const updateNodeName = (name) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, label: name } } : n
      )
    );
  };


  //handle when the the node is clicked
  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };


  //handlewhen the back button is clicked
  const handleBackClick = () => {
    setSelectedNode(null);
  };




  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ flex: 1, height: '100%', position: 'relative' }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
            <Save nodes={nodes} targetHandles={targetHandles} />
          </div>
        </div>
        {selectedNode ? (
          <UpdateName selectedNode={selectedNode} onUpdate={updateNodeName} onBack={handleBackClick} />
        ) : (
          <div>
            <Sidebar addNode={onDrop} />
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
}
