import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { eventBusService } from '../services/event-bus.service';
import { socketService } from '../services/socket.service';
import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';
import { ItemDetails } from './ItemDetails';

import {
  loadBoard,
  editBoard,
  removeBoard,
  changeView,
  toggleMenu,
} from '../store/actions/board.actions';
import {
  editGroup,
  setGroup,
  loadGroups,
} from '../../js/store/actions/group.actions';

import {
  saveItem,
  removeItem,
  toggleSelected,
  duplicateItems,
} from '../../js/store/actions/item.actions';
import {
  loadWorkspaceByBoardId,
  editWorkspace,
  loadWorkspace,
  loadWorkspaces,
  saveUndoWorkspace,
} from '../store/actions/workspace.actions';
import { getLoggedinUser, loadUsers } from '../store/actions/user.actions';
import { Screen } from './Screen';
import { ActivityLog } from './ActivityLog';
import { Loader } from '../cmps/Loader';
import { SelectedPopup } from '../cmps/SelectedPopup';

export class _BoardDetails extends React.Component {
  async componentDidMount() {
    const {
      getLoggedinUser,
      loadWorkspaces,
      loadWorkspaceByBoardId,
      loadUsers,
    } = this.props;
    await loadUsers();
    const boardId = this.props.match.params.boardId;
    if (!this.props.workspaces?.length) {
      await getLoggedinUser();
      await loadWorkspaces(this.props.user);
    }
    await loadWorkspaceByBoardId(boardId, this.props.workspaces);
    await this.props.loadBoard(this.props.workspace, boardId);
    document.title = `${this.props.board.title}`;
    socketService.emit('connect board', this.props.board._id);
    socketService.on('board updated', (socket) => {
      if (socket.boardId === boardId) {
        this.props.loadWorkspace(socket.workspace._id);
        this.props.loadBoard(socket.workspace, socket.boardId);
      }
    });
  }

  componentWillUnmount() {
    socketService.off('board updated');
  }

  async componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    const { workspace } = this.props;
    if (prevProps.match.params.boardId !== boardId) {
      await this.props.loadBoard(workspace, boardId);
      document.title = `${this.props.board.title}`;
    }
  }

  onBlur = (newTxt, pevTxt, type, strType, group = null) => {
    if (newTxt === pevTxt) return;
    const newType =
      strType === 'boardDesc'
        ? { ...type, description: newTxt }
        : { ...type, title: newTxt };

    switch (strType) {
      case 'boardDesc':
      case 'board':
        this.onEditBoard(newType);
        break;
      case 'group':
        this.onEditGroup(newType);
        break;
      case 'item':
        this.onEditItem(newType, group);
        break;
      default:
      // case 'column':
      //   this.onEditColumn(newType);
      //   break;
      // case 'label':
      //   this.onEditLabel(newType);
      //   break;
    }
  };

  //Boards Functions
  onRemoveBoard = (boardId) => {
    const { workspace, removeBoard, match } = this.props;
    removeBoard(workspace, boardId);
    if (!workspace.boards.length) {
      this.props.history.push(`/workspace/${workspace._id}`);
    } else if (match.params.boardId === boardId) {
      this.props.history.push(`/board/${workspace.boards[0]._id}`);
    }
    eventBusService.emit('user-msg', { txt: 'Board has removed', type: '' });
  };

  onEditBoard = (board) => {
    const { workspace, user, users, editBoard } = this.props;
    editBoard(workspace, board, user, users);
  };

  //Groups Functions
  onEditGroup = (group, groupId, newBoard, Duplicate) => {
    const { workspace, user, board, editGroup } = this.props;
    const boardToEdit = newBoard ? newBoard : board;
    editGroup(workspace, boardToEdit, group, user, groupId, Duplicate);
  };

  //Labels Functions
  // onEditLabel = (label, groupId, newBoard) => {
  //   const { workspace, user, board, editGroup } = this.props;

  // };

  //Items Functions
  onAddItem = (newItemData, group, addToTop = false, board, Duplicate) => {
    const { workspace, user, saveItem } = this.props;
    saveItem(newItemData, user, workspace, group, addToTop, board, Duplicate);
  };

  onEditItem = (item, group) => {
    const { workspace, user, saveItem, board } = this.props;
    saveItem(item, user, workspace, group, false, board);
  };

  onRemoveSelected = (group) => {};

  isMenuOpen = () => {
    const { toggleMenus } = this.props;
    for (const menu of Object.keys(toggleMenus)) {
      if (toggleMenus[menu]) return true;
    }
    return false;
  };

  render() {
    const {
      saveUndoWorkspace,
      toggleSelected,
      duplicateItems,
      selectedItems,
      toggleMenus,
      changeView,
      removeItem,
      workspace,
      currView,
      groups,
      board,
    } = this.props;
    if (!workspace || !board) return <Loader />;
    return (
      <div className="board-app flex">
        {this.isMenuOpen() && <Screen toggleMenus={toggleMenus} />}
        <WorkspaceNav
          onRemoveBoard={this.onRemoveBoard}
          changeView={changeView}
          workspace={workspace}
          board={board}
        />
        <div className="board-details">
          <BoardHeader
            onRemoveBoard={this.onRemoveBoard}
            onEditGroup={this.onEditGroup}
            onAddItem={this.onAddItem}
            changeView={changeView}
            onBlur={this.onBlur}
            board={board}
          />
          <BoardContent
            onEditGroup={this.onEditGroup}
            onEditBoard={this.onEditBoard}
            onEditItem={this.onEditItem}
            onAddItem={this.onAddItem}
            onBlur={this.onBlur}
            currView={currView}
            groups={groups}
            board={board}
          />
          {selectedItems.length ? (
            <SelectedPopup
              saveUndoWorkspace={saveUndoWorkspace}
              toggleSelected={toggleSelected}
              duplicateItems={duplicateItems}
              selectedItems={selectedItems}
              removeItem={removeItem}
              workspace={workspace}
              groups={groups}
              board={board}
            />
          ) : (
            ''
          )}
          <Route path="/board/:boardId/item/:itemId" component={ItemDetails} />
          <Route path="/board/:boardId/activity_log" component={ActivityLog} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
    selectedItems: state.itemModule.selectedItems,
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    currView: state.boardModule.currView,
    groups: state.groupModule.groups,
    board: state.boardModule.board,
    users: state.userModule.users,
    item: state.itemModule.item,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  toggleMenu,
  //workspace
  loadWorkspaces,
  loadWorkspaceByBoardId,
  editWorkspace,
  loadWorkspace,
  saveUndoWorkspace,
  //board
  removeBoard,
  loadBoard,
  editBoard,
  //group
  loadGroups,
  editGroup,
  setGroup,
  //item
  saveItem,
  changeView,
  removeItem,
  toggleSelected,
  duplicateItems,
  //USER
  getLoggedinUser,
  loadUsers,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
