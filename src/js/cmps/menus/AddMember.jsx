import { connect } from 'react-redux';
import React from 'react';

import { editBoard } from '../../store/actions/board.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';

class _AddMember extends React.Component {
  state = {
    title: '',
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState({ title: value });
  };

  onAddMember = async () => {
    const { workspace, user, editBoard, users } = this.props;
    const { title } = this.state;
    editBoard(workspace, title, user, users);
  };

  render() {
    const { title } = this.state;
    const { toggleMenus, toggleMenu } = this.props;
    return (
      <div className="add-modal flex column space-evenly br8">
        <div
          className="close-add-workspace btn"
          onClick={() => {
            toggleMenu(toggleMenus);
          }}
        >
          <div className="close-modal header-btn flex align-center">
            <Close />
          </div>
        </div>
        <div className="create-title">Invite new members</div>
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
                placeholder="New Board"
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
  editBoard,
};

export const AddMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddMember);
