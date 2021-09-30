import { StatusMenu } from '../menus/StatusMenu';

export function ItemColumn({
  toggleMenus,
  toggleMenu,
  onEditItem,
  column,
  board,
  group,
  item,
}) {
  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <>
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
            </div>
            {toggleMenus.statusMenu === item.id && (
              <StatusMenu
                toggleMenus={toggleMenus}
                onEditItem={onEditItem}
                toggleMenu={toggleMenu}
                board={board}
                group={group}
                item={item}
              />
            )}
          </>
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
