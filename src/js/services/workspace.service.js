

const gWorkspaces=[
    {
        "_id":"w101",
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
                            "person":[],
                            "status":{
                                "type":"status",
                                "title":"done",
                                "bgcolor":"green",
                            },
                            "date":1589983468418,

                        },
                        {
                            "id": "c102",
                            "title": "Replace logo",
                            "person":[],
                            "status":{
                                "type":"status",
                                "title":"done",
                                "bgcolor":"green",
                            },
                            "date":1589983468418,

                        },
                    ],
                    "style": {
                        "color":"blue",
                    }
                },
               
            ],
            "activities": [],
            // for monday
            "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
        }]
    }
];
