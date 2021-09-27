


export function ItemUpdates({updates}) {
    console.log(updates);
    return (
        <div>
            {updates.map(update => {
                return (
                    <div key={update.id} className="update-card">
                        <h1>{update.createBy.fullname}</h1>
                       <p>{update.txt}</p> 
                    </div>
                )
            })}
        </div>
    )
}