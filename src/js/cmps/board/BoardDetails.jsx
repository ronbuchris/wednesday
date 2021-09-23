import { Component } from 'react';
import { connect } from 'react-redux';

import { loadBoard } from '../../store/actions/board.actions';
import { WorkspaceNav } from '../WorkspaceNav';
import { GroupPreview } from './GroupPreview';

class _BoardDetails extends Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(this.props.workspace, boardId);
  }
  componentDidUpdate() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(this.props.workspace, boardId);
  }

  render() {
    const { board } = this.props;
    console.log(board);
    if (!board) return <div className="">loading</div>;
    return (
      <div className="groups-container">
        <WorkspaceNav />
        {board.groups.map((group) => {
          return <GroupPreview key={group.id} group={group} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  loadBoard,
};
export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
