import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { createItem } from '../services/item.service';
import { createGroup } from '../services/group.service';

import { loadBoard, onEditBoard } from '../store/actions/board.actions';
import {
  onEditGroup,
  setGroup,
  loadGroups,
} from '../../js/store/actions/group.actions';
import { onEditItem } from '../../js/store/actions/item.actions';
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
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
     await this.props.loadBoard(this.props.workspace,this.props.match.params.boardId);
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
      this.props.onEditGroup(newType);
    }
    if (strType === 'item') {
      this.props.onEditItem(newType, null, this.props.workspace);
    }
  };

  onRemoveBoard = (boardId) => {
    //get workspace from store
  };

  onAddItem = (newItemData, group, board, addToTop = false) => {
    const { editWorkspace, workspace, user } = this.props;
    const newWorkspace = { ...workspace };

    //create Item
    const newItem = createItem(newItemData, user);

    //add to groups Array
    const newGroup = {
      ...group,
      items: addToTop ? [newItem, ...group.items] : [...group.items, newItem],
    };

    //find group index
    const groupIdx = board.groups.findIndex(
      (group) => group.id === newGroup.id
    );

    // change group
    board.groups.splice(groupIdx, 1, newGroup);

    //find board index
    const boardIdx = workspace.boards.findIndex(
      (findBoard) => findBoard._id === board._id
    );
    // change board
    newWorkspace.boards.splice(boardIdx, 1, board);

    editWorkspace(newWorkspace);
  };

  onEditGroup = (group, boardId) => {
    const { editWorkspace, workspace, user, board } = this.props;
    const newWorkspace = { ...workspace };
    //get workspace from store
    if (group.id) {
      //
    } else {
      const newGroup = createGroup(user);
      const newBoard = { ...board, groups: [newGroup, ...board.groups] };
      const boardIdx = workspace.boards.findIndex(
        (board) => board._id === newBoard._id
      );
      newWorkspace.boards.splice(boardIdx, 1, newBoard);
      //copy NEW workspace
    }
    editWorkspace(newWorkspace);
  };

  onAddGroup = (newGroup, board) => {
    this.props.onEditGroup(newGroup, board);
  };

  render() {
    const { board, groups } = this.props;
    if (!board || !groups) return <div className="loader">loading...</div>;
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
  onEditGroup,
  onEditItem,
  onEditBoard,
  getWorkspaceByBoardId,
  setGroup,
  loadGroups,
  createItem,
  editWorkspace,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
