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
            <GroupPreview
              onBlur={onBlur}
              key={group.id}
              group={group}
              board={board}
            />
          );
        })}
      </div>
    );
  }
}
