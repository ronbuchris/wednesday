import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { loadItem, onPost } from '../store/actions/item.actions';
import { loadBoard } from '../store/actions/board.actions';
import { loadWorkspaceByBoardId } from '../store/actions/workspace.actions';
import { ItemUpdates } from '../cmps/item/ItemUpdates';
import { PostUpdate } from '../cmps/item/PostUpdate';

class _ItemDetails extends Component {

componentDidMount() {
  const { loadBoard, match, workspace} =this.props
  const {boardId} = match.params
  loadBoard(workspace, boardId)
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
    const { user, workspace, onPost, item, groups} =this.props;
    console.log(groups);
    onPost(update, user, item, groups, workspace);
    
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
    groups: state.groupModule.groups,
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
