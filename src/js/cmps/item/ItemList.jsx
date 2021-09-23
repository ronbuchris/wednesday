import React from 'react'


export function ItemList({item,onBlur}) {
    return (
        <div className="item-card">
            <div contentEditable="true"
           suppressContentEditableWarning={true}
           onBlur={(ev)=>{
            onBlur(ev.target.innerText,item.title,item,'item');
          }}
           >{item.title}</div>
            <div style={{backgroundColor:item.status.bgcolor}}>{item.status.title}</div>
        </div>
    )
}


