import { Component } from 'react';
import { connect } from 'react-redux';
import { filterGroups } from '../../store/actions/group.actions'

class _BoardFilter extends Component {
    state = {
        filterByGroupId: []
    }

    handleChange = (groupId) => {
        this.state.filterByGroupId.push(groupId)
        this.setState({ filterByGroupId: this.state.filterByGroupId })
        this.props.filterGroups(this.props.board, this.state.filterByGroupId)
    }
    render() {
        const { board } = this.props;
        return (
            <div className="board-filter">
                {board.groups.map(group => {
                    return <div key={group.id} className="group-filter-preview flex" onClick={() => {
                        this.handleChange(group.id)
                    }}>
                        <h3>{group.title}</h3>
                        <p>{group.items.length}</p>
                    </div>

                })}
            </div>
        )
    }
}





function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    };
}

const mapDispatchToProps = {
    filterGroups
};
export const BoardFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilter);
