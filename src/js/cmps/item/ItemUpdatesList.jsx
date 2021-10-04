import { PostUpdate } from "./PostUpdate";


export function ItemUpdatesList({ item, onPost}) {
    return (
        <div className="item-updates-container">
            <PostUpdate onPost={onPost}/>
            <div className="">
                {item.updates.map(update => {
                    return <div className="update-card" key={update.id}>
                        {update.txt}
                    </div>
                })}
            </div>
        </div>
    )
}