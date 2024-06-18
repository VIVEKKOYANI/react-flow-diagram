// CustomNode.js
import React from 'react';
import { Handle } from 'reactflow';

const TextUpdaterNode = ({ data }) => {
  return (
    <div style={{ padding: 10, borderRadius: 5, backgroundColor: data.background }}>
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default TextUpdaterNode;
