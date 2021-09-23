import React from 'react';
import { ItemList } from '../item/ItemList';

export function GroupPreview({ group }) {
  return (
    <div className="group-preview">
      {group.title}
      <div className="items-container">
        {group.items.map((item) => {
          return <ItemList key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
