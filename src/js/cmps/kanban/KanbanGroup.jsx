import { Component } from 'react';
import Drag from 'monday-ui-react-core/dist/icons/Drag';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export class KanbanGroup extends Component {
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

  onKeyUp = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  render() {
    const { provided, group, onAddItem, board, snapshot} = this.props;
    const { itemTitle, isFocused } = this.state;

    return (
      <div className="kanban-group" 
      >
        <div
          className="group-box br4 flex column"
          style={{ backgroundColor: group.style.color }}
          >
          <div
            className="list-header flex justify-center"
            {...provided.dragHandleProps}
          >
            <div className="drag-btn btn">
              <Drag />
            </div>
            <div className="kanban-group-title">{group.title}</div>
          </div>
          <Droppable type="item" droppableId={group.id}>
            {(provided, snapshot) => (
              <div
                className="kanban-list flex column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {group.items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="item-preview-container br4"
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className="kanban-item"
                            {...provided.dragHandleProps}
                            onBlur={this.onBlur}
                          >
                            {item.title}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                <div className="item-add">
                  <form
                    className=""
                    onSubmit={(ev) => {
                      ev.preventDefault();
                      onAddItem(itemTitle, group, false, board);
                      this.clearState();
                    }}
                  >
                    <input
                      type="text"
                      dir="auto"
                      className={`item-add-input ${
                        isFocused ? 'is-focus' : ''
                      }`}
                      placeholder="+ Add Item"
                      value={itemTitle}
                      onChange={this.handleChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      onKeyUp={this.onKeyUp}
                    />
                  </form>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}
