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
    const { board, onAddItem, onAddGroup } = this.props;
    return (
      <div className="actions-container">
        <div className="add-dropdown">
          <div
            className="add-item"
            onClick={(ev) => {
              ev.preventDefault();
              onAddItem('New Item', board.groups[0], board, true);
            }}
          >
            New Item
          </div>
          <div
            className="add-group"
            onClick={(ev) => {
              ev.preventDefault();
              onAddGroup('new-group', board);
            }}
          >
            New group of Items
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
