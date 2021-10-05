import { connect } from 'react-redux';
import { filterGroups } from '../../store/actions/group.actions';
import { GroupFilter } from '../group/GroupFilter';
import { StatusFilter } from '../item/StatusFilter';

function _FilterMenu({ board, groups, filterGroups, filterStore }) {
  const { groupsIds, statuses } = filterStore;

  const onFilter = (groupId, status, bool) => {
    const filter = bool ? groupsIds : statuses;
    const object = bool ? groupId : status;

    if (filter.includes(object)) {
      const objectIdx = filter.findIndex((g) => g === object);
      filter.splice(objectIdx, 1);
    } else {
      filter.push(object);
    }
    filterGroups(board, filterStore);
  };

  const clearFilter = () => {
    filterStore.groupsIds = [];
    filterStore.statuses = [];
    filterGroups(board, filterStore);
  };

  return (
    <div className="menu-modal filter-menu fs14">
      <div className="filter-menu-header flex align-center space-between">
        Quick filters
        <div className="clear-filter br4" onClick={clearFilter}>
          Clear all
        </div>
      </div>
      <div className="filter-options flex">
        <GroupFilter
          board={board}
          groups={groups}
          onFilter={onFilter}
          groupsIds={groupsIds}
        />
        <StatusFilter
          board={board}
          onFilterStatus={onFilter}
          statuses={statuses}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    groups: state.groupModule.groups,
    filterStore: state.boardModule.filterStore,
  };
}

const mapDispatchToProps = {
  filterGroups,
};
export const FilterMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FilterMenu);
