import { useState } from 'react';
import Edit from 'monday-ui-react-core/dist/icons/Edit';

export function StatusMenu({
  toggleMenus,
  toggleMenu,
  onEditItem,
  board,
  group,
  item,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const onChangeStatus = (item, group, label, type) => {
    const columnIdx = item.columns.findIndex((column) => column.type === type);
    const newItem = item.columns.splice(columnIdx, 1, label);

    onEditItem(newItem, group);
  };

  return (
    <div className="status-menu flex column space-between">
      <div className="labels-list full">
        {board.columns[1].labels.map((label) => {
          return (
            <div
              key={label.color}
              className="label"
              style={{ backgroundColor: label.color }}
              onClick={(ev) => {
                ev.stopPropagation();
                onChangeStatus(item, group, label);
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
