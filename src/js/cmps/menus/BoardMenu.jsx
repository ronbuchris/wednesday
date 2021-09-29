import Delete from 'monday-ui-react-core/dist/icons/Delete';

export function BoardMenu({ board, onRemoveBoard, toggleMenus, toggleMenu }) {
  return (
    <div className="board-menu menu-modal br8">
      <div className="menu-section">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveBoard(board._id);
            toggleMenu(toggleMenus);
          }}
        >
          <Delete />
          Delete
        </div>
        <div className="btn header-btn">Archive</div>
      </div>
    </div>
  );
}
