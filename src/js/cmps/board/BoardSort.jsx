import { Component } from 'react';
import { connect } from 'react-redux';

import { onSortItemTitle} from '../../store/actions/item.actions'

class _BoarSort extends Component {
    state = {
    }

    onSort = (sortType) => {
        this.props.onSortItemTitle(this.props.board,sortType)
    }

    render() {
        return (
            <div className="board-filter">
                <h1 onClick={() => {
                    this.onSort('A-Z')
                }}>Sort A-Z</h1>
                <h1 onClick={() => {
                    this.onSort('Z-A')
                }}>Sort Z-A</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        groups: state.groupModule.groups,
    };
}

const mapDispatchToProps = {
    onSortItemTitle
};
export const BoardSort = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoarSort);