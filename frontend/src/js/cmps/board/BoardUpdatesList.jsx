import Board from 'monday-ui-react-core/dist/icons/Board';
import Time from 'monday-ui-react-core/dist/icons/Time';
import ReactTimeAgo from 'react-time-ago';

import { FaCaretDown } from 'react-icons/fa';

export function BoardUpdatesList({ board }) {
  return (
    <div className="item-updates-container">
      {board.groups.map((group) => {
        return group.items.map((item) => {
          return item.updates.map((update) => {
            return (
              <div className="update-card br8" key={update.id}>
                <div className="post-header flex align-center">
                  <div className="post-title flex">
                    <img src={update.createdBy.img} alt="user-img" />
                    <div className="username-wrapper">
                      {update.createdBy.fullname}
                      <div className="board-update flex align-center">
                        <Board />
                        <span className="hover btn">{board.title}</span>
                        {'>'}
                        <span className="hover btn">{group.title}</span>
                        {'>'}
                        <span className="hover btn">{item.title}</span>
                      </div>
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
                      <div className="options btn flex auto-center br4">
                        <FaCaretDown />
                      </div>
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
          });
        });
      })}
    </div>
  );
}
