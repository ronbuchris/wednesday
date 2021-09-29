import React from 'react';
import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import { ItemColumn } from './ItemColumn';
import { Link } from 'react-router-dom';

export function ItemPreview({ item, onBlur, group, board, onRemoveItem }) {
  return (
    <div className="item-preview flex">
      <div className="item-menu" onClick={() => onRemoveItem(item.id)}>
        delete
      </div>
      <div
        className="indicator"
        style={{ backgroundColor: group.style.color }}
      ></div>
      <div
        className="item-title flex space-between cell-cmp"
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, item.title, item, 'item', group);
        }}
      >
        <div className="item-title-text">{item.title}</div>
        <Link to={`/board/${board._id}/item/${item.id}`}>
          <AddUpdate />
        </Link>
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
