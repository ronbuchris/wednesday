import { FaPlus } from 'react-icons/fa';

import user from '../../../assets/img/user.svg';
import { StatusMenu } from '../menus/StatusMenu';
import { PersonMenu } from '../menus/PersonMenu';
import { DatePicker } from '../menus/DatePicker';

export function ItemColumn({
  toggleMenus,
  toggleMenu,
  onEditItem,
  column,
  board,
  group,
  item,
  workspace,
}) {
  const findIdx = (type) => {
    const idx = board.cmpsOrder.findIndex((column) => column === type);
    return idx;
  };

  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <div
            className="status fill"
            style={{
              backgroundColor: column.label.color,
              minWidth: board.columns[findIdx('status')].width,
            }}
          >
            <span className="fold"></span>
            <div
              className="item-column status-col flex cell-cmp btn"
              onClick={(ev) => {
                ev.stopPropagation();
                toggleMenu(toggleMenus, 'statusMenu', item.id);
              }}
            >
              {column.label.title}
            </div>
            {toggleMenus.statusMenu === item.id && (
              <StatusMenu
                toggleMenus={toggleMenus}
                onEditItem={onEditItem}
                toggleMenu={toggleMenu}
                workspace={workspace}
                board={board}
                group={group}
                item={item}
              />
            )}
          </div>
        );

      case 'member':
        return (
          <div
            onClick={(ev) => {
              ev.preventDefault();
              toggleMenu(toggleMenus, 'personMenu', item.id);
            }}
            className="item-column member-col flex cell-cmp btn"
            style={{
              minWidth: board.columns[findIdx('member')].width,
            }}
          >
            <div className="add-member justify-center align-center">
              <FaPlus className="plus" />
            </div>
            {!column.members.length && (
              <img
                className="profile-icon"
                src={user}
                alt="member-placeholder"
              />
            )}
            {column.members &&
              column.members.map((member) => {
                return (
                  <img
                    key={member._id}
                    src={member.img}
                    className="profile-icon"
                    alt="member-img"
                  />
                );
              })}
            <div className="add-member-modal">
              {toggleMenus.personMenu === item.id && (
                <PersonMenu
                  toggleMenus={toggleMenus}
                  toggleMenu={toggleMenu}
                  workspace={workspace}
                  findIdx={findIdx}
                  group={group}
                  item={item}
                />
              )}
            </div>
          </div>
        );
      case 'date':
        return (
          <div
            className="date btn cell-cmp"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus, 'dateMenu', item.id);
            }}
          >
            <div className="date-border">
              <div
                className="item-column date-col flex align-center justify-center btn"
                style={{
                  minWidth: board.columns[findIdx('date')].width - 10,
                }}
              >
                {column.date.substr(4)}
              </div>
            </div>
            {toggleMenus.dateMenu === item.id && (
              <DatePicker
                workspace={workspace}
                toggleMenus={toggleMenus}
                onEditItem={onEditItem}
                toggleMenu={toggleMenu}
                board={board}
                group={group}
                item={item}
              />
            )}
          </div>
        );

      default:
    }
  };

  return <>{renderSwitch(column)}</>;
}
