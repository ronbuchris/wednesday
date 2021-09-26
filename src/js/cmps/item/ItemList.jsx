import { Component } from 'react';
import { connect } from 'react-redux';

import { onRemoveItem} from '../../store/actions/item.actions'

class _ItemList extends Component {
render() {
  const { item, onBlur, group, onRemoveItem, workspace} = this.props
  return (
    <div className="item-preview">
      <div
        className="left-indicator"
        style={{ backgroundColor: group.style.color }}
        ></div>
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, item.title, item, 'item');
        }}
        >
        {item.title}
      </div>
      <div style={{ backgroundColor: item.status.bgcolor }}>
        {item.status.title}
      </div>
      <button onClick={() => {
        onRemoveItem(workspace,group,item.id)
        console.log('removed');
      }}>Remove</button>
      <div className="left-indicator"></div>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    workspace: state.workspaceModule.workspace,
    groups: state.groupModule.groups,
  };
}

const mapDispatchToProps = {
  onRemoveItem
};
export const ItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ItemList);
