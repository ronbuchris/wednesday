import { Component } from 'react';
import { BoardUpdatesList } from '../board/BoardUpdatesList';
import { ItemUpdatesList } from '../item/ItemUpdatesList';
export class ActivityUpdateTab extends Component{
    render(){
        const { item, board, onPost} = this.props
        if (!board && !item) return <div>loading</div>
        return (
            <div>
                {item && <ItemUpdatesList item={item} onPost={onPost}/>}
                {board && <BoardUpdatesList board={board}/>}
            </div>
            )
        }
}