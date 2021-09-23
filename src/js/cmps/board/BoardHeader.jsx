import { BoardActions } from "./BoardActions";

export function BoardHeader({board}) {
    return (
        <div>
            <p>header:{board.title}</p>
            <p>description:{board.description}</p>
            <BoardActions />
        </div>
    )
}