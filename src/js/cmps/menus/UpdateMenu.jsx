import Delete from 'monday-ui-react-core/dist/icons/Delete';

export function UpdateMenu({ board, onRemoveUpdate, toggleMenus, toggleMenu }) {
  return (
    <div className="update-menu menu-modal">
      <div className="menu-section fs14">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            // onRemoveUpdate(board._id);
            toggleMenu(toggleMenus);
          }}
        >
          <Delete />
          Delete update for everyone
        </div>
      </div>
    </div>
  );
}
