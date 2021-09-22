import { Component } from 'react';
import { connect } from 'react-redux';
import { BoardList } from './board/BoardList';
import { loadWorkspaces } from '../store/actions/workspace.actions';

class _WorkspaceNav extends Component {
state={
}

  componentDidMount() {
    this.props.loadWorkspaces();
  }

  render() {
    const { workspaces } = this.props;
    if(!workspaces.length) return <div>loading</div>
    return (
      <div className="workspace-nav">
        <select name="" id="">
          {workspaces.map((workspace) => {
            return (
              <option key={workspace._id} value={workspace.name}>
                {workspace.name}
              </option>
            );
          })}
        </select>

        <button>Add</button>
        <button>Filters</button>
        <button>Search</button>

        <div className="">
          <BoardList workspace={workspaces[0]}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  loadWorkspaces,
};
export const WorkspaceNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceNav);
