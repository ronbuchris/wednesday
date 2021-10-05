import { Component } from 'react';



import { BoardUpdatesList } from '../board/BoardUpdatesList';
import { ItemUpdatesList } from '../item/ItemUpdatesList';


// ReactDOM.render(<FroalaEditorComponent tag='textarea' />, document.getElementById('editor'));
export class ActivityUpdateTab extends Component {


  render() {
    const { item, board, onPost } = this.props;
    return (
      <div>
        {item && <ItemUpdatesList item={item} onPost={onPost} />}
        {board && <BoardUpdatesList board={board} />}
      </div>
    );
  }
}
