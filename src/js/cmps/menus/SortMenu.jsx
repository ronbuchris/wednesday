// import { setState } from 'react';
import { connect } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { onSortItemTitle } from '../../store/actions/item.actions';

function _SortMenu({ onSortItemTitle, board }) {
  // const [sortBy, setSortBy] = setState('Text');
  // const [sortOrder, setSortOrder] = setState('ascending');

  // const onSort = (sortType) => {
  //   onSortItemTitle(board, sortType);
  // };

  const resetSort = () => {};

  return (
    <div className="menu-modal sort-menu ">
      <div className="menu-header flex align-center space-between">
        Sort by
        <div className="clear-filter btn br4" onClick={resetSort}>
          Reset sort
        </div>
      </div>
      <div className="sort-content flex">
        <div className="sort-by br4 btn flex align-center space-between">
          <div className="sort-by-text">Text</div>
          <IoIosArrowDown />
        </div>
        <div className="sort-order btn br4 flex align-center space-between">
          Ascending
          <IoIosArrowDown />
        </div>
      </div>
      {/* <h1
        onClick={() => {
          onSort('A-Z');
        }}
      >
        Sort A-Z
      </h1>
      <h1
        onClick={() => {
          onSort('Z-A');
        }}
      >
        Sort Z-A
      </h1> */}
    </div>
  );
}

const mapDispatchToProps = {
  onSortItemTitle,
};

export const SortMenu = connect(null, mapDispatchToProps)(_SortMenu);
