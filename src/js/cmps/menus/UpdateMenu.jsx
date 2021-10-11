import Delete from 'monday-ui-react-core/dist/icons/Delete';

export function UpdateMenu({ item,idx, onRemoveUpdate, toggleMenus, toggleMenu }) {
  return (
    <div className="update-menu menu-modal">
      <div className="menu-section fs14">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveUpdate(item,idx);
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
