import { StatusFooter } from './StatusFooter';
import { NumberFooter } from '../group/NumberFooter';
import { NumberMenu } from '../menus/NumberMenu';

export function GroupFooter({
  board,
  group,
  toggleMenus,
  toggleMenu,
  onEditBoard,
}) {
  return (
    <div className="group-footer flex">
      <div className="empty-cell-cmp group-title"></div>
      {board.columns.map((column, idx) => {
        return column.type === 'status' ? (
          <StatusFooter
            key={column.id}
            board={board}
            group={group}
            column={column}
          />
        ) : column.type === 'number' ? (
          <div className="number-container">
            <NumberFooter
              key={column.id}
              columnIdx={idx}
              board={board}
              group={group}
              column={column}
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
            />
            {toggleMenus.numberMenu === group.id && (
              <NumberMenu
                board={board}
                column={column}
                group={group}
                onEditBoard={onEditBoard}
              />
            )}
          </div>
        ) : (
          <div
            key={column.id}
            style={{ minWidth: column.width }}
            className="empty-footer-column"
          ></div>
        );
      })}
      <div className="empty-cell-end"></div>
    </div>
  );
}
