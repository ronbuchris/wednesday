import { Component } from 'react';
import { connect } from 'react-redux';

import Add from 'monday-ui-react-core/dist/icons/Add';
import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Search from 'monday-ui-react-core/dist/icons/Search';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import NavigationChevronRight from 'monday-ui-react-core/dist/icons/NavigationChevronRight';
import NavigationChevronLeft from 'monday-ui-react-core/dist/icons/NavigationChevronLeft';

import { BoardList } from './board/BoardList';
import {
  loadWorkspaces,
  loadWorkspace,
  toggleNav,
} from '../store/actions/workspace.actions';
import { addBoard, loadBoard } from '../store/actions/board.actions';
import { WorkspaceMenu } from './WorkspaceMenu';
import boardService from '../services/board.service'

class _WorkspaceNav extends Component {
  state = {
    isHovered: false,
    isOpenMenu: false,
  };

  componentDidMount() {
    this.props.loadWorkspaces(this.props.user);
  }


  handleChange = ({ target }) => {
    const value = target.value;
    this.props.loadWorkspace(value);
  };

  onAddBoard = () => {
    const { workspace, user } = this.props;
    const newBoard= boardService.createBoard(user);
    const newWorkspace={...workspace,boards:[...workspace.boards,newBoard]}
    this.props.editWorkspace(newWorkspace);
  };

  handleHover = () => {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      isOpenMenu: !prevState.isOpenMenu,
    }));
  };

  render() {
    const { workspaces, workspace,isOpenNav, toggleNav } = this.props;
    const { isHovered, isOpenMenu } = this.state;
    if (!workspaces.length || !workspace) return <div>loading</div>;
    return (
      <div
        className={`workspace-nav flex column ${
          isOpenNav && !isHovered && 'close'
        }
      ${isOpenNav && isHovered && 'hovered'}`}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <div
          className={`collapse-button-component flex align-center justify-center ${
            (!isOpenNav || isHovered) && 'is-pinned'
          }`}
          onClick={() => toggleNav()}
        >
          {isOpenNav ? <NavigationChevronRight /> : <NavigationChevronLeft />}
        </div>

        {(!isOpenNav || isHovered) && (
          <>
            <div className="dropdown-header flex space-between">
              <span>Workspace</span>
              <Menu />
            </div>

            <div
              className="workspace-dropdown-button br4 flex space-between align-center"
              onClick={this.toggleMenu}
            >
              <div className="workspace-title">
                <h2>{workspace.name}</h2>
              </div>
              <DropdownChevronDown />
              {isOpenMenu && <WorkspaceMenu />}
            </div>

            {/* <select name="" id="" onChange={this.handleChange}>
              {workspaces.map((workspace) => {
                return (
                  <option key={workspace._id} value={workspace._id}>
                    {workspace.name}
                  </option>
                );
              })}
            </select> */}

            <button
              className="flex menu-button-wrapper align-center"
              onClick={this.onAddBoard}
            >
              <Add />
              <span>Add</span>
            </button>
            <button className="flex menu-button-wrapper align-center">
              <Filter />
              <span>Filter</span>
            </button>
            <button className="flex menu-button-wrapper align-center">
              <Search />
              <span>Search</span>
            </button>

            <div className="board-list">
              <BoardList workspace={workspace} />
            </div>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    isOpenNav: state.workspaceModule.isOpenNav,
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  loadWorkspaces,
  loadWorkspace,
  addBoard,
  toggleNav,
  loadBoard,
};
export const WorkspaceNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceNav);
