import { Component } from 'react';
import { connect } from 'react-redux';

import Add from 'monday-ui-react-core/dist/icons/Add';
import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Search from 'monday-ui-react-core/dist/icons/Search';

import { BoardList } from './board/BoardList';
import {
  loadWorkspaces,
  loadWorkspace,
} from '../store/actions/workspace.actions';

class _WorkspaceNav extends Component {
  state = {
    workspaceId: null,
  };

  componentDidMount() {
    this.props.loadWorkspaces(this.props.user);
    console.log(`this.props.user`, this.props.user);
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.props.loadWorkspace(value);
  };

  render() {
    const { workspaces, workspace, user } = this.props;
    if (!workspaces.length || !workspace) return <div>loading</div>;
    return (
      <div className="workspace-nav">
        <h5>Workspace</h5>
        <select name="" id="" onChange={this.handleChange}>
          {workspaces.map((workspace) => {
            return (
              <option key={workspace._id} value={workspace._id}>
                {workspace.name}
              </option>
            );
          })}
        </select>

        <button className="flex">
          <Add />
          <span>Add</span>
        </button>
        <button className="flex">
          <Filter />
          <span>Filter</span>
        </button>
        <button className="flex">
          <Search />
          <span>Search</span>
        </button>

        <div className="">
          <BoardList workspace={workspace} />
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
  loadWorkspaces,
  loadWorkspace,
};
export const WorkspaceNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceNav);
