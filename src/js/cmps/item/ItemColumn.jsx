export function ItemColumn({ column }) {
  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <div
            className="item-column status-col"
            style={{ backgroundColor: column.bgcolor }}
          >
            {column.title}
          </div>
        );

      case 'member':
        return (
          <div className="item-column member-col">
            {column.members.map((member) => {
              return (
                <img
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
