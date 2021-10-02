import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleMenu } from '../store/actions/board.actions'
import Close from 'monday-ui-react-core/dist/icons/Close';
import Time from 'monday-ui-react-core/dist/icons/Time';
import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';

class _ActivityLog extends Component {
    state = {
        logTxt: '',
    };


    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        if (!field) return;
        const value = ev.target.value;
        this.setState(
            ({ [field]: value }),
            () => {
                this.props.onSetSearch(this.props.board, this.state.logTxt);
            }
        );
    };




    render() {
        const { logTxt } = this.state
        const { toggleMenu, toggleMenus, board } = this.props
        return (
            <div className="activity-log-panel slide-panel flex column">
                <div className="activity-log-header">
                    <div className="activity-log-close btn">
                        <Close
                            onClick={() => {
                                toggleMenu(toggleMenus);
                                this.props.history.push(`/board/${board._id}`);
                            }} />
                    </div>
                    <div className="activity-title flex">
                        {board.title} Log
                    </div>
                    <div className="tabs-wrapper flex">
                        <div className="activity-tab btn is-selected">Activity</div>
                        <div className="last-viewed-tab btn">Last Viewed</div>
                        <div className="updates-tab btn">Updates</div>
                    </div>

                </div>
                <div className="activity-log-wrapper">
                    <div className="board-log-filter flex align-center">
                        <div className="drop-down-filter btn flex align-center br4">
                            <div>
                            Filter Log
                            </div>
                            <div className="dropdown-chevron">
                             <DropdownChevronDown />
                            </div>
                        </div>
                        <div className="activity-log-input-filter">
                            <input
                            className="input-filter-log"
                                name="search-log"
                                id="search-log"
                                type="text"
                                placeholder="Filter by name"
                                value={logTxt}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="board-logs flex column">
                            {board.activities.map(activity=>{
                                return(
                                    <div className="single-activity flex align-center column">
                                    <div className="activity-box flex align-center space-between">
                                <div className="activity-time"><Time/>17m</div>
                                <div className="activity-member">{activity.createdBy.fullname}</div>
                                <div className="activity-activity">{activity.activity}</div>
                            </div>
                                <div className="divider"></div>
                        </div>
                                    )
                            })}


                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        toggleMenus: state.workspaceModule.toggleMenus,
        board: state.boardModule.board
    };
}


const mapDispatchToProps = {
    toggleMenu
};

export const ActivityLog = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(_ActivityLog));
