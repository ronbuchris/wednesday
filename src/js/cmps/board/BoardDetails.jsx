import { Component } from "react";
import { connect } from 'react-redux';

import { loadBoard } from '../../store/actions/board.actions';

class _BoardDetails extends Component {
    componentDidMount() {
        const { boardId } = this.props.match.params;
        const {workspaces} = this.props
        this.props.loadBoard(boardId, workspaces)
    }
    render() {
        const { board} = this.props
        console.log(board);
        if(!board) return <div className="">loading</div>
        return (
            <h1>{board.title}</h1>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        workspaces: state.workspacesModule.workspaces,
    };
}

const mapDispatchToProps = {
    loadBoard,
};
export const BoardDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardDetails);
