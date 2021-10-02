import { connect } from 'react-redux';
import React from 'react';
import { editBoard } from '../../store/actions/board.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';

class _AddBoard extends React.Component {
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

  onAddBoard = async () => {
    const { workspace, user, editBoard, users } = this.props;
    const { title } = this.state;
    editBoard(workspace, title, user, users);
  };

  render() {
    const { title } = this.state;
    const { toggleMenus, toggleMenu } = this.props;
    return (
      <div className="add-workspace-modal flex column space-evenly br8">
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
        <div className="create-workspace-title">Create Board</div>
        <div className="add-workspace-input-wrapper">
          <div className="workspace-new-title-name">Board name</div>
          <div className="workspace-title-input">
            <form
              className="title-input"
              onSubmit={(ev) => {
                ev.preventDefault();
                this.onAddBoard();
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
        <div className="new-workspace-container-btn flex">
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
              this.onAddBoard();
              toggleMenu(toggleMenus);
            }}
          >
            Create Board
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

export const AddBoard = connect(mapStateToProps, mapDispatchToProps)(_AddBoard);
