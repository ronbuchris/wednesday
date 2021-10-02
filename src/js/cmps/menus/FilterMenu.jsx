import { Component } from 'react';
import { connect } from 'react-redux';
import { filterGroups, filterStatus } from '../../store/actions/group.actions';
import { GroupFilter } from '../group/GroupFilter';
import { StatusFilter } from '../item/StatusFilter';

class _FilterMenu extends Component {
  state = {
    filterByGroupId: [],
    filterByStatus: [],
  };

  onFilter = (groupId) => {
    const { filterByGroupId, filterByStatus } = this.state;
    const { board } = this.props;
    if (filterByGroupId.includes(groupId)) {
      const groupIdIdx = filterByGroupId.findIndex((g) => g === groupId);
      filterByGroupId.splice(groupIdIdx, 1);
      this.setState({ filterByGroupId: filterByGroupId });
    } else {
      filterByGroupId.push(groupId);
      this.setState({ filterByGroupId: filterByGroupId });
    }
    this.props.filterGroups(board, filterByGroupId, filterByStatus);
  };

  onFilterStatus = (status) => {
    const { filterByStatus, filterByGroupId } = this.state;
    if (filterByStatus.includes(status)) {
      const statusIdx = filterByStatus.findIndex((s) => s === status);
      filterByStatus.splice(statusIdx, 1);
      this.setState({ filterByStatus });
    } else {
      filterByStatus.push(status);
      this.setState({ filterByStatus });
    }
    this.props.filterStatus(this.props.board, filterByStatus, filterByGroupId);
  };
  render() {
    const { board } = this.props;
    return (
      <div className="menu-modal filter-menu">
        <div className="filter-menu-header flex align-center space-between">
          Quick filters
          <div className="clear-filter">Clear all</div>
        </div>
        <div className="filter-options flex">
          <GroupFilter groups={board.groups} onFilter={this.onFilter} />
          <StatusFilter board={board} onFilterStatus={this.onFilterStatus} />
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
  filterStatus,
};
export const FilterMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FilterMenu);
