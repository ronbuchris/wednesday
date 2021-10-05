import React from 'react';
import { connect } from 'react-redux';

import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';
import { loadStatuses } from '../../store/actions/item.actions';

class _Dashboard extends React.Component {
  state = {
    chartType: 'Pie',
  };
  componentDidMount() {
    this.props.loadStatuses(this.props.board);
  }

  changeChart = (type) => {
    this.setState({ chartType: type });
  };
  render() {
    const { statuses } = this.props;
    const { chartType } = this.state;
    if (!statuses.length) return <div>loading</div>;
    const statusToShow = Object.keys(statuses[0]);
    const numbers = Object.values(statuses[0]);
    const colors = Object.values(statuses[1]);
    const DynamicChart = (props) => {
      switch (chartType) {
        case 'Pie':
          return <Pie {...props} />;
        case 'Doughnut':
          return <Doughnut {...props} />;
        case 'Bar':
          return <Bar {...props} />;
        case 'Line':
          return <Line {...props} />;
        default:
          return;
      }
    };
    if (!statusToShow || !numbers || !colors) return <div>loading</div>;
    const data = {
      labels: statusToShow,
      datasets: [
        {
          label: '# of Votes',
          data: numbers,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 3,
        },
      ],
    };
    return (
      <div className="dashboard-preview flex column align-center">
        <div className="charts-list flex">
          <h3
            className="chart-choice"
            onClick={() => {
              this.changeChart('Pie');
            }}
          >
            Pie
          </h3>
          <h3
            className="chart-choice"
            onClick={() => {
              this.changeChart('Doughnut');
            }}
          >
            Doughnut
          </h3>
          <h3
            className="chart-choice"
            onClick={() => {
              this.changeChart('Bar');
            }}
          >
            Bar
          </h3>
          <h3
            className="chart-choice"
            onClick={() => {
              this.changeChart('Line');
            }}
          >
            Line
          </h3>
        </div>
        <div className="dashboard">
          <DynamicChart data={data} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    statuses: state.itemModule.statuses,
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  loadStatuses,
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);
