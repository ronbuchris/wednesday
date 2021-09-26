export function ItemColumn({ column, board, item }) {
  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <div
            className="item-column status-col flex"
            style={{
              backgroundColor: column.bgcolor,
              minWidth: board.columns[0].width,
            }}
          >
            {column.title}
          </div>
        );

      case 'member':
        return (
          <div
            className="item-column member-col flex"
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
