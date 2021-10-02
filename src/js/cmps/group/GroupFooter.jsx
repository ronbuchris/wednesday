import { StatusFooter } from './StatusFooter';

export function GroupFooter({ board, group }) {
  return (
    <div className="group-footer flex">
      <div className="empty-cell-cmp group-title"></div>
      {board.columns.map((column) => {
        return column.type === 'status' ? (
          <StatusFooter
            key={column.id}
            board={board}
            group={group}
            column={column}
          />
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
