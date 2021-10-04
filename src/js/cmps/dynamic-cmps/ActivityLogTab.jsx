import { Component } from 'react';
import Time from 'monday-ui-react-core/dist/icons/Time';
import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';

export class ActivityLogTab extends Component {
  state = {
    logTxt: '',
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState({ [field]: value }, () => {
      this.props.onSetSearch(this.props.board, this.state.logTxt);
    });
  };
  render() {
    const { logTxt } = this.state;
    const { item, board } = this.props;
    const activities = item ? item.activities : board.activities;
    // if (!activities?.length) return <div>no activities yet</div>
    return (
      <div className="activity-log-wrapper">
        <div className="log-filter flex align-center">
          <div className="drop-down-filter btn flex align-center br4">
            <div>Filter Log</div>
            <div className="dropdown-chevron">
              <DropdownChevronDown />
            </div>
          </div>
          {board && (
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
          )}
        </div>

        <div className="logs flex column">
          {activities &&
            activities.map((activity) => {
              return (
                <div
                  key={activity.id}
                  className="single-activity flex align-center column"
                >
                  <div className="activity-box flex align-center space-between">
                    <div className="activity-time">
                      <Time />
                      17m
                    </div>
                    <div className="activity-member">
                      {activity.createdBy.fullname}
                    </div>
                    <div className="activity-activity">{activity.activity}</div>
                  </div>
                  <div className="divider"></div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
