
import Board from 'monday-ui-react-core/dist/icons/Board';

export function BoardUpdatesList({ board }) {
    return (
        <div className="item-updates-container">
            {board.groups.map(group => {
               return group.items.map(item => {
                   return item.updates.map((update) => {
                       return (
                           <div className="update-card br8" key={update.id}>
                               <div className="post-header flex align-center">
                                   <img src={update.createdBy.img} alt="user-img" />
                                   <div className="username-wrapper">
                                       {update.createdBy.fullname}
                                   <div className='flex align-center'>
                                       <Board/>{`${board.title} > ${group.title} > ${item.title}`}
                                   </div>
                                   </div>
                               </div>
                               <div className="body-text" dangerouslySetInnerHTML={{ __html: update.txt }}></div>
                               <div className="post-action flex ">
                                   <div className="like-post-wrapper ">
                                       <div className="like-post btn">Like</div>
                                   </div>
                                   <div className="reply-post-wrapper ">
                                       <div className="reply-post btn">Reply</div>
                                   </div>
                               </div>
                           </div>
                       );
                   })
                })
            })}
        </div>
    )
}