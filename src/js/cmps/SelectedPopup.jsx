import Close from 'monday-ui-react-core/dist/icons/Close';
import Duplicate from 'monday-ui-react-core/dist/icons/Duplicate';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import { eventBusService } from '../services/event-bus.service';

export function SelectedPopup({
  saveUndoWorkspace,
  toggleSelected,
  duplicateItems,
  selectedItems,
  removeItem,
  workspace,
  groups,
  board,
}) {
  const saveUndo = (workspace) => {
    const undoWorkspace = JSON.parse(JSON.stringify(workspace));
    saveUndoWorkspace(undoWorkspace);
  };

  const itemsDots = () => {
    return groups.map((group) =>
      group.items.map((item) => {
        if (selectedItems.includes(item.id)) {
          return (
            <div
              className="dot-item"
              key={item.id}
              style={{ backgroundColor: group.style.color }}
            ></div>
          );
        }
      })
    );
  };

  return (
    <div className="selected-popup flex">
      <div className="number flex auto-center">{selectedItems?.length}</div>
      <div className="title-section flex column">
        <div className="title">
          Item{selectedItems.length > 1 ? 's' : ''} selected
        </div>
        <div className="items-dot flex align-center">{itemsDots()}</div>
      </div>
      <div
        className="duplicate-items action btn flex column align-center space-evenly"
        onClick={() => {
          saveUndo(workspace);
          duplicateItems(workspace, board, selectedItems);
          eventBusService.emit('user-msg', {
            txt: `We successfully duplicated ${selectedItems.length} ${
              selectedItems.length > 1 ? 'items' : 'item'
            }`,
            type: '',
          });
        }}
      >
        <Duplicate />
        Duplicate
      </div>
      <div
        className="delete-items action btn flex column align-center space-evenly"
        onClick={() => {
          saveUndo(workspace);
          removeItem(workspace, board, selectedItems);
          eventBusService.emit('user-msg', {
            txt: `We successfully deleted ${selectedItems.length} ${
              selectedItems.length > 1 ? 'items' : 'item'
            }`,
            type: '',
          });
        }}
      >
        <Delete />
        Delete
      </div>
      <div
        className="unselect btn action flex auto-center"
        onClick={() => toggleSelected(board, [])}
      >
        <Close />
      </div>
    </div>
  );
}
