import { Component } from 'react';
import { connect } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { dragAndDrop } from '../../store/actions/board.actions';

import { GroupPreview } from '../group/GroupPreview';
import { Dashboard } from './Dashboard';
import { NoResault } from '../NoResault';

class _BoardContent extends Component {
  state = {
    currGroupId: null,
  };

  handleOnDragEnd = (result) => {
    const { workspace, board } = this.props;
    this.props.dragAndDrop(workspace, board, result, this.state.currGroupId);
  };

  setCurrGroupId = (groupId) => {
    this.setState({ currGroupId: groupId });
  };

  render() {
    const {
      board,
      groups,
      onBlur,
      onAddItem,
      onEditItem,
      onEditGroup,
      isViewChange,
    } = this.props;
    if (!groups.length) return <NoResault />;
    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <Droppable type="group" droppableId="groups">
          {(provided) => (
            <div
              className="board-content"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {isViewChange && <Dashboard board={board} />}
              {!isViewChange &&
                groups.map((group, index) => {
                  return (
                    <Draggable
                      key={group.id}
                      draggableId={group.id}
                      index={index}
                    >
                      {(provided,snapshot) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <GroupPreview
                            setCurrGroupId={this.setCurrGroupId}
                            onEditGroup={onEditGroup}
                            onEditItem={onEditItem}
                            onAddItem={onAddItem}
                            provided={provided}
                            snapshot={snapshot}
                            groupIndex={index}
                            onBlur={onBlur}
                            key={group.id}
                            group={group}
                            board={board}
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
      </DragDropContext>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  dragAndDrop,
};

export const BoardContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardContent);
