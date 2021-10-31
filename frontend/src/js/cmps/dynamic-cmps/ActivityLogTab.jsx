import { Component } from 'react';
import Time from 'monday-ui-react-core/dist/icons/Time';
import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import ReactTimeAgo from 'react-time-ago';

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
                  <div className="activity-box flex align-center">
                    <div className="activity-time flex align-center">
                      <Time />
                      <ReactTimeAgo
                        date={activity.createdAt}
                        locale="en-US"
                        timeStyle="mini"
                      />
                    </div>
                    <div className="activity-member flex align-center">
                      <img src={activity.createdBy.img} alt="user" />
                      {activity.createdBy.fullname}
                    </div>
                    <div className="activity-activity flex space-between align-center">
                      {activity.activity}
                      {activity.from && (
                        <div className="activity-info flex space-between align-center">
                          <div
                            className="from flex auto-center"
                            style={{ backgroundColor: activity.from.color }}
                          >
                            {activity.from.title}
                          </div>
                          {'>'}
                          <div
                            className="to flex auto-center"
                            style={{ backgroundColor: activity.to.color }}
                          >
                            {activity.to.title}
                          </div>
                        </div>
                      )}
                    </div>
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
