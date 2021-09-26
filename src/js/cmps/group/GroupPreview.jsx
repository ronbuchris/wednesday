import React from 'react';
import { connect } from 'react-redux';

import { ItemList } from '../item/ItemList';
import {onEditItem} from '../../store/actions/item.actions'
import {setGroup} from '../../store/actions/group.actions'



class _GroupPreview extends React.Component{
  state = {
    addItem:'',
    isFocused:false,
  }

  handleChange=({target})=>{
    const value = target.value;
    this.setState({ addItem: value  });
  }

  clearState=()=>{
   this.setState({addItem:'',isFocused:false})
  }

  // onAddItem=async(ev)=>{
  //   ev.preventDefault();
  //   await this.props.onEditItem(this.state.addItem,this.props.group.id)
  //   this.clearState();
  // }

  onBlur=()=>{
    const {isFocused}=this.state;
    if(!isFocused) return
    this.setState({isFocused:!isFocused})
  }

  onFocus=()=>{
    const {isFocused}=this.state;
    if(isFocused) return
    this.setState({isFocused:!isFocused})
  }

  onKeyUp=(ev)=>{
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.target.blur();
    }
  }

  render() {   
    const { group, onBlur, board,onAddItem }=this.props;
    const {addItem,isFocused}=this.state
    console.log(`isFocused123`, isFocused)
    return (
      <div key={group.id} className="group-preview">
      <div className="group-header">
        <div
          className="group-name"
          style={{ color: group.style.color }}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => {
            onBlur(ev.target.innerText, group.title, group, 'group');
          }}
          >
          {group.title}
        </div>
        <div className="group-column-list">
          {board.cmpsOrder.map((cmp) => {
            return <div key={cmp}>{cmp}</div>;
          })}
        </div>
      </div>
      <div className="item-list">
        {group.items.map((item) => {
          return (
            <ItemList onBlur={onBlur} key={item.id} item={item} group={group} />
            );
          })}
      </div>
      <div className="item-add">
      <form className="login-form" onSubmit={(ev)=>{
          onAddItem(ev,addItem,group)
          this.clearState()
        }}>
        <input 
        type='text' 
        dir='auto' 
        className='item-add-input' 
        placeholder='+ Add' 
        value={addItem}
        onChange={this.handleChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyUp={this.onKeyUp}
        />

        {(isFocused||addItem) && <button onClick={(ev)=>{
          onAddItem(ev,addItem,group)
          this.clearState()
        }
        }>Add</button>}
        </form>
        </div>
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
  onEditItem,
  setGroup
};
export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);