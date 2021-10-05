import { PostUpdate } from './PostUpdate';

export function ItemUpdatesList({ item, onPost }) {
  return (
    <div className="item-updates-container">
      <PostUpdate onPost={onPost} />
      <div className="">
        {item.updates.map((update) => {
          return (
            <div className="update-card" key={update.id}>
              <div className="post-header flex">
                <img src={update.createdBy.img} alt="user-img" />
                <div className="username-wrapper">
                  {update.createdBy.fullname}
                </div>
              </div>
              {update.txt}
            </div>
          );
        })}
      </div>
    </div>
  );
}
