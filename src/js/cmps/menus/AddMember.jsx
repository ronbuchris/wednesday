import { connect } from 'react-redux';
import React from 'react';

import { saveItem } from '../../store/actions/item.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';

class _AddMember extends React.Component {
  state = {
    title: '',
    memberId: ''
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState({ title: value });
  };
  findUser = (userId) => {
    const { workspace} = this.props;
    const user = workspace.createdBy._id === userId ? workspace.createdBy : 
      workspace.members.find(member => member._id === userId)
      return user
  }

  onAddMember = () => {
    const {memberId} = this.state
    const { workspace, item, saveItem } = this.props;
    const columnIdx = item.columns.findIndex(column => column.type === 'member')
    const user = this.findUser(memberId)
    item.columns[columnIdx].members.push(user)
    console.log(user);
    const newItem = {...item}
    saveItem(newItem, user, workspace, null, false, null, null)
  };
  onSetMember = (memberId) => {
    this.setState({ memberId })
  }

  render() {
    const { title } = this.state;
    const { toggleMenus, toggleMenu, workspace } = this.props;
    return (
      <div className="add-modal flex column space-evenly br8">
        <div
          className="close-add-workspace btn"
          onClick={() => {
            toggleMenu(toggleMenus);
          }}
        >
          <div className="close-modal header-btn flex align-center" >
            <Close />
          </div>
        </div>
        <div className="create-title">Invite new members</div>
        <div>
          <p onClick={() => {
            this.onSetMember(workspace.createdBy._id)
          }}>{workspace.createdBy.fullname}</p>

          {workspace.members.map(member => {
            return <div key={member._id} className='flex'>
              <p onClick={() => {
                this.onSetMember(member._id)
              }}>{member.fullname}</p>
            </div>
          })}
        </div>
        <div>
          <div>invite with username</div>
          <div className="title-input-container">
            <form
              className="title-input"
              onSubmit={(ev) => {
                ev.preventDefault();
                this.onAddMember();
              }}
            >
              <input
                name="title"
                id="title"
                type="text"
                placeholder='Enter a user name'
                value={title}
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="new-container-btn flex">
          <div
            className="cancel-btn header-btn"
            onClick={() => {
              toggleMenu(toggleMenus);
            }}
          >
            Cancel
          </div>
          <div
            className="create-btn br4"
            onClick={(ev) => {
              ev.stopPropagation();
              this.onAddMember();
              toggleMenu(toggleMenus);
            }}
          >
            Invite
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    users: state.userModule.users,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  saveItem,
};

export const AddMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddMember);
