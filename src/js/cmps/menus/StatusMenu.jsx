export function StatusMenu({
  changeStatus,
  toggleMenus,
  toggleMenu,
  board,
  item,
}) {
  return (
    <div className="status-menu">
      <div className="labels-list">
        {board.columns[1].labels.map((label) => {
          return (
            <div
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
    </div>
  );
}
