import { useState } from 'react';
import { connect } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { toggleMenu } from '../../store/actions/board.actions';
import { onSort } from '../../store/actions/item.actions';

function _SortMenu({ onSort, board, sortStore, toggleMenu, toggleMenus }) {
  const { sortBy, sortOrder } = sortStore;
  const [dropdownBy, setDropdownBy] = useState(false);
  const [dropdownOrder, setDropdownOrder] = useState(false);

  const resetSort = () => {
    sortStore.sortBy = 'Select sort by';
    onSort(board, sortStore);
    toggleMenu(toggleMenus);
  };

  const onSetSort = () => {
    onSort(board, sortStore);
    toggleMenu(toggleMenus);
  };

  const sortByArray = ['Text', 'Status', 'Date'];

  return (
    <div className="menu-modal sort-menu ">
      <div className="menu-header flex align-center space-between">
        Sort by
        <div className="right flex">
          <div className="clear-filter btn br4" onClick={resetSort}>
            Reset sort
          </div>
          <div className="sort-btn br4 btn" onClick={onSetSort}>
            Sort
          </div>
        </div>
      </div>
      <div className="sort-content flex">
        <div
          className="sort-by br4 btn flex align-center space-between"
          onClick={() => setDropdownBy(!dropdownBy)}
        >
          <div className="sort-by-text">{sortBy}</div>
          <IoIosArrowDown />
          {dropdownBy && (
            <div className="dropdown-sort br4">
              {sortByArray.map((value) => (
                <div
                  key={value}
                  className="sort-by-title br4"
                  onClick={() => (sortStore.sortBy = value)}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="sort-order btn br4 flex align-center space-between"
          onClick={() => setDropdownOrder(!dropdownOrder)}
        >
          {sortOrder}
          <IoIosArrowDown />
          {dropdownOrder && (
            <div className="dropdown-sort br4">
              <div
                className="sort-by-title br4"
                onClick={() => (sortStore.sortOrder = 'Ascending')}
              >
                Ascending
              </div>
              <div
                className="sort-by-title br4"
                onClick={() => (sortStore.sortOrder = 'Descending')}
              >
                Descending
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sortStore: state.boardModule.sortStore,
  };
}

const mapDispatchToProps = {
  onSort,
  toggleMenu,
};

export const SortMenu = connect(mapStateToProps, mapDispatchToProps)(_SortMenu);
