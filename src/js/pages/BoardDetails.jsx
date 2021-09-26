import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { createItem } from '../services/item.service';

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

    console.log('remove');
  };

  onAddItem = (newItemData, group, board, addToTop = false) => {
    const { editWorkspace, workspace, user } = this.props;
    const newWorkspace = { ...workspace };
    console.log(`newItemData`, newItemData);
    console.log(`group`, group);
    console.log(`board`, board);

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

    //change board
    // workspace.boards.splice(boardIdx, 1, newBoard)

    //find board index
    const boardIdx = workspace.boards.findIndex(
      (findBoard) => findBoard.id === board.id
    );
    // change board
    newWorkspace.boards.splice(boardIdx, 1, board);

    // console.log(`board`, board);
    // const newWorkspace = {
    //   ...workspace,
    //   boards: [...workspace.boards, board],
    // };

    //     groups: [{...board.groups,
    //       group: [...group, newItem]}]]
    // };

    editWorkspace(newWorkspace);
    // await this.props.onEditItem(newItem, group.id, this.props.workspace);
    // await this.props.setGroup(group);
    // this.props.loadBoard(this.props.workspace, this.props.match.params.boardId);
  };

  onEditGroup = (group, boardId) => {
    //get workspace from store
    if (group.id) {
      //
    } else {
      // newGroup = createGroup(group)
      //copy NEW workspace
    }
    // editWorkspace(newWorkspace)
  };

  onAddGroup = (newGroup, board) => {
    this.props.onEditGroup(newGroup, board);
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
            onAddGroup={this.onAddGroup}
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
