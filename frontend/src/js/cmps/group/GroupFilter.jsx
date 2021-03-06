export function GroupFilter({ board, groups, onFilter, groupsIds }) {
  const isFilter = (groupId) => {
    return groupsIds.includes(groupId);
  };

  return (
    <div className="column-option">
      <div className="title">Group</div>
      <div className="options-container flex column">
        {board.groups.map((group) => {
          return (
            <div
              key={group.id}
              className={`flex filter-item align-center br4 header-btn space-between ${
                isFilter(group.id) ? 'filter' : ''
              }`}
              onClick={() => {
                onFilter(group.id, '', true);
              }}
            >
              <div className="text-wrapper flex align-center">
                <div
                  className="color-div"
                  style={{ backgroundColor: group.style.color }}
                ></div>
                <div className="filter-group-list-text">{group.title}</div>
              </div>
              <div>{group.items.length}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
