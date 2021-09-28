import React from 'react';
import { connect } from 'react-redux';

import { ItemPreview } from '../item/ItemPreview';
import { setGroup, removeGroup} from '../../store/actions/group.actions';
import { GroupHeader } from './GroupHeader';
import { onEditItem, loadItems } from '../../store/actions/item.actions';

class _GroupPreview extends React.Component {
  state = {
    addItem: '',
    isFocused: false,
  };

  // componentDidMount() {
  //   this.props.loadItems(this.props.group);
  // }

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

  onRemoveGroup = (groupId) => {
    const { workspace, board, removeGroup} = this.props
    removeGroup(workspace,board,groupId)
  }

  onKeyUp = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  render() {
    const { group, onBlur, board, onAddItem} = this.props;
    const { addItem, isFocused } = this.state;
    if(!group) return <div>loading</div>
    return (
      <div key={group.id} className="group-preview">
        <GroupHeader group={group} board={board} onBlur={onBlur} onRemoveGroup={this.onRemoveGroup}/>
        <div className="item-list">
          {group.items && group.items.map((item) => { 
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
        <div>
          <form
            className="item-add"
            onSubmit={(ev) => {
              ev.preventDefault();
              onAddItem(addItem, group, board);
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
  onEditItem,
  setGroup,
  loadItems,
  removeGroup
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
