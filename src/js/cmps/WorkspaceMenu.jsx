import { render } from '@testing-library/react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Screen } from '../pages/Screen';

import { toggleMenu } from '../store/actions/workspace.actions';
import { AddWorkspace } from '../cmps/workspace/AddWorkspace';

export class _WorkspaceMenu extends React.Component {
  state={
    isAddWorkspace:false,
  }

  onAddWorkspace=()=>{
    const {isAddWorkspace} = this.state
    this.setState({isAddWorkspace:!isAddWorkspace})
  }

  render(){
   const { workspaces, toggleMenu } =this.props
   const {isAddWorkspace}=this.state
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
            toggleMenu(false);
          }}
          >
            <Link to={`/workspace/${workspace._id}`}>{workspace.name}</Link>
          </div>
        );
      })}
      <div className="workspace-action">
        <div className="add-workspace" onClick={(ev) =>{
          ev.preventDefault();
          this.onAddWorkspace()
        }}>
          Add workspace
        {isAddWorkspace &&<AddWorkspace/>}
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
