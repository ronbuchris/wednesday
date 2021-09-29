import { Component } from 'react';
import { GroupPreview } from '../group/GroupPreview';
import { Dashboard } from './Dashboard';

export class BoardContent extends Component {
  render() {
    const { board, onBlur, onAddItem, groups, onEditGroup, isViewChange } = this.props;
    if (!groups.length) return <div className="">No groups to show</div>;
    return (
      <div className="board-content">
        {isViewChange && <Dashboard board={board}/>}
        {!isViewChange && groups.map((group) => {;
          return (
            <GroupPreview
            onEditGroup={onEditGroup}
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
