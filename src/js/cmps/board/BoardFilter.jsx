import { Component } from 'react';
import { connect } from 'react-redux';


class _BoardFilter extends Component {
    render() {
        const {board} = this.props;
        return (
            <div className="board-filter">
                {board.groups.map(group => {
                    console.log(group);
                    return <div key={group.id} className="group-filter-preview flex">
                        <h3>{group.title}</h3>
                        <p>{group.items.length}</p>
                        <div className="status-filter">
                            {group.items.map(item => {
                                return <div key={item.id}>
                                    <h3>{item.status.title}</h3>
                                </div>;
                            })}
                        </div>
                    </div>
                    
                })}
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
export const BoardFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilter);
