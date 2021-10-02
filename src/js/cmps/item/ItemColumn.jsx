import { StatusMenu } from '../menus/StatusMenu';
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
            className="item-column member-col flex cell-cmp btn"
            style={{
              minWidth: board.columns[findIdx('member')].width,
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
