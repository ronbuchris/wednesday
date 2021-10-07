import fi from 'date-fns/esm/locale/fi/index.js';
import { connect } from 'react-redux';
import { filterGroups } from '../../store/actions/group.actions';
import { GroupFilter } from '../group/GroupFilter';
import { PersonFilter } from '../item/PersonFilter';
import { StatusFilter } from '../item/StatusFilter';

function _FilterMenu({ board, groups, filterGroups, filterStore }) {
  const { groupsIds, statuses, persons} = filterStore;

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

  const onFilterPerson = (personId) => {
    if (persons.includes(personId)) {
      const personIdx = persons.findIndex((person) => person === personId);
      persons.splice(personIdx, 1);
    } else {
      persons.push(personId);
    }
    filterGroups(board, filterStore)
  }

  const clearFilter = () => {
    filterStore.groupsIds = [];
    filterStore.statuses = [];
    filterStore.persons = [];
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
        <PersonFilter board={board} onFilterPerson={onFilterPerson} persons={persons}/>
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
