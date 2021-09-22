import { Component } from "react";
import { connect } from 'react-redux';

import { loadBoard } from '../../store/actions/board.actions';

class _BoardDetails extends Component {
    componentDidMount() {
        const {boardId} = this.props.match.params.boardId;
        this.props.loadBoard(boardId)
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    };
}

const mapDispatchToProps = {
    loadBoard,
};
export const BoardDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardDetails);
