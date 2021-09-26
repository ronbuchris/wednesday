import { BoardActions } from './BoardActions';

export function BoardHeader({ board,onBlur,onAddItem,onAddGroup }) {
  return (
    <div className="board-header">
      <div contentEditable="true"
           suppressContentEditableWarning={true}
           onBlur={(ev)=>{
             onBlur(ev.target.innerText,board.title,board,'board');
           }}>{board.title}</div>
      <div contentEditable="true"
           suppressContentEditableWarning={true}
           onBlur={(ev)=>{
             onBlur(ev.target.innerText,board.description,board,'boardDesc');
           }}>{board.description}</div>
      <BoardActions onAddGroup={onAddGroup} onAddItem={onAddItem} board={board}/>
    </div>
  );
}
