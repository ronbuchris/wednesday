import { render } from '@testing-library/react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../store/actions/board.actions';
import { AddWorkspace } from '../cmps/workspace/AddWorkspace';
import { toggleNav } from '../store/actions/workspace.actions';

export class _WorkspaceMenu extends React.Component {

  render(){
   const { workspaces, toggleMenu,toggleMenus} =this.props
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
      <div className="workspace-action">
        <div className="add-workspace" onClick={(ev) =>{
          ev.stopPropagation();
          toggleMenu(toggleMenus,'isWorkspaceModal',true)
        }}>
          Add workspace
        </div>
        <div className="browse-all">
          Browse all
        </div>

      </div>

    </div>
  )
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
