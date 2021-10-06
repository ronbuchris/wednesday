import { Draggable } from 'react-beautiful-dnd';
import { KanbanGroup } from './KanbanGroup';
export function KanbanView({
  onEditGroup,
  onEditItem,
  onAddItem,
  onBlur,
  board,
  groups,
}) {
  return (
    <>
      <div className="divider"></div>
      <div className="kanban-view flex">
        {groups.map((group, index) => {
          return (
            <Draggable key={group.id} draggableId={group.id} index={index}>
              {(provided, snapshot) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                  <KanbanGroup
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
      </div>
    </>
  );
}
