import React from 'react';
import { connect } from 'react-redux';
import { loadStatuses } from '../../store/actions/item.actions'



class _StatusFooter extends React.Component {
    state ={
        statuses: []
    }
    componentDidMount() {
        const { loadStatuses, board} = this.props
        loadStatuses(board)
        // this.statusesFooter()
    }

    statusesFooter = () => {
        const { statuses} = this.props
        const numbers = Object.values(statuses[0])
        const colors = Object.values(statuses[1])
        let sum = 0
        for (let i = 0; i< numbers.length; i++) {
            sum += numbers[i]
        }
        const percent = []
        for (let i = 0; i < numbers.length; i++) {
            const pres = ((numbers[i] / sum).toFixed(2)) * 100
            percent.push(pres)
        }
    }
    render() {
        const { board, group, column, statuses, loadStatuses} = this.props
        // console.log(statuses);
        return (
            <div style={{minWidth: column.width }} className="status-footer">
            
        </div>
    )
}
}

function mapStateToProps(state) {
    return {
        statuses: state.itemModule.statuses,
    };
}

const mapDispatchToProps = {
    loadStatuses
};

export const StatusFooter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StatusFooter);