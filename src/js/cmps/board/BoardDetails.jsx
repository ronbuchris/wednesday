import { Component } from 'react';
import { GroupPreview } from '../group/GroupPreview';

export class BoardDetails extends Component {

  render() {
    const { board } = this.props;
    console.log(board);
    if (!board) return <div className="">loading</div>;
    return (
      <div className="groups-container">
        {board.groups.map((group) => {
          return <GroupPreview key={group.id} group={group} />;
        })}
      </div>
    );
  }
}

