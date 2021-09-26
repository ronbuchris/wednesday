import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export function _WorkspaceMenu({ workspaces }) {
  return (
    <div className="workspace-menu br8">
      <div className="list-category">My workspaces</div>
      {workspaces.map((workspace) => {
        return (
          <Link key={workspace._id} to={`/workspace/${workspace._id}`}>
            <div className="workspace-option">{workspace.name}</div>
          </Link>
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
