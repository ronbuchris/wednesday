import { connect } from 'react-redux';

import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';

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
        <div className="">
          <Filter />
          <span>Filter</span>
        </div>
        {toggleMenus.filterMenu && <FilterMenu board={board} />}
      </div>
      <div className="btn-search flex br4 btn  align-center justify-center">
        <Person />
        Person
      </div>
      <div
        className="btn-search flex br4 btn  align-center justify-center"
        // onClick={() => toggleMenu(toggleMenus, 'filterMenu', true)}
      >
        <Sort />
        Sort
      </div>
      {toggleMenus.sortMenu && <SortMenu board={board} />}
    </div>
  );
}

const mapDispatchToProps = {
  toggleMenu,
};

export const BoardActions = connect(null, mapDispatchToProps)(_BoardActions);
