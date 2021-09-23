import { Component } from 'react';
import { connect } from 'react-redux';
import { BoardDetails } from '../cmps/board/BoardDetails';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { loadBoard,onEditBoard } from '../../js/store/actions/board.actions';
import { onEditGroup } from '../../js/store/actions/group.actions';
import { onEditItem } from '../../js/store/actions/item.actions';


import { UserDetails } from '../cmps/UserDetails';

class _MainApp extends Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(this.props.workspace, boardId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if(prevProps.match.params.boardId !==boardId) {
      this.props.loadBoard(this.props.workspace, boardId);
    }
  }

  onBlur=(newTxt,pevTxt,type,strType)=>{
  if(newTxt ===pevTxt)return;
  const newType= strType ==='boardDesc' ? {...type,description:newTxt} :{...type,title:newTxt};
  if(strType==='board' || strType==='boardDesc'){
  this.props.onEditBoard(newType)
  }
  if(strType ==='group'){
  this.props.onEditGroup(newType)
  }
  if(strType ==='item'){
  this.props.onEditItem(newType)
  }
  }

  render() {
    const { board, user } = this.props;
    return (
      <div className="main-app">
        {!board && user &&  <UserDetails user={user}/>}
        {board && <BoardHeader onBlur={this.onBlur} board={board} />}
        {board && <BoardDetails onBlur={this.onBlur} board={board} />}
</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadBoard,
  onEditGroup,
  onEditItem,
  onEditBoard
};

export const MainApp = connect(mapStateToProps, mapDispatchToProps)(_MainApp);
