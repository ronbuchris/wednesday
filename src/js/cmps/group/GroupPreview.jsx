import React from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ItemPreview } from '../item/ItemPreview';
import { setGroup, removeGroup } from '../../store/actions/group.actions';
import { toggleMenu } from '../../store/actions/board.actions';
import { saveUndoWorkspace } from '../../store/actions/workspace.actions';
import { GroupHeader } from './GroupHeader';
import { GroupFooter } from './GroupFooter';
import { removeItem } from '../../store/actions/item.actions';
import { eventBusService } from '../../services/event-bus.service';

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
    this.saveUndo(workspace);
    removeGroup(workspace, board, groupId);
    eventBusService.emit('user-msg', {
      txt: 'group was successfully deleted',
      // type: '',
    });
  };

  makeId = (length = 6) => {
    var txt = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  };
  onRemoveItem = (itemId) => {
    const { workspace, group, removeItem, board, user } = this.props;
    const activity = {
      id: this.makeId(),
      createdAt: Date.now(),
      activity: 'Removed item',
      createdBy: {
        _id: user._id,
        fullname: user.fullname,
        img: user.img,
      },
    };
    board.activities.unshift(activity);
    this.saveUndo(workspace);
    removeItem(workspace, group, itemId, board);
    eventBusService.emit('user-msg', {
      txt: 'We successfully deleted 1 item',
      type: '',
    });
  };

  saveUndo = (workspace) => {
    const undoWorkspace = JSON.parse(JSON.stringify(workspace));
    this.props.saveUndoWorkspace(undoWorkspace);
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
      toggleMenus,
      onEditItem,
      toggleMenu,
      onAddItem,
      provided,
      onBlur,
      board,
      group,
    } = this.props;
    const { itemTitle, isFocused } = this.state;
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
          {(provided, snapshot) => (
            <div
              className="item-list flex column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {group?.items?.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
        </div>
        <GroupFooter
          board={board}
          group={group}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpenNav: state.workspaceModule.isOpenNav,
    workspace: state.workspaceModule.workspace,
    toggleMenus: state.workspaceModule.toggleMenus,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  setGroup,
  removeGroup,
  removeItem,
  saveUndoWorkspace,
  toggleMenu,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
