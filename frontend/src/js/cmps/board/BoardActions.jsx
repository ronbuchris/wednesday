import { connect } from 'react-redux';

import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
import Group from 'monday-ui-react-core/dist/icons/Group';
import { IoIosArrowDown } from 'react-icons/io';

import { FilterMenu } from '../menus/FilterMenu';
import { SortMenu } from '../menus/SortMenu';
import { BoardSearch } from './BoardSearch';

import { toggleMenu } from '../../store/actions/board.actions';

function _BoardActions({
  board,
  onAddItem,
  toggleMenu,
  onEditGroup,
  toggleMenus,
  filterStore,
  sortStore,
}) {
  return (
    <div className="actions-container flex">
      <div className="add-action flex">
        <div
          className="add item-add flex align-center btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onAddItem('New Item', board.groups[0], true, board);
          }}
        >
          New Item
        </div>
        <div
          className="add group-add flex align-center btn"
          onClick={() => {
            toggleMenu(toggleMenus, 'addGroupMenu', true);
          }}
        >
          <IoIosArrowDown />
        </div>
        {toggleMenus.addGroupMenu && (
          <div className="menu-modal new-group-menu">
            <div
              className="flex align-center br4 btn"
              onClick={(ev) => {
                ev.stopPropagation();
                onEditGroup('New Group');
                toggleMenu(toggleMenus);
              }}
            >
              <Group />
              New group of items
            </div>
          </div>
        )}
      </div>
      <BoardSearch board={board} />
      <div
        className={`action-hidden btn-search flex br4 btn  auto-center ${
          filterStore.groupsIds.length ||
          filterStore.statuses.length ||
          filterStore.persons.length
            ? 'active'
            : ''
        }`}
        onClick={() => {
          toggleMenu(toggleMenus, 'filterMenu', true);
        }}
      >
        <Filter className="w32" />
        <span>Filter</span>
        <IoIosArrowDown className="w32" />
        {toggleMenus.filterMenu && <FilterMenu board={board} />}
      </div>
      <div
        className={`action-hidden btn-search flex br4 btn  auto-center ${
          sortStore.sortBy !== 'Select sort by' ? 'active' : ''
        }`}
        onClick={() => toggleMenu(toggleMenus, 'sortMenu', true)}
      >
        <Sort className="w32" />
        <span>Sort</span>
        <IoIosArrowDown className="w32" />
        {toggleMenus.sortMenu && (
          <SortMenu board={board} toggleMenus={toggleMenus} />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    filterStore: state.boardModule.filterStore,
    sortStore: state.boardModule.sortStore,
  };
}

const mapDispatchToProps = {
  toggleMenu,
};

export const BoardActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardActions);
