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
  loadBoard,
  toggleMenu,
  changeView,
} from '../store/actions/board.actions';

import { BoardList } from './board/BoardList';
import { WorkspaceMenu } from './WorkspaceMenu';
import { AddWorkspace } from './workspace/AddWorkspace';
import { AddBoard } from './board/AddBoard';
import { AddMember } from './menus/AddMember';

class _WorkspaceNav extends Component {
  state = {
    isHovered: false,
  };

  componentDidMount() {
    this.props.loadWorkspaces(this.props.user);
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.props.loadWorkspace(value);
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
          className={`collapse-button-component flex align-center justify-center btn ${
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
              <div className="workspace-title flex align-center">
                <div
                  className="workspace-icon large flex align-center justify-center"
                  // style={{ backgroundColor: }}
                >
                  {workspace.name?.substring(0, 1)}
                </div>
                <h2>{workspace.name}</h2>
              </div>
              <DropdownChevronDown />
              {toggleMenus.workspaceMenu && (
                <WorkspaceMenu toggleMenus={toggleMenus} />
              )}
            </div>
            <button
              className="flex menu-button-wrapper align-center"
              onClick={() => {
                toggleMenu(toggleMenus, 'isBoardModal', true);
              }}
            >
              <Add />
              <span>Add</span>
            </button>
            <button className="flex menu-button-wrapper align-center">
              <Filter />
              <span>Filter</span>
            </button>
            <button className="flex menu-button-wrapper align-center search">
              <Search />
              <span>Search</span>
            </button>
            <div className="divider"></div>
            <BoardList
              boardId={board ? board._id : workspace.boards[0]}
              workspace={workspace}
              onRemoveBoard={onRemoveBoard}
              changeView={changeView}
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
            />
          </>
        )}
        {toggleMenus.isWorkspaceModal && (
          <AddWorkspace toggleMenus={toggleMenus} toggleMenu={toggleMenu} />
        )}
        {toggleMenus.isBoardModal && (
          <AddBoard toggleMenus={toggleMenus} toggleMenu={toggleMenu} />
        )}
        {toggleMenus.isMemberModal && (
          <AddMember toggleMenus={toggleMenus} toggleMenu={toggleMenu} />
        )}
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
  toggleNav,
  loadBoard,
  editWorkspace,
  toggleMenu,
  changeView,
};
export const WorkspaceNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceNav);
