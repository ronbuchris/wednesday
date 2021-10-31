import { Draggable } from 'react-beautiful-dnd';
import Drag from 'monday-ui-react-core/dist/icons/Drag';
export function GroupColumn({ column, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps}
         ref={provided.innerRef}
         >
          <div
            {...provided.dragHandleProps}
            className="group-column-header"
            key={column.id}
            style={{ 
              minWidth: column.width,
             }}
          >
            <div className="drag-btn">
              <Drag />
            </div>
            {column.title}
          </div>
        </div>
      )}
    </Draggable>
  );
}
