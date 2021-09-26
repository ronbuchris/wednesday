import { Component } from 'react';
import { GroupPreview } from '../group/GroupPreview';

export class BoardContent extends Component {
  render() {
    const { board, onBlur, onAddItem, groups } = this.props;
    if (!board) return <div className="">loading</div>;
    return (
      <div className="board-content">
        {groups.map((group) => {
          console.log(`groupgroupgroupgroupgroup`, group)
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
