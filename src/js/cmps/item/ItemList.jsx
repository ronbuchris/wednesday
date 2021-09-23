import React from 'react'


export function ItemList({item}) {
    return (
        <div className="item-card">
            <p>{item.title}</p>
            <p style={{backgroundColor:item.status.bgcolor}}>{item.status.title}</p>
        </div>
    )
}


