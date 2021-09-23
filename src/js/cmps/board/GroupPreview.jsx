import React from 'react'
import { ItemList } from './ItemList'

export function GroupPreview({group}) {
    return (
        <div>
        {group.title}
        <div className="items-container">
            {group.items.map(item=>{
              return <ItemList key={item.id} item={item} />
            })}

        </div>
        </div>
    )
}


