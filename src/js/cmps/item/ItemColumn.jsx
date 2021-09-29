import { Screen } from '../../pages/Screen';
import { StatusMenu } from '../menus/StatusMenu';

export function ItemColumn({
  column,
  board,
  item,
  toggleMenus,
  toggleMenu,
  changeStatus,
}) {
  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <div
            className="item-column status-col flex cell-cmp btn"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus, 'statusMenu', item.id);
            }}
            style={{
              backgroundColor: column.label.color,
              minWidth: board.columns[1].width,
            }}
          >
            {column.label.title}
            {toggleMenus.statusMenu === item.id && (
              <StatusMenu
                item={item}
                board={board}
                toggleMenus={toggleMenus}
                toggleMenu={toggleMenu}
                changeStatus={changeStatus}
              />
            )}
            {toggleMenus.statusMenu && <Screen toggleMenus={toggleMenus} />}
          </div>
        );

      case 'member':
        return (
          <div
            className="item-column member-col flex cell-cmp btn"
            style={{
              minWidth: board.columns[0].width,
            }}
          >
            {column.members.map((member) => {
              return (
                <img
                  key={member._id}
                  src={member.img}
                  className="profile-icon"
                  alt="member-img"
                />
              );
            })}
          </div>
        );

      default:
        return 'foo';
    }
  };

  return <>{renderSwitch(column)}</>;
}
