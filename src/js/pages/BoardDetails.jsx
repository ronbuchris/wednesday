import React from 'react';
import { connect } from 'react-redux';

import { BoardContent } from '../cmps/board/BoardContent';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadBoard, onEditBoard } from '../store/actions/board.actions';
import { onEditGroup } from '../../js/store/actions/group.actions';
import { onEditItem } from '../../js/store/actions/item.actions';
import {
  loadWorkspaces,
  getWorkspaceByBoardId
} from '../store/actions/workspace.actions';

export class _BoardDetails extends React.Component {
    async componentDidMount() {
      //Load Workspaces
      //Load Workspace
      //Load Board = boardId from params(survive refresh) || board from store(clicked on Workspaces) || workspaces[0].boards[0]._id(first entry)
      
      // const { user } = this.props;
      // const workspaces = await this.props.loadWorkspaces(user);
      
      const boardId = this.props.match.params.boardId || this.props.board._id;
      await this.props.getWorkspaceByBoardId(boardId) 
    this.props.loadBoard(this.props.workspace, boardId);
  }

   componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.boardId!==this.props.match.params.boardId) {
       this.props.loadBoard(this.props.workspace,this.props.match.params.boardId);
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
      this.props.onEditItem(newType);
    }
  };

  render() {
    const { board } = this.props;
    if (!board) return <div className="loading">loading</div>;
    return (
      <div className="board-app flex">
        <WorkspaceNav />
        <div className="board-details">
          <BoardHeader board={board} onBlur={this.onBlur} />
          <BoardContent board={board} onBlur={this.onBlur} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
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
  getWorkspaceByBoardId
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
