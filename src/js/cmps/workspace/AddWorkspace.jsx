import { connect } from 'react-redux';
import React from 'react';
import { addWorkspace } from '../../store/actions/workspace.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';

class _AddWorkspace extends React.Component {
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

  onAddWorkspace = async () => {
    const { user, addWorkspace } = this.props;
    const { title } = this.state;
    await addWorkspace(user, title);
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
        <div className="create-title">Create Workspace</div>
        <div>
          <div>Workspace name</div>
          <div className="title-input-container">
            <form
              className="title-input"
              onSubmit={(ev) => {
                ev.preventDefault();
                this.onAddWorkspace();
                toggleMenu(toggleMenus);
              }}
            >
              <input
                name="title"
                id="title"
                type="text"
                placeholder="New Workspace"
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
              this.onAddWorkspace();
              toggleMenu(toggleMenus);
            }}
          >
            Create Workspace
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
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  addWorkspace,
};

export const AddWorkspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddWorkspace);
