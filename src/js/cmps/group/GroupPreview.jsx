import React from 'react';
import { connect } from 'react-redux';

import { ItemPreview } from '../item/ItemPreview';
import { onEditItem } from '../../store/actions/item.actions';
import { setGroup } from '../../store/actions/group.actions';
import { GroupHeader } from './GroupHeader';

class _GroupPreview extends React.Component {
  state = {
    addItem: '',
    isFocused: false,
  };

  componentDidMount() {}

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ addItem: value });
  };

  clearState = () => {
    this.setState({ addItem: '', isFocused: false });
  };

  // onAddItem=async(ev)=>{
  //   ev.preventDefault();
  //   await this.props.onEditItem(this.state.addItem,this.props.group.id)
  //   this.clearState();
  // }

  onBlur = () => {
    const { isFocused } = this.state;
    this.setState({ isFocused: !isFocused });
  };

  onFocus = () => {
    const { isFocused } = this.state;
    this.setState({ isFocused: !isFocused });
  };

  render() {
    const { group, onBlur, board, onAddItem } = this.props;
    const { addItem, isFocused } = this.state;
    return (
      <div key={group.id} className="group-preview">
        <GroupHeader group={group} board={board} onBlur={onBlur} />
        <div className="item-list">
          {group.items.map((item) => {
            return (
              <ItemPreview
                onBlur={onBlur}
                key={item.id}
                item={item}
                group={group}
                board={board}
              />
            );
          })}
        </div>
        <div className="item-add">
          <form
            className="login-form"
            onSubmit={(ev) => {
              onAddItem(ev, addItem, group);
              this.clearState();
            }}
          >
            <input
              type="text"
              dir="auto"
              className="item-add-input"
              placeholder="+ Add"
              value={addItem}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
            {(isFocused || addItem) && (
              <button
                onClick={(ev) => {
                  onAddItem(ev, addItem, group);
                  this.clearState();
                }}
              >
                Add
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    isOpenNav: state.workspaceModule.isOpenNav,
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onEditItem,
  setGroup,
};
export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
