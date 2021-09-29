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
} from '../store/actions/workspace.actions';

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
      // await this.props.getWorkspaceByBoardId(boardId);
      this.props.loadBoard(workspace, boardId);
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
      // case 'column':
      //   this.onEditColumn(newType);
      //   break;
    }
  };

  //Boards Functions
  onRemoveBoard = (boardId) => {
    const { workspace, removeBoard, match } = this.props;
    const newWorkspace = { ...workspace };
    removeBoard(workspace, boardId);
    if (match.params.boardId === boardId) {
      this.props.history.push(`/board/${newWorkspace.boards[0]._id}`);
    }
  };

  onEditBoard = (board) => {
    const { workspace, user, users, editBoard } = this.props;
    editBoard(workspace, board, user, users);
  };

  //Groups Functions
  onEditGroup = (group) => {
    const { workspace, user, board, editGroup } = this.props;
    editGroup(workspace, board, group, user);
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

  render() {
    const { workspace, board, groups } = this.props;
    if (!workspace || !board) return <div>loading</div>;

    return (
      <div className="board-app flex">
        <WorkspaceNav
          board={board}
          workspace={workspace}
          onRemoveBoard={this.onRemoveBoard}
        />
        <div className="board-details">
          <BoardHeader
            onRemoveBoard={this.onRemoveBoard}
            onEditGroup={this.onEditGroup}
            onAddItem={this.onAddItem}
            board={board}
            onBlur={this.onBlur}
          />
          <BoardContent
            onAddItem={this.onAddItem}
            groups={groups}
            board={board}
            onBlur={this.onBlur}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    groups: state.groupModule.groups,
    board: state.boardModule.board,
    users: state.userModule.users,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  //workspace
  loadWorkspaceByBoardId,
  editWorkspace,
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
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);

//IF-NEED

//   const boardId = await this.props.match.params.boardId;
//   if(!prevProps.workspace || !workspace )return;
//   // if(!workspace.boards.includes(boardId))return;
//   const boardIdx = await workspace.boards.findIndex(board => board._id === boardId);
//   if(boardIdx === -1)return;
