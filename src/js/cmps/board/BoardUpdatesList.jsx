


export function BoardUpdatesList({ board }) {
    return (
        <div>
            {board.groups.map(group => {
               return group.items.map(item => {
                    return item.updates.map(update => {
                        return <div key={update.id}>
                            {update.txt}
                        </div>
                    })
                })
            })}
        </div>
    )
}