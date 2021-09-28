import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { createItem } from '../services/item.service';
import { createGroup } from '../services/group.service';

import { loadBoard, onEditBoard } from '../store/actions/board.actions';
import {
  editGroup,
  setGroup,
  loadGroups,
} from '../../js/store/actions/group.actions';
import { onEditItem, addItem } from '../../js/store/actions/item.actions';
import {
  loadWorkspaces,
  getWorkspaceByBoardId,
  editWorkspace,
} from '../store/actions/workspace.actions';

export class _BoardDetails extends React.Component {
  async componentDidMount() {
    const boardId = this.props.match.params.boardId;
    await this.props.getWorkspaceByBoardId(boardId);
    await this.props.loadBoard(this.props.workspace, boardId);
    this.props.loadGroups(this.props.board);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params
    const { workspace } = this.props
    if (prevProps.match.params.boardId !== boardId) {
      await this.props.getWorkspaceByBoardId(boardId);
    }
    await this.props.loadBoard(workspace, boardId);
    await this.props.loadGroups(this.props.board);
  }

  onBlur = (newTxt, pevTxt, type, strType) => {
    if (newTxt === pevTxt) return;
    const newType =
      strType === 'boardDesc'
        ? { ...type, description: newTxt }
        : { ...type, title: newTxt };
    if (strType === 'board' || strType === 'boardDesc') {
      this.props.onEditBoard(newType);
    }
    if (strType === 'group') {
      this.onEditGroup(newType);
    }
    if (strType === 'item') {
      this.props.onEditItem(newType, null, this.props.workspace);
    }
  };

  onRemoveBoard = async (boardId) => {
    const { workspace, editWorkspace } = this.props;
    const newWorkspace = { ...workspace };
    const boardIdx = workspace.boards.findIndex(
      (board) => board._id === boardId
    );
    newWorkspace.boards.splice(boardIdx, 1);
    await editWorkspace(newWorkspace);
    this.props.history.push(`/board/${newWorkspace.boards[0]._id}`);
  };

  onAddItem = (newItemData, group, board, addToTop = false) => {
    const { workspace, user } = this.props;
    this.props.addItem(newItemData, user, workspace, group, board, addToTop);
  };

  onEditGroup = async(group) => {
    const { workspace, user, board } = this.props;
    await this.props.editGroup(workspace, board, group, user);
  };


  render() {
    const { workspace,board,groups} = this.props;
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
    user: state.userModule.user,
    workspace: state.workspaceModule.workspace,
    workspaces: state.workspaceModule.workspaces,
    board: state.boardModule.board,
    groups: state.groupModule.groups,
  };
}

const mapDispatchToProps = {
  loadWorkspaces,
  loadBoard,
  editGroup,
  onEditItem,
  onEditBoard,
  getWorkspaceByBoardId,
  setGroup,
  loadGroups,
  createItem,
  editWorkspace,
  addItem,
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
