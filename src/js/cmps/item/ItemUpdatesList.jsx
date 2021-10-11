import { PostUpdate } from './PostUpdate';
import ReactTimeAgo from 'react-time-ago';
import Time from 'monday-ui-react-core/dist/icons/Time';
import { FaCaretDown } from 'react-icons/fa';
import { UpdateMenu } from '../menus/UpdateMenu';

export function ItemUpdatesList({ item, onPost, toggleMenu, toggleMenus }) {
  return (
    <div className="item-updates-container">
      <PostUpdate onPost={onPost} />
      <div className="">
        {item.updates.map((update) => {
          return (
            <div className="update-card br8" key={update.id}>
              <div className="post-header flex align-center">
                <div className="post-title flex">
                  <img src={update.createdBy.img} alt="user-img" />
                  <div className="username-wrapper">
                    {update.createdBy.fullname}
                  </div>
                  <div className="post-top-right-wrapper flex fs14">
                    <div className="time flex auto-center">
                      <Time />
                      <ReactTimeAgo
                        date={update.createdAt}
                        locale="en-US"
                        timeStyle="mini"
                      />
                    </div>
                    <div
                      className="options btn flex auto-center br4"
                      onClick={() =>
                        toggleMenu(toggleMenus, 'updateMenu', update.id)
                      }
                    >
                      <FaCaretDown />
                    </div>
                    {toggleMenus.updateMenu === update.id && (
                      <UpdateMenu
                        toggleMenus={toggleMenus}
                        toggleMenu={toggleMenu}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                className="body-text"
                dangerouslySetInnerHTML={{ __html: update.txt }}
              ></div>
              <div className="post-action flex ">
                <div className="like-post-wrapper ">
                  <div className="like-post btn">Like</div>
                </div>
                <div className="divider-height"></div>
                <div className="reply-post-wrapper ">
                  <div className="reply-post btn">Reply</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
