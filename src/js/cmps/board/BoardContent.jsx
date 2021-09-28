import { Component } from 'react';
import { GroupPreview } from '../group/GroupPreview';

export class BoardContent extends Component {
  render() {
    const { board, onBlur, onAddItem, groups } = this.props;
    if (!groups.length) return <div className="">No groups to show</div>;
    return (
      <div className="board-content">
        {groups.map((group) => {;
          return (
            <GroupPreview
            onBlur={onBlur}
            key={group.id}
              group={group}
              board={board}
              onAddItem={onAddItem}
            />
          );
        })}
      </div>
    );
  }
}
