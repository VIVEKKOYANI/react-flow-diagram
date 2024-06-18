import React, { useState } from 'react';

const NodePopover = ({ node, onSubmit }) => {
  const [name, setName] = useState(node.data.label);
  const [color, setColor] = useState(node.style.background);
  const [height, setHeight] = useState(node.style.height);
  const [width, setWidth] = useState(node.style.width);
  console.log("node", node, color);

  const handleSubmit = () => {
    onSubmit({
      ...node,
      data: { ...node.data, label: name },
      style: { ...node.style, background: color, height, width },
    });
  };

  return (
    <div className="form-popup">
      <div className="form-container">

      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <label>Height:</label>
        <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        <label>Width:</label>
        <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} />
      </div>
      <button onClick={handleSubmit} class="btn">Submit</button>
      </div>
    </div>
  );
};

export default NodePopover;
