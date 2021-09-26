import { Component } from 'react';

import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
import { BoardFilter } from './BoardFilter';
import { BoardSort } from './BoardSort';

export class BoardActions extends Component {
  state = {
    isFilter: false,
    isSort:false
  };

  toggleFilter = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };
  toggleSort = () => {
    this.setState({ isSort: !this.state.isSort });
  };
  render() {
    const { isFilter, isSort } = this.state;
    const { board, onAddItem, onEditGroup } = this.props;
    return (
      <div className="actions-container flex">
        <div className="add-action flex">
          <div
            className="add item-add flex align-center btn"
            onClick={(ev) => {
              ev.preventDefault();
              onAddItem('New Item', board.groups[0], board, true);
            }}
          >
            New Item
          </div>
          <div
            className="add group-add flex align-center btn"
            onClick={(ev) => {
              ev.preventDefault();
              onEditGroup('new-group', board);
            }}
          >
            New group
          </div>
        </div>
        <p onClick={this.toggleFilter}>
          Filter:
          <Filter />
        </p>
        {isFilter && <BoardFilter board={board} />}
        <p>
          Person:
          <Person />
        </p>
        <p onClick={this.toggleSort}>
          Sort:
          <Sort />
        </p>
        {isSort && <BoardSort board={board} />}
      </div>
    );
  }
}
