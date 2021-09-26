import { storageService } from "./async-storage.service"
import { workspaceService } from "./workspace.service"

export const boardService = { getById, save }
const STORAGE_KEY = 'workspaceDB'
function getById(workspace, boardId) {
    return workspace.boards.find(board => board._id === boardId)

}

async function save(newBoard) {
    const boardId = newBoard._id;
    const workspaces = await storageService.query(STORAGE_KEY)
    workspaces.forEach(workspace => {
        workspace.boards.forEach((board, idx) => {
            if (board._id === boardId) {
                workspace.boards.splice(idx, 1, newBoard)
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

export function createBoard(user) {
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
                "id": "column102",
                "type": "member",
                "title": "Owner",
                "pos": 1,
                "width": 140,
                "members": [
                    {
                        "id": "_u102",
                        "fullname": "On Chetrit",
                        "img": "http://some-img"
                    },
                    {
                        "_id": "user101",
                        "fullname": "Adir Cohen",
                        "img": "http://some-img"
                    },
                    {
                        "_id": "user103",
                        "fullname": "Ron Buchris",
                        "img": "http://some-img"
                    }
                ]
            },
            {
                "id": "column101",
                "type": "status",
                "title": "status",
                "pos": 2,
                "width": 140,
                "labels": [
                    {
                        "title": "Done",
                        "color": "green"
                    },
                    {
                        "title": "stuck",
                        "color": "red"
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
                        "createdBy": {
                            "_id": user._id,
                            "fullname": user.fullname,
                            "img": user.imgUrl
                        },
                        "createdAt": Date.now(),
                    },
                    {
                        "id": makeId(),
                        "title": "New Item",
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
                        "createdBy": {
                            "_id": user._id,
                            "fullname": user.fullname,
                            "img": user.imgUrl
                        },
                        "createdAt": Date.now(),

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