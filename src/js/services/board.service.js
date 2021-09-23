import { storageService } from "./async-storage.service"
import {workspaceService} from "./workspace.service"

export const boardService = { getById, addBoard,save }
const STORAGE_KEY = 'workspaceDB'
function getById(workspace, boardId) {
    return workspace.boards.find(board => board._id === boardId)
    
}

async function save(newBoard) {
    const boardId=newBoard._id;
    const workspaces= await storageService.query(STORAGE_KEY)
    workspaces.forEach(workspace =>{
        workspace.boards.forEach((board,idx) =>{
                if(board._id===boardId){
                    workspace.boards.splice(idx,1,newBoard)
                    storageService.put(STORAGE_KEY, workspace)
                }
            
        })
    })
}

function addBoard(workspace, user) {
    const board = _createBoard(user)
    workspace.boards.push(board)
    workspaceService.save(workspace)
}

function _createBoard(user) {
    return {
        "_id": makeId(),
        "title": "New Board",
        "createdAt": Date.now(),
        "description": "Click to add description",
        "createdBy": {
            "_id": user._id,
            "fullname": user.fullname,
        },
        "style": { },
        "groups": [
            {
                "id": makeId(),
                "title": "New Group",
                "items": [
                    {
                        "id": makeId(),
                        "title": "New Item",
                        "person": [],
                        "status": {
                            "type": "status",
                            "title": "done",
                            "bgcolor": "green",
                        },
                        "date": Date.now(),
                    },
                    {
                        "id": makeId(),
                        "title": "New Item",
                        "person": [],
                        "status": {
                            "type": "status",
                            "title": "warning",
                            "bgcolor": "red",
                        },
                        "date": Date.now(),

                    },
                ],
                "style": {
                    "color": "blue",
                }
            },

        ],
        "activities": [],
        "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
    }
}


function makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}