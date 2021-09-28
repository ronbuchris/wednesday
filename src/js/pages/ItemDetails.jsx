import { Component } from 'react';
import { connect } from 'react-redux';

import { loadItem, onPost } from '../store/actions/item.actions';
import { loadBoard } from '../store/actions/board.actions';
import { loadWorkspaceByBoardId } from '../store/actions/workspace.actions';
import { ItemUpdates } from '../cmps/item/ItemUpdates';
import { PostUpdate } from '../cmps/item/PostUpdate';

class _ItemDetails extends Component {
  async componentDidMount() {
    const { boardId, itemId } = this.props.match.params;
    await this.props.loadWorkspaceByBoardId(boardId)
    this.props.loadItem(boardId, itemId);
  }

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
export const ItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ItemDetails);
