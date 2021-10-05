import { Draggable } from 'react-beautiful-dnd';
import { GroupPreview } from '../group/GroupPreview';
export function TableView({
  setCurrGroupId,
  onEditGroup,
  onEditItem,
  onAddItem,
  onBlur,
  board,
  groups,
}) {
  return (
    <div className="table-view-container">
      {groups.map((group, index) => {
        return (
          <Draggable key={group.id} draggableId={group.id} index={index}>
            {(provided, snapshot) => (
              <div {...provided.draggableProps} ref={provided.innerRef}>
                <GroupPreview
                  setCurrGroupId={setCurrGroupId}
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
  );
}
