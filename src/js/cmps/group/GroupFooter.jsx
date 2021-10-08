import { StatusFooter } from './StatusFooter';
import { NumberFooter } from '../group/NumberFooter';
import { NumberMenu } from '../menus/NumberMenu';

export function GroupFooter({ board, group, toggleMenus, toggleMenu }) {
  return (
    <div className="group-footer flex">
      <div className="empty-cell-cmp group-title"></div>
      {board.columns.map((column) => {
        return column.type === 'status' ? (
          <StatusFooter
            key={column.type}
            board={board}
            group={group}
            column={column}
          />
        ) : column.type === 'number' ? (
          <>
            <NumberFooter
              key={column.type}
              board={board}
              group={group}
              column={column}
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
            />
            {toggleMenus.numberMenu === group.id && <NumberMenu />}
          </>
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
