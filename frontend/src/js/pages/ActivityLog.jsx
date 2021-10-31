import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleMenu } from '../store/actions/board.actions'
import Close from 'monday-ui-react-core/dist/icons/Close';
import { ActivityLogTab } from '../cmps/dynamic-cmps/ActivityLogTab';
import { ActivityUpdateTab } from '../cmps/dynamic-cmps/ActivityUpdateTab';


class _ActivityLog extends Component {
    state = {
        toggleNav: true,
    };

    onToggle = (bool) => {
        this.setState({ toggleNav: bool });
      }



    render() {
        const {toggleNav } = this.state
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
                        <div className={`activity-tab btn ${toggleNav && "is-selected"}`}
                            onClick={(ev) => {
                                ev.preventDefault();
                                this.onToggle(true);
                            }}
                        >Activity</div>
                        <div className={`updates-tab btn ${!toggleNav && "is-selected"}`}
                            onClick={(ev) => {
                                ev.preventDefault();
                                this.onToggle(false);
                            }}
                        >Updates</div>
                    </div>

                </div>
                    {toggleNav?<ActivityLogTab board={board}/>:<ActivityUpdateTab board={board}/>}
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
