import { Component } from 'react';
import { connect } from 'react-redux';


class _MainApp extends Component {
  render() {
    const {board } = this.props
    return (
      <div className="app">
        <BoardHeader board={board}/>
        <BoardDetails board={board}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {};
export const MainApp = connect(mapStateToProps, mapDispatchToProps)(_MainApp);
