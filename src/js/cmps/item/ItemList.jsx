import React from 'react';
import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import { ItemColumn } from './ItemColumn';

export function ItemList({ item, onBlur, group }) {
  return (
    <div className="item-preview flex">
      <div
        className="left-indicator"
        style={{ backgroundColor: group.style.color }}
      ></div>
      <div
        className="item-title flex space-between"
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, item.title, item, 'item');
        }}
      >
        <div className="item-title-text">{item.title}</div>
        <AddUpdate />
      </div>
      <div className="item-column-list flex">
        {item.columns.map((column) => {
          console.log(`item`, item);
          return <ItemColumn column={column} item={item} />;
        })}
      </div>
      <div className="left-indicator"></div>
    </div>
  );
}
