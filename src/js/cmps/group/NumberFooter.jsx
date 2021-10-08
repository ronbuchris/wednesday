export function NumberFooter({
  toggleMenus,
  toggleMenu,
  column,
  group,
  board,
}) {
  return (
    <div
      style={{ minWidth: column.width }}
      className="status-footer flex"
      onClick={(ev) => {
        ev.preventDefault();
        toggleMenu(toggleMenus, 'numberMenu', group.id);
      }}
    ></div>
  );
}
