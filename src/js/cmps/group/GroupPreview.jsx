import React from 'react';
import { connect } from 'react-redux';

import { ItemPreview } from '../item/ItemPreview';
import { setGroup, removeGroup } from '../../store/actions/group.actions';
import { GroupHeader } from './GroupHeader';
import { removeItem } from '../../store/actions/item.actions';

class _GroupPreview extends React.Component {
  state = {
    itemTitle: '',
    isFocused: false,
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ itemTitle: value });
  };

  clearState = () => {
    this.setState({ itemTitle: '', isFocused: false });
  };

  onBlur = () => {
    const { isFocused } = this.state;
    this.setState({ isFocused: !isFocused });
  };

  onFocus = () => {
    const { isFocused } = this.state;
    if (isFocused) return;
    this.setState({ isFocused: !isFocused });
  };

  onRemoveGroup = (groupId) => {
    const { workspace, board, removeGroup } = this.props;
    removeGroup(workspace, board, groupId);
  };

  onRemoveItem = (itemId) => {
    const { workspace, group, removeItem } = this.props;
    removeItem(workspace, group, itemId);
  };

  onKeyUp = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  render() {
    const { group, onBlur, board, onAddItem } = this.props;
    const { itemTitle, isFocused } = this.state;
    if (!group) return <div>loading</div>;
    return (
      <div key={group.id} className="group-preview">
        <GroupHeader
          group={group}
          board={board}
          onBlur={onBlur}
          onRemoveGroup={this.onRemoveGroup}
        />
        <div className="item-list">
          {group.items &&
            group.items.map((item) => {
              return (
                <ItemPreview
                  onBlur={onBlur}
                  key={item.id}
                  item={item}
                  group={group}
                  board={board}
                  onRemoveItem={this.onRemoveItem}
                />
              );
            })}
        </div>
        <div>
          <form
            className="item-add"
            onSubmit={(ev) => {
              ev.preventDefault();
              onAddItem(itemTitle, group);
              this.clearState();
            }}
          >
            <input
              type="text"
              dir="auto"
              className="item-add-input"
              placeholder="+ Add"
              value={itemTitle}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onKeyUp={this.onKeyUp}
            />

            {(isFocused || itemTitle) && (
              <button className="item-add-button">Add</button>
            )}
            <div className="indicator"></div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpenNav: state.workspaceModule.isOpenNav,
    user: state.userModule.user,
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  setGroup,
  removeGroup,
  removeItem,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
