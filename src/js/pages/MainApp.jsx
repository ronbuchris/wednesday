import { Component } from 'react';
import { connect } from 'react-redux';
import { WorkspaceNav } from '../cmps/WorkspaceNav';
// import { SidebarNav } from '../cmps/SidebarNav';

class _MainApp extends Component {
  render() {
    return (
      <div className="app">
        {/* <SidebarNav /> */}
        <WorkspaceNav />

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
