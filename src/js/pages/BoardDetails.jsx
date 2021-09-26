import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

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
} from '../store/actions/workspace.actions';

export class _BoardDetails extends React.Component {
  async componentDidMount() {
    const boardId = this.props.match.params.boardId || this.props.board._id;
    await this.props.getWorkspaceByBoardId(boardId);
    await this.props.loadBoard(this.props.workspace, boardId);
    this.props.loadGroups(this.props.board);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.props.loadBoard(
        this.props.workspace,
        this.props.match.params.boardId
      );
      this.props.loadGroups(this.props.board);
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

  onAddItem = async (newItem, group) => {
    await this.props.onEditItem(newItem, group.id, this.props.workspace);
    await this.props.setGroup(group);
    this.props.loadBoard(this.props.workspace, this.props.match.params.boardId);
  };

  onAddGroup = async (newGroup, board) => {
    await this.props.onEditGroup(newGroup, board);
  };

  render() {
    const { board, groups } = this.props;
    if (!board || !groups) return <div className="loading">loading</div>;
    return (
      <div className="board-app flex">
        <WorkspaceNav />
        <div className="board-details">
          <BoardHeader
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
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
