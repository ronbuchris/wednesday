import { useState } from 'react';
import Edit from 'monday-ui-react-core/dist/icons/Edit';

export function StatusMenu({
  changeStatus,
  toggleMenus,
  toggleMenu,
  board,
  item,
}) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="status-menu">
      <div className="labels-list">
        {board.columns[1].labels.map((label) => {
          return (
            <div
              key={label.color}
              className="label"
              style={{ backgroundColor: label.color }}
              onClick={(ev) => {
                ev.stopPropagation();
                changeStatus(item.id);
                toggleMenu(toggleMenus);
              }}
            >
              {label.title}
            </div>
          );
        })}
      </div>
      <div className="divider"></div>
      <div
        className="edit-label flex align-center justify-center btn"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsEdit(!isEdit);
        }}
      >
        {!isEdit && <Edit />}
        {isEdit ? 'Apply' : 'Add/Edit Labels'}
      </div>
    </div>
  );
}
