import React from 'react';
import { connect } from 'react-redux'

import { Doughnut, Pie } from 'react-chartjs-2';
import { loadStatuses} from '../../store/actions/item.actions'



class _Dashboard extends React.Component {

    componentDidMount() {
        this.props.loadStatuses(this.props.board)
    }
    render() {
        const { statuses } = this.props
        const statusToShow = Object.keys(statuses[0])
        const numbers = Object.values(statuses[0])
        const colors = Object.values(statuses[1])
        if (!statuses || !statusToShow || !numbers || !colors) return <div>loading</div>
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
            <Pie data={data} />
            // <Doughnut data={data} />
        )
    };
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

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard);
