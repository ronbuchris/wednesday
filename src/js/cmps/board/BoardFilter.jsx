import { Component } from 'react';
import { connect } from 'react-redux';
import { filterGroups, filterStatus } from '../../store/actions/group.actions'

class _BoardFilter extends Component {
    state = {
        filterByGroupId: [],
        filterByStatus:[]
    }

    onFilter = (groupId) => {
        const { filterByGroupId} = this.state
        if (filterByGroupId.includes(groupId)) {
            const groupIdIdx = filterByGroupId.findIndex(g => g === groupId)
            filterByGroupId.splice(groupIdIdx,1)
            this.setState({ filterByGroupId: filterByGroupId })
        } else {
            filterByGroupId.push(groupId)
            this.setState({ filterByGroupId: filterByGroupId })
        }
        this.props.filterGroups(this.props.board,filterByGroupId)
    }

    onFilterStatus= (status) => {
        const { filterByStatus } = this.state
        if (filterByStatus.includes(status)) {
            const statusIdx = filterByStatus.findIndex(s => s === status)
            filterByStatus.splice(statusIdx, 1)
            this.setState({ filterByStatus })
        } else {
            filterByStatus.push(status)
            this.setState({ filterByStatus })
        }
        this.props.filterStatus(this.props.board, filterByStatus)
    }
    render() {
        const { board} = this.props;
        return (
            <div className="board-filter">
                {board.groups.map(group => {
                    return <div key={group.id} className="group-filter-preview flex" onClick={() => {
                        this.onFilter(group.id)
                    }}>
                        <h3>{group.title}</h3>
                        <p>{group.items.length}</p>
                    </div>

                })}
                {board.columns[1].labels.map(label => {
                    return <div key={label.color} onClick={() => {
                        this.onFilterStatus(label.title)
                    }}>
                        {label.title}
                    </div>

                })}
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
    filterGroups,
    filterStatus
};
export const BoardFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilter);
