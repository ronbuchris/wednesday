import { connect } from 'react-redux';
import React from 'react';
import { addWorkspace } from '../../store/actions/workspace.actions';

class _AddWorkspace extends React.Component {
  state = {
    title: '',
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState({title: value});
  };


  onAddWorkspace = async (ev) => {
    const { user, addWorkspace, workspace, history} =this.props;
    const {title} = this.state
    await addWorkspace(user, title)
  };

  render() {
    const { title } = this.state;
    return (
      <div className="add-workspace-modal br8">
        <div className="create-workspace-title">Create Workspace</div>
        <div className="workspace-icon">ICON</div>
        <div className="add-workspace-input-wrapper">
          <div className="workspace-new-title-name">Workspace name</div>
          <div className="workspace-title-input">
            <form className="title-input" onSubmit={this.onAddWorkspace}>
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
        <div className="new-workspace-container-btn">
          <div className="cancel-btn">
            <button className="cancel-workspace-btn">Cancel</button>
          </div>
          <div className="create-btn">
            <button className="create-workspace-btn" onClick={(ev) => {
              ev.preventDefault();
              this.onAddWorkspace()
            }}>Create Workspace</button>
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
  addWorkspace
};

export const AddWorkspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddWorkspace);
