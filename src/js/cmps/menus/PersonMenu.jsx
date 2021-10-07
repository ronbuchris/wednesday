import { BsEnvelope } from 'react-icons/bs';
import { connect } from 'react-redux';
import { saveItem } from '../../store/actions/item.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';
function _PersonMenu({
  toggleMenus,
  toggleMenu,
  group,
  item,
  workspace,
  findIdx,
  user,
  board,
  saveItem,
  users,
}) {
  const onAddMember = (user) => {
    item.columns[findIdx('member')].members.unshift(user);
    const newItem = JSON.parse(JSON.stringify(item));
    saveItem(newItem, user, workspace, group, null, board, '');
  };
  const removePerson = (memberId) => {
    const memberIdx = item.columns[findIdx('member')].members.findIndex(
      (member) => member._id === memberId
    );
    item.columns[findIdx('member')].members.splice(memberIdx, 1);
    const newItem = JSON.parse(JSON.stringify(item));
    saveItem(newItem, user, workspace, group, null, board, '');
  };

  const checkMember = (memberId) => {
    return item.columns[findIdx('member')].members.some((member) => {
      return member._id === memberId;
    });
  };
  return (
    <div className="person-menu menu-modal flex column">
      <div className="item-member-list flex">
        {item.columns[findIdx('member')].members.map((member) => {
          return (
            <div className="member-box fs12 flex align-center" key={member._id}>
              <div className="user-wrapper flex align-center">
                <img src={member.img} alt="user-img" />
                {member.fullname}
              </div>
              <div
                className="clear-btn flex auto-center"
                onClick={() => {
                  removePerson(member._id);
                }}
              >
                <Close />
              </div>
            </div>
          );
        })}
      </div>
      <div className="search-person">
        <input type="text" placeholder="Enter name" />
      </div>
      <div className="divider"></div>
      <div className="members-list  flex column">
        {users.map((user) => {
          const isExcluded = checkMember(user._id);
          if (isExcluded) return <div key={user._id}></div>;
          {
            return (
              <div
                className="wrapper"
                key={user._id}
                onClick={(ev) => {
                  ev.preventDefault();
                  onAddMember(user);
                  toggleMenu(toggleMenus);
                }}
              >
                <div className="add-member-box br4 btn flex">
                  <div className="img-user flex auto-center">
                    <img src={user.img} alt="member-img" />
                  </div>
                  <div className="fullname-user full">
                    <span>{user.fullname}</span>
                  </div>
                </div>
              </div>
            );
          }
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

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    user: state.userModule.user,
    users: state.userModule.users,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  saveItem,
};

export const PersonMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PersonMenu);
