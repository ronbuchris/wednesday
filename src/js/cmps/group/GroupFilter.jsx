


export function GroupFilter({ groups,onFilter }) {
    return (
        <div>
            {groups.map(group => {
                return <div key={group.id} className="group-filter-preview flex" onClick={() => {
                    onFilter(group.id)
                }}>
                    <h3>{group.title}</h3>
                    <p>{group.items.length}</p>
                </div>

            })}
        </div>
    )
}
