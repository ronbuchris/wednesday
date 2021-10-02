import Delete from 'monday-ui-react-core/dist/icons/Delete';
import Duplicate from 'monday-ui-react-core/dist/icons/Duplicate';


export function ItemMenu({ item, onRemoveItem, toggleMenus, toggleMenu, onAddItem, group }) {
  return (
    <div className="item-menu menu-modal br8">
      <div className="menu-section">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onAddItem(item, group,false,null,'Duplicate')
            toggleMenu(toggleMenus);
          }}
        >
          <Duplicate />
          Duplicate
        </div>
        <div className="divider"></div>
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveItem(item.id);
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
