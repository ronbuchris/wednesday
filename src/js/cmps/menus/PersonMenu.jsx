import { BsEnvelope } from 'react-icons/bs';
import Close from 'monday-ui-react-core/dist/icons/Close';
export function PersonMenu({
  toggleMenus,
  toggleMenu,
  group,
  item,
  workspace,
  findIdx,
}) {
  return (
    <div className="person-menu menu-modal flex column">
      <div className="search-person">
        <input type="text" placeholder="Enter name" />
      </div>
      <div className="item-member-list flex">
        {item.columns[findIdx('member')].members.map((member) => {
          return (
            <div className="member-box fs12 flex align-center">
              <div className="user-wrapper flex align-center">
                <img src={member.img} alt="user-img" />
                {member.fullname}
              </div>
              <div className="clear-btn flex align-center justify-center">
                <Close />
              </div>
            </div>
          );
        })}
      </div>
      <div className="divider"></div>
      <div className="members-list  flex column">
        {workspace.members.map((member) => {
          return (
            <div className="wrapper">
              <div className="add-member-box br4 btn flex">
                <div className="img-user">
                  <img src={member.img} alt="member-img" />
                </div>
                <div className="fullname-user full">
                  <span>{member.fullname}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="invite br4 flex align-center"
          onClick={() => {
            toggleMenu(toggleMenus, 'isMemberModal', true);
          }}
        >
          <BsEnvelope />
          Invite a new member by username
        </div>
      </div>
    </div>
  );
}
