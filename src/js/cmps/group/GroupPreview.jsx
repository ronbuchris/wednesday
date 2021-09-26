import React from 'react';
import { connect } from 'react-redux';

import { ItemList } from '../item/ItemList';
import { onEditItem, loadItems} from '../../store/actions/item.actions'
import {setGroup} from '../../store/actions/group.actions'



class _GroupPreview extends React.Component{
  state = {
    addItem:'',
    isFocused:false,
  }

componentDidMount(){
  this.props.loadItems(this.props.group)
}

  handleChange=({target})=>{
    const value = target.value;
    this.setState({ addItem: value  });
  }

  clearState=()=>{
   this.setState({addItem:'',isFocused:false})
  }

  onBlur=()=>{
    const {isFocused}=this.state;
    this.setState({isFocused:!isFocused})
  }

  onFocus=()=>{
    const {isFocused}=this.state;
    this.setState({isFocused:!isFocused})
  }

  render() {   
    const { group, onBlur, board, onAddItem, items }=this.props;
    if (!items) return <div>loading</div>
    const {addItem,isFocused}=this.state
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
        {items.map((item) => {
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
        onFocus={this.onFocus}/>
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
    items: state.itemModule.items,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onEditItem,
  setGroup,
  loadItems
};
export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);