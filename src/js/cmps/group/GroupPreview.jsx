import React from 'react';
import { ItemList } from '../item/ItemList';

export function GroupPreview({ group, onBlur, board }) {
  return (
    <div key={group.id} className="group-preview flex column">
      <div className="group-header flex">
        <div
          className="group-name flex align-center"
          style={{ color: group.style.color }}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => {
            onBlur(ev.target.innerText, group.title, group, 'group');
          }}
        >
          {group.title}
        </div>
        <div className="group-column-list flex">
          {board.cmpsOrder.map((cmp) => {
            return <div key={cmp}>{cmp}</div>;
          })}
        </div>
      </div>
      <div className="item-list">
        {group.items.map((item) => {
          return (
            <ItemList onBlur={onBlur} key={item.id} item={item} group={group} />
          );
        })}
      </div>
      <div className="item-add">+add</div>
    </div>
  );
}
