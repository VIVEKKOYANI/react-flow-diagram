import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import Sidebar from "./Sidebar";
import NodePopover from "./NodePopover";
import TextUpdaterNode from "./TextUpdaterNode"; 
import "reactflow/dist/style.css";
import "./App.css";

const initialNodes = [];
const initialEdges = [];

const nodeTypes = { textUpdater: TextUpdaterNode };

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (connection) => {
      setEdges((prevEdges) => addEdge(connection, prevEdges));
    },
    [setEdges]
  );

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });
      const type = event.dataTransfer.getData("application/reactflow");

      const newNode = {
        id: `${new Date().getTime()}`,
        type: "textUpdater",
        position: reactFlowBounds,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
        style: {
          background:
            type === "rectangle"
              ? "blue"
              : type === "conditional"
              ? "orange"
              : "green",
          width: 150,
          height: 100,
          alignContent: 'center',
          color: 'white',
          clipPath: type === "rectangle"
          ? ""
          : type === "conditional"
          ? "polygon(48% 12%, 100% 50%, 48% 79%, 0% 50%)"
          : "polygon(25% 0%, 100% 0%, 75% 100%, 0 100%)",
        },
      };

      setNodes((es) => es.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeDoubleClick = (event, node) => {
    setSelectedNode(node);
    setPopoverPosition({ x: event.clientX, y: event.clientY });
  };

  const updateNode = (updatedNode) => {
    const newUpdateNode = {
      id: updatedNode.id,
      type: updatedNode.type,
      position: {
        x: updatedNode.position.x,
        y: updatedNode.position.y,
      },
      data: {
        label: updatedNode.data.label,
      },
      style: {
        background: updatedNode.style.background,
        width: Number(updatedNode.style.width),
        height: Number(updatedNode.style.width),
      },
      width: Number(updatedNode.style.width),
      height: Number(updatedNode.style.height),
      selected: true,
      positionAbsolute: {
        x: updatedNode.positionAbsolute.x,
        y: updatedNode.positionAbsolute.y,
      },
      dragging: false,
    };
    setNodes((els) =>
      els.map((el) => (el.id === updatedNode.id ? newUpdateNode : el))
    );
    setSelectedNode(null);
  };

  const handleClick = () => {
    if (selectedNode) {
      setSelectedNode(null);
    }
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={onLoad}
          onNodeDoubleClick={onNodeDoubleClick}
          onClick={handleClick}
          nodeTypes={nodeTypes}
          // fitView
        >
          <Background />
          <Controls />
          {/* <MiniMap /> */}
        </ReactFlow>
        {selectedNode && (
          <NodePopover
            node={selectedNode}
            onSubmit={updateNode}
            style={{ left: popoverPosition.x, top: popoverPosition.y }}
          />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default App;
