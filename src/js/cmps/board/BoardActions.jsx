import { Component } from 'react';

import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
import { FilterMenu } from '../menus/FilterMenu';
import { SortMenu } from '../menus/SortMenu';
import { BoardSearch } from './BoardSearch';

export class BoardActions extends Component {
  state = {
    isFilter: false,
    isSort: false,
  };

  toggleFilter = () => {
    this.setState({ isFilter: !this.state.isFilter, isSort: false });
  };
  toggleSort = () => {
    this.setState({ isSort: !this.state.isSort, isFilter: false });
  };
  render() {
    const { isFilter, isSort } = this.state;
    const { board, onAddItem, onEditGroup, toggleMenu, toggleMenus } =
      this.props;
    return (
      <div className="actions-container flex">
        <div className="add-action flex">
          <div
            className="add item-add flex align-center btn"
            onClick={(ev) => {
              ev.preventDefault();
              onAddItem('New Item', board.groups[0], true, board);
            }}
          >
            New Item
          </div>
          <div
            className="add group-add flex align-center btn"
            onClick={(ev) => {
              ev.preventDefault();
              onEditGroup('New Group');
            }}
          >
            New group
          </div>
        </div>
        <BoardSearch board={board} />
        <div
          className="btn-search flex br4 btn"
          // onClick={this.toggleFilter}
          onClick={() => toggleMenu(toggleMenus, 'filterMenu')}
        >
          <div className="">
            <Filter />
            <span>Filter</span>
          </div>
          {toggleMenus.filterMenu && <FilterMenu board={board} />}
        </div>
        <div className="btn-search flex br4 btn">
          <Person />
          Person
        </div>
        <div
          className="btn-search flex br4 btn"
          onClick={this.toggleSort}
          onClick={() => toggleMenu(toggleMenus, 'filterMenu', true)}
        >
          <Sort />
          Sort
        </div>
        {isSort && <SortMenu board={board} />}
      </div>
    );
  }
}
