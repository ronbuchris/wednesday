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
      <div className="search-person"></div>
      <div className="item-member-list flex">
        {item.columns[findIdx('member')].members.map((member) => {
          return (
            <div className="member-box flex align-center">
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
      <div className="members-list br4 flex column">
        {workspace.members.map((member) => {
          return (
            <div className="add-member-box flex">
              <div className="img-user">
                <img src={member.img} alt="member-img" />
              </div>
              <div className="fullname-user">{member.fullname}</div>
            </div>
          );
        })}
        <div
          className="invite"
          onClick={() => {
            toggleMenu(toggleMenus, 'isMemberModal', true);
          }}
        >
          Invite a new member by username
        </div>
      </div>
    </div>
  );
}
