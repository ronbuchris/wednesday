import { Component } from 'react';
import { connect } from 'react-redux';

import Add from 'monday-ui-react-core/dist/icons/Add';
import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Search from 'monday-ui-react-core/dist/icons/Search';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import NavigationChevronRight from 'monday-ui-react-core/dist/icons/NavigationChevronRight';
import NavigationChevronLeft from 'monday-ui-react-core/dist/icons/NavigationChevronLeft';

import {
  loadWorkspaces,
  loadWorkspace,
  toggleNav,
  editWorkspace,
} from '../store/actions/workspace.actions';
import {
  addBoard,
  loadBoard,
  toggleMenu,
  changeView,
} from '../store/actions/board.actions';

import { BoardList } from './board/BoardList';
import { WorkspaceMenu } from './WorkspaceMenu';
import { createBoard } from '../services/board.service';
import { Screen } from '../pages/Screen';

class _WorkspaceNav extends Component {
  state = {
    isHovered: false,
    // isOpenMenu: false,
  };

  componentDidMount() {
    this.props.loadWorkspaces(this.props.user);
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.props.loadWorkspace(value);
  };

  onAddBoard = async () => {
    const { workspace, user, editWorkspace, users } = this.props;
    const newBoard = await createBoard(user, users);
    const newWorkspace = {
      ...workspace,
      boards: [...workspace.boards, newBoard],
    };
    editWorkspace(newWorkspace);
  };

  handleHover = () => {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  };

  render() {
    const {
      workspaces,
      workspace,
      isOpenNav,
      toggleNav,
      board,
      onRemoveBoard,
      toggleMenu,
      toggleMenus,
      changeView,
    } = this.props;
    const { isHovered } = this.state;
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
              className="workspace-dropdown-button br4 flex space-between align-center btn"
              onClick={() => {
                toggleMenu(toggleMenus, 'workspaceMenu', workspace._id);
              }}
            >
              <div className="workspace-title">
                <h2>{workspace.name}</h2>
              </div>
              <DropdownChevronDown />
              {toggleMenus.workspaceMenu && (
                <WorkspaceMenu toggleMenus={toggleMenus} />
              )}
            </div>
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
            <div className="divider"></div>
            <div className="board-list">
              <BoardList
                boardId={board ? board._id : workspace.boards[0]}
                workspace={workspace}
                onRemoveBoard={onRemoveBoard}
                changeView={changeView}
              />
            </div>
          </>
        )}
        {toggleMenus.workspaceMenu && <Screen toggleMenus={toggleMenus} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    toggleMenus: state.workspaceModule.toggleMenus,
    isOpenNav: state.workspaceModule.isOpenNav,
    users: state.userModule.users,
    user: state.userModule.user,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  loadWorkspaces,
  loadWorkspace,
  addBoard,
  toggleNav,
  loadBoard,
  editWorkspace,
  createBoard,
  toggleMenu,
  changeView,
};
export const WorkspaceNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceNav);
