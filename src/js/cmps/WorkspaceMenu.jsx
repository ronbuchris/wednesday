import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddSmall from 'monday-ui-react-core/dist/icons/AddSmall';

import { toggleMenu } from '../store/actions/board.actions';

class _WorkspaceMenu extends React.Component {
  render() {
    const { workspaces, toggleMenu, toggleMenus } = this.props;
    return (
      <div className="workspace-menu">
        <div className="section">
          <div className="list-category">My workspaces</div>
          {workspaces.map((workspace) => {
            return (
              <Link key={workspace} to={`/workspace/${workspace._id}`}>
                <div
                  key={workspace._id}
                  className="workspace-option menu-button-wrapper flex align-center br4"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    toggleMenu(toggleMenus);
                  }}
                >
                  <div
                    className="workspace-icon flex align-center justify-center"
                    // style={{ backgroundColor: }}
                  >
                    {workspace.name?.substring(0, 1)}
                  </div>
                  {workspace.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="section">
          <div
            className="add-workspace menu-button-wrapper br4 flex align-center"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus, 'isWorkspaceModal', true);
            }}
          >
            <div className="icon flex align-center">
              <AddSmall />
            </div>
            Add workspace
          </div>
        </div>
      </div>
    );
  }
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
