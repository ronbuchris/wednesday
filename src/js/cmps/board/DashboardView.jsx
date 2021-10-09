import React from 'react';
import { connect } from 'react-redux';

import { loadStatuses, getPersonItem, getDateData, getGroupItemsCount } from '../../store/actions/item.actions';
import { StatusChart } from '../charts/StatusChart';
import { PersonChart } from '../charts/PersonChart';
import { Loader } from '../Loader';
import Group from 'monday-ui-react-core/dist/icons/Group';
import Item from 'monday-ui-react-core/dist/icons/Item';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Activity from 'monday-ui-react-core/dist/icons/Activity';
import Update from 'monday-ui-react-core/dist/icons/Update';
import { DateChart } from '../charts/DateChart';
import { PieChart } from '../charts/PieChart';
import { GroupItemsCount } from '../charts/GroupItemsCount';

class _DashboardView extends React.Component {
  async componentDidMount() {
    const { board, loadStatuses, getPersonItem, getDateData, getGroupItemsCount} = this.props;
    loadStatuses(board);
    getPersonItem(board);
    getGroupItemsCount(board);
    // getDateData(board)
  }

  render() {
    const { statuses, personsCount, board, dateCounter, groupItemsCount } = this.props;
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
      <div className="dashboard-preview flex column auto-center">
        <div className="data-container flex space-evenly">
            <div className="group-data box br4 flex align-center justify-center">
              <div className="group-icon icon flex auto-center">
              <Group/>
              </div>
              <div className="group-header-chart header flex column">
              <p className="data-nums" >{board.groups.length}</p>
              <p>Groups</p>
              </div>
            </div>
            <div className="person-data box br4 flex align-center justify-center">
            <div className="person-icon icon flex auto-center">
              <Person/>
              </div>
              <div className="person-header-chart header flex column">
              <p className="data-nums" >{Object.keys(personsCount).length}</p>
              <p>Persons</p>
              </div>
            </div>
            <div className="item-data box br4 flex align-center justify-center">
              <div className="item-icon icon flex auto-center">
              <Item/>
              </div>
              <div className="item-header-chart header flex column">
              <p className="data-nums" >{sum}</p>
              <p>Items</p>
              </div>
            </div>
            <div className="activity-data box br4 flex align-center justify-center">
              <div className="activity-icon icon flex auto-center">
            <Activity/>
              </div>
              <div className="activity-header-chart header flex column">
              <p className="data-nums" >{board.activities.length}</p>
            <p>Activities</p>
              </div>
            </div>
            <div className="update-data box br4 flex align-center justify-center">
              <div className="update-icon icon flex auto-center">
            <Update/>
              </div>
              <div className="update-header-chart header flex column">
            <p className="data-nums" >{updateSum}</p>
            <p >Updates</p>
              </div>
            </div>
        </div>
        <div className="charts-container">
          {/* <div className='date-chart br4'>
            <DateChart dateCounter={dateCounter}/>
          </div> */}
          <div className='group-chart br4'>
            <GroupItemsCount groupItemsCount={groupItemsCount}/>
          </div>
          <div className='status-chart br4'>
            <StatusChart statuses={statuses}/>
          </div>
          <div className='person-chart br4'>
            <PersonChart personsCount={personsCount}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupItemsCount: state.itemModule.groupItemsCount,
    personsCount: state.itemModule.personsCount,
    workspace: state.workspaceModule.workspace,
    dateCounter: state.itemModule.dateCounter,
    statuses: state.itemModule.statuses,
  };
}

const mapDispatchToProps = {
  getGroupItemsCount,
  getPersonItem,
  loadStatuses,
  getDateData
};

export const DashboardView = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DashboardView);
