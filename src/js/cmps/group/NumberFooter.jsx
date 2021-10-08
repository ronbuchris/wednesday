export function NumberFooter({
  toggleMenus,
  toggleMenu,
  column,
  group,
  board,
}) {
  return (
    <div
      className="status-footer flex"
      onClick={(ev) => {
        ev.preventDefault();
        toggleMenu(toggleMenus, 'numberMenu', group.id);
      }}
    >
      Hii
    </div>
  );
}
