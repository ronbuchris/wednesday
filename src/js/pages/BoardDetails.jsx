import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { createItem } from '../services/item.service';

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
import { saveItem } from '../../js/store/actions/item.actions';
import {
  loadWorkspaceByBoardId,
  editWorkspace,
  loadWorkspace,
} from '../store/actions/workspace.actions';
import { ItemDetails } from './ItemDetails';
import { Screen } from './Screen';

export class _BoardDetails extends React.Component {
  async componentDidMount() {
    const boardId = this.props.match.params.boardId;
    await this.props.loadWorkspaceByBoardId(boardId);
    await this.props.loadBoard(this.props.workspace, boardId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    const { workspace } = this.props;
    if (prevProps.match.params.boardId !== boardId) {
      this.props.loadBoard(workspace, boardId);
    } else if (!workspace.boards.length) {
      this.props.loadWorkspace(workspace._id);
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
  };

  onEditBoard = (board) => {
    const { workspace, user, users, editBoard } = this.props;
    editBoard(workspace, board, user, users);
  };

  //Groups Functions
  onEditGroup = (group, groupId) => {
    const { workspace, user, board, editGroup } = this.props;
    editGroup(workspace, board, group, user, groupId);
  };

  //Items Functions
  onAddItem = (newItemData, group, addToTop = false) => {
    const { workspace, user, saveItem } = this.props;
    saveItem(newItemData, user, workspace, group, addToTop);
  };

  onEditItem = (item, group) => {
    const { workspace, user, saveItem } = this.props;
    saveItem(item, user, workspace, group);
  };

  isMenuOpen = () => {
    const { toggleMenus } = this.props;
    for (const menu of Object.keys(toggleMenus)) {
      if (toggleMenus[menu]) return true;
    }
    return false;
  };

  render() {
    const {
      workspace,
      board,
      groups,
      changeView,
      isViewChange,
      item,
      toggleMenus,
    } = this.props;
    if (!workspace || !board) return <div>loading</div>;
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
            onEditItem={this.onEditItem}
            isViewChange={isViewChange}
            onAddItem={this.onAddItem}
            onBlur={this.onBlur}
            groups={groups}
            board={board}
          />
          {item && <ItemDetails item={item} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
    isViewChange: state.boardModule.isViewChange,
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
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
  loadWorkspaceByBoardId,
  editWorkspace,
  loadWorkspace,
  //board
  removeBoard,
  loadBoard,
  editBoard,
  //group
  loadGroups,
  editGroup,
  setGroup,
  //item
  createItem,
  saveItem,
  changeView,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
