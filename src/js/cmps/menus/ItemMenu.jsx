import { FaAngleRight } from 'react-icons/fa';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import { ColorPallete } from '../dynamic-cmps/ColorPallete';

export function ItemMenu({ item, onRemoveItem, toggleMenus, toggleMenu }) {
  return (
    <div className="item-menu-modal br8">
      <div className="item-menu-section">
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
