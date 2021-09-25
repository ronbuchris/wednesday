import { Component } from 'react';
import { connect } from 'react-redux';


class _PersonFilter extends Component {
    render() {
        const { board } = this.props;
        return (
            <div className="board-filter">
                
            </div>
        )
    }
}





function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = {
};
export const PersonFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PersonFilter);