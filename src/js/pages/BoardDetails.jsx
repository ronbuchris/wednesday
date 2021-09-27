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
import { onEditItem,addItem } from '../../js/store/actions/item.actions';
import {
  loadWorkspaces,
  getWorkspaceByBoardId,
  editWorkspace,
} from '../store/actions/workspace.actions';

export class _BoardDetails extends React.Component {
  async componentDidMount() {
    const boardId = this.props.match.params.boardId || this.props.board._id;
    await this.props.getWorkspaceByBoardId(boardId);
    await this.props.loadBoard(this.props.workspace, boardId);
    this.props.loadGroups(this.props.board);
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(`prevProps`, prevProps)
    const boardId = this.props.match.params.boardId;
    const {workspace}=this.props
    if(!prevProps.workspace || !workspace )return;
    const boardIdx = workspace.boards.findIndex(board => board._id === boardId);
    if (prevProps.match.params.boardId !== this.props.match.params.boardId || 
      prevProps.workspace.boards[boardIdx].groups.length !== workspace.boards[boardIdx].groups.length) {
      await this.props.getWorkspaceByBoardId(this.props.board._id);
      await this.props.loadBoard(workspace, this.props.match.params.boardId);
      await this.props.loadGroups(this.props.board);
    }
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

  onRemoveBoard = (boardId) => {
    const {workspace} = this.props;
    const newWorkspace= { ...workspace };
    const boardIdx= workspace.boards.findIndex(board=> board._id === boardId);
    newWorkspace.boards.splice(boardIdx, 1);
    editWorkspace(newWorkspace);
      this.props.history.push(`/board/${newWorkspace.boards[0]._id}`)
  };

  onAddItem = (newItemData, group, board, addToTop = false) => {
    const {workspace, user } = this.props;
    this.props.addItem(newItemData,user,workspace,group,board,addToTop)
  };

  onEditGroup = (group) => {
    const { workspace, user, board } = this.props;
    this.props.editGroup(workspace,board,group,user)
  };


  render() {
    const { board, groups } = this.props;
    if (!board || !groups) return <div className="loading">loading</div>;
    return (
      <div className="board-app flex">
        <WorkspaceNav onRemoveBoard={this.onRemoveBoard} />
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
    board: state.boardModule.board,
    group: state.groupModule.group,
    groups: state.groupModule.groups,
    workspace: state.workspaceModule.workspace,
    workspaces: state.workspaceModule.workspaces,
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
  addItem
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
