import { Component } from 'react';
import { connect } from 'react-redux';
import { filterGroups } from '../../store/actions/group.actions';
import { GroupFilter } from '../group/GroupFilter';
import { StatusFilter } from '../item/StatusFilter';

class _FilterMenu extends Component {
  state = {
    filterByGroupId: [],
    filterByStatus: [],
  };

  onFilter = (groupId, status, bool) => {
    const { filterByGroupId, filterByStatus } = this.state;
    const { board, filterGroups } = this.props;
    const filter = bool ? filterByGroupId : filterByStatus;
    const object = bool ? groupId : status;
    if (filter.includes(object)) {
      const objectIdx = filter.findIndex((g) => g === object);
      filter.splice(objectIdx, 1);
      this.setState({ filter });
    } else {
      filter.push(object);
      this.setState({ filter });
    }
    filterGroups(board, this.state.filterByGroupId, this.state.filterByStatus);
  };

  clearFilter = () => {
    const { filterGroups, board } = this.props;
    this.setState({ filterByStatus: [], filterByGroupId: [] }, () => {
      filterGroups(
        board,
        this.state.filterByGroupId,
        this.state.filterByStatus
      );
    });
  };

  render() {
    const { board, groups } = this.props;
    const { filterByGroupId, filterByStatus } = this.state;
    return (
      <div className="menu-modal filter-menu fs14">
        <div className="filter-menu-header flex align-center space-between">
          Quick filters
          <div className="clear-filter br4" onClick={this.clearFilter}>
            Clear all
          </div>
        </div>
        <div className="filter-options flex">
          <GroupFilter
            board={board}
            groups={groups}
            onFilter={this.onFilter}
            filterByGroupId={filterByGroupId}
          />
          <StatusFilter
            board={board}
            onFilterStatus={this.onFilter}
            filterByStatus={filterByStatus}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    groups: state.groupModule.groups,
  };
}

const mapDispatchToProps = {
  filterGroups,
};
export const FilterMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FilterMenu);
