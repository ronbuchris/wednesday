import React from 'react';
import { connect } from 'react-redux'

import { Doughnut, Pie, Bar } from 'react-chartjs-2';
import { loadStatuses } from '../../store/actions/item.actions'



class _Dashboard extends React.Component {
    state = {
        chartType: 'Pie'
    }
    componentDidMount() {
        this.props.loadStatuses(this.props.board)
    }


    changeChart = (type) => {
        this.setState({ chartType: type })
    }
    render() {
        const { statuses } = this.props
        const { chartType } = this.state
        if (!statuses.length) return <div>loading</div>
        const statusToShow = Object.keys(statuses[0])
        const numbers = Object.values(statuses[0])
        const colors = Object.values(statuses[1])
        console.log(chartType);
        const DynamicChart = (props) => {
            switch (chartType) {
                case 'Pie':
                    return <Pie {...props}/>;
                case 'Doughnut':
                    return <Doughnut {...props}/>;
                case 'Bar':
                    return <Bar {...props}/>;
            }
        };
        if (!statusToShow || !numbers || !colors) return <div>loading</div>
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
            <div>
                <div>
                    <p onClick={() => {
                        this.changeChart('Pie')
                    }}>Pie</p>
                    <p onClick={() => {
                        this.changeChart('Doughnut')
                    }}>Doughnut</p>
                    <p onClick={() => {
                        this.changeChart('Bar')
                    }}>Bar</p>
                </div>
                <DynamicChart data={data} />
            </div>
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
