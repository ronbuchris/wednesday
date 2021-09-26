import { Component } from 'react';


import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
import { BoardFilter } from './BoardFilter';
export class BoardActions extends Component {
  state = {
    isFilter: false
  }

  toggleFilter = () => {
    this.setState({isFilter: !this.state.isFilter});
  }
  render() {
    const { isFilter} = this.state;
    const { board} = this.props;
    return (
      <div className="actions-container">
        
        <p onClick={this.toggleFilter}>Filter:<Filter /></p>
        {isFilter && <BoardFilter board={board}/>}
        <p>Person:<Person /></p>
        <p>Sort:<Sort /></p>
    </div>
  );
}
}
