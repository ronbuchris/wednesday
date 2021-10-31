import { Component } from 'react';

import { BoardUpdatesList } from '../board/BoardUpdatesList';
import { ItemUpdatesList } from '../item/ItemUpdatesList';

// ReactDOM.render(<FroalaEditorComponent tag='textarea' />, document.getElementById('editor'));
export class ActivityUpdateTab extends Component {
  render() {
    const { item, board, onPost, toggleMenu, toggleMenus, onRemoveUpdate } = this.props;
    return (
      <div className="slide-panel-bottom">
        {item && (
          <ItemUpdatesList
            onRemoveUpdate={onRemoveUpdate}
            toggleMenus={toggleMenus}
            toggleMenu={toggleMenu}
            onPost={onPost}
            item={item}
          />
        )}
        {board && <BoardUpdatesList board={board} />}
      </div>
    );
  }
}
