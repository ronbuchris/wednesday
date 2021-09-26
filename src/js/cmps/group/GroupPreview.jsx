import React from 'react';
import { connect } from 'react-redux';

import { ItemPreview } from '../item/ItemPreview';
import { setGroup } from '../../store/actions/group.actions';
import { GroupHeader } from './GroupHeader';
import { onEditItem, loadItems } from '../../store/actions/item.actions';

class _GroupPreview extends React.Component {
  state = {
    addItem: '',
    isFocused: false,
  };

  componentDidMount() {
    this.props.loadItems(this.props.group);
  }

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
    if (isFocused) return;
    this.setState({ isFocused: !isFocused });
  };

  onKeyUp = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  render() {
    const { group, onBlur, board, onAddItem, items } = this.props;
    const { addItem, isFocused } = this.state;
    if (!items) return <div>loading</div>;
    return (
      <div key={group.id} className="group-preview">
        <GroupHeader group={group} board={board} onBlur={onBlur} />
        <div className="item-list">
          {items.map((item) => {
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
            onSubmit={(ev) => {
              ev.stopPropagation();
              onAddItem(addItem, group);
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
              onKeyUp={this.onKeyUp}
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
    items: state.itemModule.items,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onEditItem,
  setGroup,
  loadItems,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
