import Delete from 'monday-ui-react-core/dist/icons/Delete';

export function BoardMenu({ board, onRemoveBoard, toggleMenus, toggleMenu }) {
  return (
    <div className="board-menu menu-modal">
      <div className="menu-section fs14">
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
      </div>
    </div>
  );
}
