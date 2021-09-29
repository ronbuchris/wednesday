import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleMenu } from '../store/actions/board.actions';

export function _WorkspaceMenu({ workspaces, toggleMenu, toggleMenus }) {
  return (
    <div className="workspace-menu br8">
      <div className="list-category">My workspaces</div>
      {workspaces.map((workspace) => {
        return (
          <div
            key={workspace._id}
            className="workspace-option menu-button-wrapper flex align-center br4"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus);
            }}
          >
            <Link to={`/workspace/${workspace._id}`}>{workspace.name}</Link>
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

const mapDispatchToProps = {
  toggleMenu,
};

export const WorkspaceMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceMenu);
