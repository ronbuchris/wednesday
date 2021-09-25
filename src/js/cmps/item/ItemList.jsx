import React from 'react';

export function ItemList({ item, onBlur, group }) {
  return (
    <div className="item-preview">
      <div
        className="left-indicator"
        style={{ backgroundColor: group.style.color }}
      ></div>
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, item.title, item, 'item');
        }}
      >
        {item.title}
      </div>
      <div style={{ backgroundColor: item.status.bgcolor }}>
        {item.status.title}
      </div>
      <div className="left-indicator"></div>
    </div>
  );
}
