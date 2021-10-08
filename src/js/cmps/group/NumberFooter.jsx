export function NumberFooter({ board, group, column }) {
  return (
    <div
      className="status-footer flex"
      onClick={(ev) => {
        ev.preventDefault();
        toggleMenu(toggleMenus, 'numberMenu', group.id);
      }}
    ></div>
  );
}
