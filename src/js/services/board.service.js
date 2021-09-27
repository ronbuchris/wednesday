import { storageService } from "./async-storage.service"
import {workspaceService} from "./workspace.service"
import { createGroup } from './group.service'

export const boardService = { getById, save, getBoardById}
const STORAGE_KEY = 'workspaceDB'

function getById(workspace, boardId) {
    return workspace.boards.find(board => board._id === boardId)
}
//without access to workspace
async function getBoardById(boardId){
    const workspaces = await storageService.query(STORAGE_KEY)
    const workspace = workspaces.find(workspace => {
        return workspace.boards.find(board => board._id === boardId)
    })
    const board = workspace.boards.find(board => board._id === boardId)
    return Promise.resolve(board)

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

// function addBoard(workspace, user) {
//     const board = _createBoard(user)
//     workspace.boards.push(board)
//     workspaceService.save(workspace)
// }

export function createBoard(user,users) {
    const members = users.map(user => { return { "_id": user._id, "fullname": user.fullname, "img": user.img } })
    return {
        "_id": makeId(),
        "title": "New Board",
        "createdAt": Date.now(),
        "description": "Click to add description",
        "createdBy": {
            "_id": user._id,
            "fullname": user.fullname,
            "imgUrl": user.img,
        },
        "columns": [
            {
                id: makeId(),
                type: "member",
                title: "Owner",
                pos: 1,
                width: 140,
                members
            },
            {
                id: makeId(),
                type: "status",
                title: "Status",
                pos: 2,
                width: 140,
                labels: [
                    {
                        title: "Done",
                        color: "#00c875"
                    },
                    {
                        title: "Stuck",
                        color: "#e2445c"
                    },
                    {
                        title: "Working on it",
                        color: " #fdab3d"
                    }
                ]
            }

        ],
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
                "columns": [
                    {
                        "type": "member",
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Adir Cohen",
                                "img": `https://robohash.org/adir`,
                            }
                        ]
                    },
                    {
                        "type": "status",
                        "label": {
                            "title": "Done",
                            "color": "green"
                        }

                    },
                ],
                "style": {
                    "color": "blue",
                }
            },
        ],
        "activities": [],
        "cmpsOrder": ["status", "member", "date"]
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