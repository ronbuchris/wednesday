import { Component } from 'react';
import { connect } from 'react-redux';

import { loadItem, onPost } from '../store/actions/item.actions';
import { loadBoard } from '../store/actions/board.actions';
import { loadWorkspaceByBoardId } from '../store/actions/workspace.actions';
import { ItemUpdates } from '../cmps/item/ItemUpdates';
import { PostUpdate } from '../cmps/item/PostUpdate';

class _ItemDetails extends Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    const { loadWorkspaceByBoardId } = this.props;
    loadWorkspaceByBoardId(boardId);
  }

  getItem = () => {
    const { workspace } = this.props;
    const { itemId, boardId } = this.props.match.params;
    const boardIdx = workspace.boards.findIndex(
      (board) => board._id === boardId
    );
    const board = workspace.boards[boardIdx];
    const group = board.groups.find((group) =>
      group.items.map((item) => {
        return item.id === itemId;
      })
    );
    const item = group.items.find((item) => item.id === itemId);
    return item;
  };

  onPost = async (update) => {
    const { user, workspace, history, onPost, match } = this.props;
    const { boardId, itemId } = match.params;
    const item = this.getItem();
    await onPost(update, user, item, workspace);
    loadWorkspaceByBoardId(boardId);
    history.push(`/board/${boardId}/item/${itemId}`);
  };
  render() {
    const { workspace } = this.props;
    if (!workspace) return <div className="">loading</div>;
    const item = this.getItem();
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
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  loadItem,
  loadWorkspaceByBoardId,
  loadBoard,
  onPost,
};
export const ItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ItemDetails);
