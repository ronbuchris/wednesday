import React from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ItemPreview } from '../item/ItemPreview';
import { setGroup, removeGroup } from '../../store/actions/group.actions';
import { GroupHeader } from './GroupHeader';
import { GroupFooter } from './GroupFooter';
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
    const {
      setCurrGroupId,
      onEditGroup,
      onEditItem,
      onAddItem,
      provided,
      onBlur,
      board,
      group,
    } = this.props;
    const { itemTitle, isFocused } = this.state;
    if (!group) return <div>loading</div>;
    return (
      <div key={group.id} className="group-preview">
        <GroupHeader
          onRemoveGroup={this.onRemoveGroup}
          setCurrGroupId={setCurrGroupId}
          onEditGroup={onEditGroup}
          provided={provided}
          onBlur={onBlur}
          board={board}
          group={group}
        />
        <Droppable type="item" droppableId={group.id}>
          {(provided) => (
            <div
              className="item-list flex column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {group.items &&
                group.items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="item-preview-container"
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <ItemPreview
                            onRemoveItem={this.onRemoveItem}
                            onEditItem={onEditItem}
                            onAddItem={onAddItem}
                            provided={provided}
                            onBlur={onBlur}
                            group={group}
                            board={board}
                            key={item.id}
                            item={item}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div>
          <form
            className="item-add"
            onSubmit={(ev) => {
              ev.preventDefault();
              onAddItem(itemTitle, group, false, board);
              this.clearState();
            }}
          >
            <div
              className="indicator"
              style={{ backgroundColor: group.style.color, opacity: 0.5 }}
            ></div>
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
              <>
                <button className="item-add-button">Add</button>
                <div className="space-item"></div>
              </>
            )}
            <div className="indicator"></div>
          </form>
          <GroupFooter board={board} group={group}/>
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
