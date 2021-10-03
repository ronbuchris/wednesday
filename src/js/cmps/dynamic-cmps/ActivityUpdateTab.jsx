import { Component } from 'react';

export class ActivityUpdateTab extends Component{

    render(){
        const { item, board } = this.props
        if (!board && !item) return <div>loading</div>
        const updates = item ? item.updates : board.updates;
        if(!updates?.length) return <div>no updates yet</div>
        return (
            <div>activity Update tab</div>
            )
        }
}