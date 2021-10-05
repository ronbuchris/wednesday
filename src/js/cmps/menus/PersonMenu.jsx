import { BsEnvelope } from 'react-icons/bs';
import { connect } from 'react-redux';
import { saveItem} from '../../store/actions/item.actions'
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
  saveItem
}) {
  const onAddMember = (member) => {
  item.columns[findIdx('member')].members.unshift(member)
  const newItem = JSON.parse(JSON.stringify(item))
  saveItem(newItem, user, workspace, group, null, board, '')
}
  return (
    <div className="person-menu menu-modal flex column">
      <div className="search-person">
        <input type="text" placeholder="Enter name" />
      </div>
      <div className="item-member-list flex">
        {item.columns[findIdx('member')].members.map((member) => {
          return (
            <div className="member-box fs12 flex align-center" key={member._id}>
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
            <div className="wrapper" key={member._id} onClick={() => {
              onAddMember(member)
            }}>
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

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    user: state.userModule.user,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  saveItem
};

export const PersonMenu = connect(mapStateToProps, mapDispatchToProps)(_PersonMenu)

