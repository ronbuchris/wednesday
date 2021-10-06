import Close from 'monday-ui-react-core/dist/icons/Close';
import Duplicate from 'monday-ui-react-core/dist/icons/Duplicate';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
export function SelectedPopup({ selectedItems, groups }) {
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
      <div className="number flex align-center justify-center">
        {selectedItems?.length}
      </div>
      <div className="title-section flex column">
        <div className="title">
          Item{selectedItems.length > 1 ? 's' : ''} selected
        </div>
        <div className="items-dot flex align-center">{itemsDots()}</div>
      </div>
      <div className="duplicate-items btn flex column align-center space-evenly">
        <Duplicate />
        Duplicate
      </div>
      <div className="delete-items btn flex column align-center space-evenly">
        <Delete />
        Delete
      </div>
      <div className="unselect btn flex align-center justify-center">
        <Close />
      </div>
    </div>
  );
}
