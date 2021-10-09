import React from 'react';
import { connect } from 'react-redux';

import { loadStatuses, getPersonItem } from '../../store/actions/item.actions';
import { StatusChart } from '../charts/StatusChart';
import { PersonChart } from '../charts/PersonChart';
import { Loader } from '../Loader';
import Group from 'monday-ui-react-core/dist/icons/Group';

class _DashboardView extends React.Component {
  componentDidMount() {
    const { board, loadStatuses, getPersonItem} = this.props;
    loadStatuses(board);
    getPersonItem(board);
  }

  render() {
    const { statuses, personsCount,board } = this.props;
    if (!statuses.length) return <div><Loader/></div>;

    return (
      <div className="dashboard-preview flex">
        <div className="data-container">
            <div className="data-box">
              <Group/>
              <p>{board.groups.length}</p>
              <p>Groups</p>
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
