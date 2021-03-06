import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { loadItem, onPost, saveItem} from '../store/actions/item.actions';
import { loadBoard } from '../store/actions/board.actions';
import { loadWorkspaceByBoardId } from '../store/actions/workspace.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';
import { ActivityUpdateTab } from '../cmps/dynamic-cmps/ActivityUpdateTab';
import { ActivityLogTab } from '../cmps/dynamic-cmps/ActivityLogTab';
import { toggleMenu } from '../store/actions/board.actions';
import Drag from 'monday-ui-react-core/dist/icons/Drag';

class _ItemDetails extends Component {
  state = {
    toggleNav: true,
  };

  async componentDidMount() {
    const { loadBoard, match, workspace, board } = this.props;
    const { boardId } = match.params;
    await loadBoard(workspace, boardId);
    this.loadItem();
    document.title = `${board.title} - ${this.props.item.title}`;
  }


  async componentDidUpdate(prevProps, prevState) {
    const { loadBoard, match, workspace, board } = this.props;
    const { boardId } = match.params;
    this.loadItem()
    if (prevProps.match.params.boardId !== boardId) {
      await loadBoard(workspace, boardId);
      document.title = `${board.title} - ${this.props.item.title}`;
    }
  }

  onCloseItem = () => {
    const { boardId } = this.props.match.params;
    this.props.history.push(`/board/${boardId}`);
  };

  loadItem = () => {
    const { loadItem, board } = this.props;
    const { itemId } = this.props.match.params;
    loadItem(board, itemId);
  };

  onPost = (update) => {
    const { user, workspace, onPost, item, groups, board } = this.props;
    onPost(update, user, item, board, workspace);
  };

  onToggle = (bool) => {
    this.setState({ toggleNav: bool });
  };

  onRemoveUpdate = (item, updateIdx) => {
    const { user, workspace, board, saveItem} = this.props
    const group = board.groups.find(group => {
      return group.items.find(gItem => gItem.id === item.id)
    })
    item.updates.splice(updateIdx,1)
    const newItem = JSON.parse(JSON.stringify(item));
    saveItem(newItem, user, workspace, group, false, board, null)
  }
  render() {
    const { toggleMenu, toggleMenus, item, board } = this.props;
    const { toggleNav } = this.state;
    if (!item) return <div className="">loading</div>;
    return (
      <div className="item-activity slide-panel flex column">
        <div className="slide-panel-resizer">
          <div className="drag-resizer">
            <Drag />
          </div>
        </div>
        <div className="activity-log-header">
          <div className="activity-log-close btn">
            <Close
              onClick={() => {
                toggleMenu(toggleMenus);
                this.props.history.push(`/board/${board._id}`);
              }}
            />
          </div>
          <div className="activity-title flex">{item.title}</div>
          <div className="tabs-wrapper flex">
            <div
              className={`item-activity-update btn ${
                toggleNav && 'is-selected'
              }`}
              onClick={(ev) => {
                ev.preventDefault();
                this.onToggle(true);
              }}
            >
              Update
            </div>
            <div
              className={`item-activity-log btn ${!toggleNav && 'is-selected'}`}
              onClick={(ev) => {
                ev.preventDefault();
                this.onToggle(false);
              }}
            >
              Activity Log
            </div>
          </div>
        </div>
        {toggleNav ? (
          <ActivityUpdateTab
            toggleMenu={toggleMenu}
            toggleMenus={toggleMenus}
            onRemoveUpdate={this.onRemoveUpdate}
            item={item}
            onPost={this.onPost}
          />
        ) : (
          <ActivityLogTab item={item} />
        )}
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
    toggleMenus: state.workspaceModule.toggleMenus,
  };
}

const mapDispatchToProps = {
  loadItem,
  loadWorkspaceByBoardId,
  loadBoard,
  onPost,
  toggleMenu,
  saveItem
};
export const ItemDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_ItemDetails)
);
