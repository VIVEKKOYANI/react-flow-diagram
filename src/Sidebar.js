import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div
        className="dndnode rectangle"
        onDragStart={(event) => onDragStart(event, 'rectangle')}
        draggable
      >
        Rectangle Node
      </div>
      <div
        className="dndnode conditional"
        onDragStart={(event) => onDragStart(event, 'conditional')}
        draggable
      >
        Conditional Node
      </div>
      <div
        className="dndnode iteration"
        onDragStart={(event) => onDragStart(event, 'iteration')}
        draggable
      >
        Iteration Node
      </div>
    </aside>
  );
};

export default Sidebar;
