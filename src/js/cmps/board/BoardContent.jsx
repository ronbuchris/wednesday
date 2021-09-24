import { Component } from 'react';
import { GroupPreview } from '../group/GroupPreview';

export class BoardContent extends Component {
  render() {
    const { board, onBlur } = this.props;
    if (!board) return <div className="">loading</div>;
    return (
      <div className="board-content">
        {board.groups.map((group) => {
          return (
            <div key={group.id} className="group-container">
              <div className="group-header">
                <div
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onBlur={(ev) => {
                    onBlur(ev.target.innerText, group.title, group, 'group');
                  }}
                >
                  {group.title}
                </div>
                <div>
                  {board.cmpsOrder.map((cmp) => {
                    return <div key={cmp}>{cmp}</div>;
                  })}
                </div>
              </div>
              <GroupPreview onBlur={onBlur} key={group.id} group={group} />
            </div>
          );
        })}
      </div>
    );
  }
}
