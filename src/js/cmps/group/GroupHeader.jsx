import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';


export function GroupHeader({ board, group, onBlur }) {
  return (
    <div className="group-header flex">
      <div
        className="group-title flex align-center"
        style={{ color: group.style.color }}
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, group.title, group, 'group');
        }}
      >
        {group.title}
      </div>
      <div className="group-column-list flex">
        {board.columns.map((column) => {

          return (
            <div
              className="group-column-header"
              key={column.id}
              style={{ minWidth: column.width }}
            >
              {column.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
