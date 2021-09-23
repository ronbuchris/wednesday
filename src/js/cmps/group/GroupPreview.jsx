import React from 'react';
import { ItemList } from '../item/ItemList';

export function GroupPreview({ group,onBlur }) {
  return (
    <div className="group-preview">
      <div className="items-container">
        {group.items.map((item) => {
          return <ItemList onBlur={onBlur} key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
