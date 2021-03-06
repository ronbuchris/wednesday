import { FaAngleRight } from 'react-icons/fa';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import Duplicate from 'monday-ui-react-core/dist/icons/Duplicate';
import { ColorPallete } from '../dynamic-cmps/ColorPallete';

export function GroupMenu({
  group,
  isColor,
  onRemoveGroup,
  colorPicker,
  changeGroupColor,
  toggleMenus,
  toggleMenu,
  onEditGroup,
  board,
}) {
  return (
    <div className="group-menu menu-modal br8">
      <div className="menu-section fs14">
        <div className="btn header-btn">Collapse this group</div>
        <div className="btn header-btn">Collapse all Groups</div>
        <div className="btn header-btn">Select all items</div>
      </div>
      <div className="divider"></div>
      <div className="menu-section fs14">
        <div
          className="btn header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            toggleMenu(toggleMenus);
            onEditGroup('New Group', group.id, board);
          }}
        >
          Add group
        </div>
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            toggleMenu(toggleMenus);
            onEditGroup(group, group.id, board, 'Duplicate');
          }}
        >
          <Duplicate />
          Duplicate this group
        </div>
        <div className="btn flex space-between align-center header-btn">
          Move group to board <FaAngleRight />
        </div>
      </div>
      <div className="divider"></div>
      <div className="menu-section fs14">
        <div className="btn header-btn">Rename group</div>
        <div className="color-picker">
          <div
            className="btn header-btn flex align-center"
            onClick={colorPicker}
          >
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
      <div className="menu-section fs14">
        <div
          className="btn flex align-center header-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemoveGroup(group.id);
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
