import { Component } from 'react';
import { connect } from 'react-redux';
import { BoardDetails } from '../cmps/board/BoardDetails';
import { BoardHeader } from '../cmps/board/BoardHeader';

class _MainApp extends Component {
  render() {
    return (
      <div className="app">
        <BoardHeader />
        <BoardDetails />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {};
export const MainApp = connect(mapStateToProps, mapDispatchToProps)(_MainApp);
