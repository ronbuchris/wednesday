import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const groupService = {
    save
}

async function save(newGroup, boardForAdd) {
    const workspaces = await storageService.query(STORAGE_KEY)
   return workspaces.find(workspace => {
      return  workspace.boards.find((board) => {
            if (boardForAdd) {
                if(board._id===boardForAdd._id){
                    const newAddGroup = _createGroup();
                    console.log(`newAddGroup`, newAddGroup)
                    board.groups.unshift(newAddGroup);
                    console.log(`workspaceworkspaceworkspace`, workspace)
                   return storageService.put(STORAGE_KEY, workspace)
                }
            }else{
                const groupId = newGroup.id;
                board.groups.forEach((group, idx) => {
                    if (group.id === groupId) {
                        board.groups.splice(idx, 1, newGroup)
                       return storageService.put(STORAGE_KEY, workspace)
                    }
                })
            }
        })
    })
}

function _createGroup() {
    return {
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
                "date": 1589983468418,

            }
        ],
        "style": {
            "color": "brown",
        }
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