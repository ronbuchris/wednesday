import React from 'react';
import { connect } from 'react-redux';

import { loadStatuses, getPersonItem } from '../../store/actions/item.actions';
import { StatusChart } from '../charts/StatusChart';
import { PersonChart } from '../charts/PersonChart';
import { Loader } from '../Loader';
import Group from 'monday-ui-react-core/dist/icons/Group';
import Item from 'monday-ui-react-core/dist/icons/Item';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Activity from 'monday-ui-react-core/dist/icons/Activity';
import Update from 'monday-ui-react-core/dist/icons/Update';

class _DashboardView extends React.Component {
  componentDidMount() {
    const { board, loadStatuses, getPersonItem} = this.props;
    loadStatuses(board);
    getPersonItem(board);
  }

  render() {
    const { statuses, personsCount,board } = this.props;
    if (!statuses.length) return <div><Loader/></div>;
    const numbers = Object.values(statuses[0]);
    var sum = 0
    numbers.forEach(num => {
      sum += num
    })
    var updateSum = 0
    board.groups.forEach(group => {
      group.items.forEach(item => {
        updateSum += item.updates.length
      })
    })
    return (
      <div className="dashboard-preview flex">
        <div className="data-container">
            <div className="data-box">
              <Group/>
              <p>{board.groups.length}</p>
              <p>Groups</p>
            </div>
            <div className="data-box">
              <Person/>
              <p>{Object.keys(personsCount).length}</p>
              <p>Persons</p>
            </div>
            <div className="data-box">
              <Item/>
              <p>{sum}</p>
              <p>Items</p>
            </div>
            <div className="data-box">
            <Activity/>
              <p>{board.activities.length}</p>
            <p>Activities</p>
            </div>
            <div className="data-box">
            <Update/>
            <p>{updateSum}</p>
            <p>Updates</p>
            </div>
        </div>
        <div className="charts-container flex column auto-center">
          <div className='status-chart'>
            <StatusChart statuses={statuses}/>
          </div>
          <div className='person-chart'>
            <PersonChart personsCount={personsCount} statuses={statuses}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    statuses: state.itemModule.statuses,
    workspace: state.workspaceModule.workspace,
    personsCount: state.itemModule.personsCount,
  };
}

const mapDispatchToProps = {
  loadStatuses,
  getPersonItem
};

export const DashboardView = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DashboardView);
