import React from 'react';
import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import { ItemColumn } from './ItemColumn';

export function ItemPreview({ item, onBlur, group, board }) {
  return (
    <div className="item-preview flex">
      <div
        className="indicator"
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
        {item.columns.map((column, idx) => {
          return (
            <ItemColumn key={idx} board={board} column={column} item={item} />
          );
        })}
      </div>
      <div className="indicator"></div>
    </div>
  );
}
