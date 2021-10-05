import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';

import { editBoard } from '../../store/actions/board.actions';
import Close from 'monday-ui-react-core/dist/icons/Close';

class _AddBoard extends React.Component {
  state = {
    title: '',
    isFocus: false,
  };

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState({ ...this.state, title: value });
  };

  onAddBoard = async () => {
    const { workspace, user, editBoard, users, history } = this.props;
    const { title } = this.state;
    await editBoard(workspace, title, user, users);
    history.push(`/board/${workspace.boards[workspace.boards.length - 1]._id}`);
  };

  render() {
    const { title, isFocus } = this.state;
    const { toggleMenus, toggleMenu } = this.props;
    return (
      <div className="add-modal flex column space-evenly br8">
        <div
          className="btn"
          onClick={() => {
            toggleMenu(toggleMenus);
          }}
        >
          <div className="close-modal header-btn flex align-center">
            <Close />
          </div>
        </div>
        <div className="create-title">Create Board</div>
        <div>
          <div>Board name</div>
          <div className={`title-input-container ${isFocus ? 'focused' : ''}`}>
            <form
              className="title-input"
              onSubmit={(ev) => {
                ev.preventDefault();
                this.onAddBoard();
                toggleMenu(toggleMenus);
              }}
            >
              <input
                ref={(inputEl) => (this.searchInput = inputEl)}
                name="title"
                id="title"
                type="text"
                placeholder="New Board"
                value={title}
                onChange={this.handleChange}
                onBlur={() => this.setState({ ...this.state, isFocus: false })}
                onFocus={() => this.setState({ ...this.state, isFocus: true })}
              />
            </form>
          </div>
        </div>
        <div className="new-container-btn flex">
          <div
            className="cancel-btn header-btn"
            onClick={() => {
              toggleMenu(toggleMenus);
            }}
          >
            Cancel
          </div>
          <div
            className="create-btn br4"
            onClick={(ev) => {
              ev.stopPropagation();
              this.onAddBoard();
              toggleMenu(toggleMenus);
            }}
          >
            Create Board
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    users: state.userModule.users,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  editBoard,
};

export const AddBoard = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_AddBoard)
);
