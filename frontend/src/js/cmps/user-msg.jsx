import React from 'react';
import { connect } from 'react-redux';
import { eventBusService } from '../services/event-bus.service';
import CloseSmall from 'monday-ui-react-core/dist/icons/CloseSmall';
import Check from 'monday-ui-react-core/dist/icons/Check';
import { undo } from '../store/actions/workspace.actions';
class _UserMsg extends React.Component {
  state = {
    msg: null,
  };
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.onCloseMsg, 5000);
      });
    });
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  onCloseMsg = () => {
    this.setState({ msg: null });
    clearTimeout(this.timeoutId);
  };

  render() {
    const { msg } = this.state;
    const { lastEditedWorkspace, board } = this.props;
    if (!msg) return <React.Fragment></React.Fragment>;
    return (
      <section className={`user-msg flex align-center`}>
        <Check />
        <div className="user-msg-title">
          {msg.txt}
          {msg.type}
        </div>
        <div
          className="undo-btn btn br4"
          onClick={() => {
            this.props.undo(lastEditedWorkspace, board._id);
            this.onCloseMsg();
          }}
        >
          Undo
        </div>
        <button
          className="btn reset-btn auto-center br4"
          onClick={this.onCloseMsg}
        >
          <CloseSmall />
        </button>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    lastEditedWorkspace: state.workspaceModule.lastEditedWorkspace,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  undo,
};

export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg);
