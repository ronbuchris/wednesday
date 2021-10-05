import React from 'react';
import { eventBusService } from '../services/event-bus.service';
import CloseSmall from 'monday-ui-react-core/dist/icons/CloseSmall';
import Check from 'monday-ui-react-core/dist/icons/Check';

export class UserMsg extends React.Component {
  state = {
    msg: null,
  };
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        // this.timeoutId = setTimeout(this.onCloseMsg, 3000);
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
    if (!msg) return <React.Fragment></React.Fragment>;
    return (
      <section className={`user-msg flex align-center`}>
        <Check />
        <div className="user-msg-title">
          {msg.txt}
          {msg.type}
        </div>
        <div className="undo-btn br4">Undo</div>
        <button
          className="btn reset-btn align-center justify-center br4"
          onClick={this.onCloseMsg}
        >
          <CloseSmall />
        </button>
      </section>
    );
  }
}
