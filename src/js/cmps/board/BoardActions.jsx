import { connect } from 'react-redux';

import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
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
          onClick={(ev) => {
            ev.stopPropagation();
            onEditGroup('New Group');
          }}
        >
          New group
        </div>
      </div>
      <BoardSearch board={board} />
      <div
        className="btn-search flex br4 btn  align-center justify-center"
        onClick={() => {
          toggleMenu(toggleMenus, 'filterMenu', true);
        }}
      >
        <Filter className="w32" />
        <span>Filter</span>
        <IoIosArrowDown className="w32" />
        {toggleMenus.filterMenu && <FilterMenu board={board} />}
      </div>
      <div className="btn-search flex br4 btn  align-center justify-center">
        <Person className="w32" />
        <span>Person</span>
        <IoIosArrowDown className="w32" />
      </div>
      <div
        className="btn-search flex br4 btn  align-center justify-center"
        onClick={() => toggleMenu(toggleMenus, 'sortMenu', true)}
      >
        <Sort className="w32" />
        <span>Sort</span>
        <IoIosArrowDown className="w32" />
        {toggleMenus.sortMenu && <SortMenu board={board} />}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  toggleMenu,
};

export const BoardActions = connect(null, mapDispatchToProps)(_BoardActions);
