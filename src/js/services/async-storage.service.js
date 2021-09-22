export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

const gWorkspaces = [
    {
        "_id": "w101",
        "name": "Workspace-1",
        "description": "desc-workspace",
        "createdAt": 1489983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "boards": [
            {
                "_id": "b101",
                "title": "Robot dev proj",
                "createdAt": 1589983468418,
                "description": "desc-board",
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                // "columns":{
                //     "status":{
                //         "type":"status",
                //         "labels":[
                //             {
                //                 "title":"done",
                //                 "bgcolor":"green"
                //             },
                //             {
                //                 "title":"working on",
                //                 "bgcolor":"yellow"
                //             },
                //             {
                //                 "title":"stuck",
                //                 "bgcolor":"red"
                //             },
                //         ]
                //     },
                //     "owner":{
                //         "type":"people",
                //         "members":[
                //             {
                //                 "id":"f101",
                //                 "fullname":"On Chetrit",
                //                 "img":"http://some-img",
                //             },
                //             {
                //                 "id":"f101",
                //                 "fullname":"Adir Cohen",
                //                 "img":"http://some-img",
                //             },
                //             {
                //                 "id":"f101",
                //                 "fullname":"Ron Buchris",
                //                 "img":"http://some-img",
                //             },
                //         ]
                //     },
                // },
                "groups": [
                    {

                        "id": "g101",
                        "title": "Group 1",
                        "items": [
                            {
                                "id": "c101",
                                "title": "Replace logo",
                                "person": [],
                                "status": {
                                    "type": "status",
                                    "title": "done",
                                    "bgcolor": "green",
                                },
                                "date": 1589983468418,

                            },
                            {
                                "id": "c102",
                                "title": "Replace logo",
                                "person": [],
                                "status": {
                                    "type": "status",
                                    "title": "done",
                                    "bgcolor": "green",
                                },
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "blue",
                        }
                    },

                ],
                "activities": [],
                // for monday
                "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
            }]
    }
];

_save('workspaceDB', gWorkspaces)


function query(entityType, delay = 1200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    newEntity.inStock = true;
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}