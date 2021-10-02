export function GroupFilter({ groups, onFilter }) {
  return (
    <div className="column-option">
      <div className="title">Group</div>
      <div className="options-container flex column">
        {groups.map((group) => {
          return (
            <div
              key={group.id}
              className="flex filter-item align-center br4 header-btn"
              onClick={() => {
                onFilter(group.id);
              }}
            >
              <div>{group.title}</div>
              <div>{group.items.length}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
