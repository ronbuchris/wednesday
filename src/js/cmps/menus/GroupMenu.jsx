import { FaAngleRight } from 'react-icons/fa';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import { ColorPallete } from '../dynamic-cmps/ColorPallete';

export function GroupMenu({ group, isColor, onRemoveGroup, colorPicker,changeGroupColor,toggleMenus,toggleMenu }) {
  return (
    <div className="group-menu-modal br8">
      <div className="group-menu-section">
        <div className="btn header-btn">Collapse this group</div>
        <div className="btn header-btn">Collapse all Groups</div>
        <div className="btn header-btn">Select all items</div>
      </div>
      <div className="divider"></div>
      <div className="group-menu-section">
        <div className="btn header-btn">Add group</div>
        <div className="btn flex space-between align-center header-btn">
          Duplicate this group <FaAngleRight />
        </div>
        <div className="btn flex space-between align-center header-btn">
          Move group to board <FaAngleRight />
        </div>
      </div>
      <div className="divider"></div>
      <div className="group-menu-section">
        <div className="btn header-btn">Rename group</div>
        <div className="color-picker">
          <div className="btn header-btn" onClick={colorPicker}>
            <div className="change-group-color flex align-center">
              <div
                className="group-color"
                style={{ backgroundColor: group.style.color }}
              ></div>
              Change group color
            </div>
          </div>
          {isColor && (
            <div className="color-pallete">
              <ColorPallete
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
                colorPicker={colorPicker}
                changeGroupColor={changeGroupColor}
              />
            </div>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="group-menu-section">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveGroup(group.id);
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
