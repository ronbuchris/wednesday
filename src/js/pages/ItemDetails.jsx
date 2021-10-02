import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { loadItem, onPost } from '../store/actions/item.actions';
import { loadBoard } from '../store/actions/board.actions';
import { loadWorkspaceByBoardId } from '../store/actions/workspace.actions';
import { ItemUpdates } from '../cmps/item/ItemUpdates';
import { PostUpdate } from '../cmps/item/PostUpdate';
import { itemService } from '../services/item.service';

class _ItemDetails extends Component {

componentDidMount() {
  this.loadItem()
}

onCloseItem = () => {
  const { boardId } = this.props.match.params;
  this.props.history.push(`/board/${boardId}`);
};

loadItem =  () => {
  const {loadItem,board} = this.props;
  const {itemId } = this.props.match.params;
  loadItem(board, itemId);
};

  onPost = (update) => {
    const { user, workspace,onPost,item} =this.props;
    onPost(update, user, item, workspace);
    
  };

  render() {
    const { item } = this.props;
    if (!item ) return <div className="">loading</div>;
    return (
      <div>
        <h1>{item.title}</h1>
        <PostUpdate onPost={this.onPost} />
        <ItemUpdates updates={item.updates} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
    workspace: state.workspaceModule.workspace,
    item: state.itemModule.item,
  };
}

const mapDispatchToProps = {
  loadItem,
  loadWorkspaceByBoardId,
  loadBoard,
  onPost,
};
export const ItemDetails = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(_ItemDetails));
