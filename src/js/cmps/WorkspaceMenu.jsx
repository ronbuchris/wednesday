import { connect } from 'react-redux';

export function _WorkspaceMenu({ workspaces }) {
  return (
    <div className="workspace-menu br8">
      <div className="list-category">My workspaces</div>
      {workspaces.map((workspace) => {
        return (
          <div key={workspace._id} className="workspace-option">
            {workspace.name}
          </div>
        );
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
  };
}

export const WorkspaceMenu = connect(mapStateToProps, null)(_WorkspaceMenu);
