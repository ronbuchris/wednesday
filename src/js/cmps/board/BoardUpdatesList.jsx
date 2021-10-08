export function BoardUpdatesList({ board }) {
  return (
    <div className="item-updates-container">
      {board.groups.map((group) => {
        return group.items.map((item) => {
          return item.updates.map((update) => {
            return (
              <div className="update-card" key={update.id}>
                <div className="post-header flex">
                  <img src={update.createdBy.img} alt="user-img" />
                </div>
                <div className="username-wrapper">
                  {update.createdBy.fullname}
                </div>
                {update.txt}
              </div>
            );
          });
        });
      })}
    </div>
  );
}
