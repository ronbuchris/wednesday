import { Component } from 'react';
import { connect } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { dragAndDrop } from '../../store/actions/board.actions';
import { NoResault } from '../NoResault';
import { DashboardView } from './DashboardView';
import { TableView } from './TableView';
import { KanbanView } from '../kanban/KanbanView';

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
      onEditGroup,
      onEditBoard,
      onEditItem,
      removeItem,
      onAddItem,
      workspace,
      currView,
      groups,
      onBlur,
      board,
    } = this.props;
    if (!groups.length) return <NoResault />;
    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <div className="board-content-container">
          <Droppable type="group" droppableId="groups">
            {(provided) => (
              <div
                className="board-content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {currView === 'chart' && <DashboardView board={board} />}
                {currView === 'table' && (
                  <TableView
                    setCurrGroupId={this.setCurrGroupId}
                    onEditGroup={onEditGroup}
                    onEditBoard={onEditBoard}
                    onEditItem={onEditItem}
                    onAddItem={onAddItem}
                    onBlur={onBlur}
                    groups={groups}
                    board={board}
                  />
                )}
                {currView === 'kanban' && (
                  <KanbanView
                    onEditGroup={onEditGroup}
                    onEditItem={onEditItem}
                    workspace={workspace}
                    onAddItem={onAddItem}
                    removeItem={removeItem}
                    onBlur={onBlur}
                    groups={groups}
                    board={board}
                  />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
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
