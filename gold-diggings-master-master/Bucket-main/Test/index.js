// 按buildingID分类[]
let arr = [{
    id: 'RUIN_001_009',
    name: 'RUIN_001_009',
    data:[{
        buildingID: "UINO_T2"
        buildingName: "T2"
        direction: ""
        floor: "F2"
        id: "elevator_9"
        name: "elevator_9"
        state: "运行"
        type: ""
    }]
},{
    id: 'RUIN_001_019',
    name: 'RUIN_001_019',
    data:[{
        buildingID: "UINO_T2"
        buildingName: "T2"
        direction: ""
        floor: "F2"
        id: "elevator_9"
        name: "elevator_9"
        state: "运行"
        type: ""
    }]
}]

let object = {
    UINO_T1:[{
        buildingID: "UINO_T1"
        buildingName: "T1"
        direction: ""
        floor: "F2"
        id: "elevator_03"
        name: "elevator_03"
        state: "停运"
        type: ""
    }],
    UINO_T2:[{
        buildingID: "UINO_T1"
        buildingName: "T1"
        direction: ""
        floor: "F2"
        id: "elevator_03"
        name: "elevator_03"
        state: "停运"
        type: ""
    }]
}

let resArray = [{
    id: 'UINO_T2',
    name: 'T2',
    data:[{
        buildingID: "UINO_T2"
        buildingName: "T2"
        direction: ""
        floor: "F2"
        id: "elevator_9"
        name: "elevator_9"
        state: "运行"
        type: ""
    }]
},{
    id: 'UINO_T1',
    name: 'T1',
    data:[{
        buildingID: "UINO_T1"
        buildingName: "T1"
        direction: ""
        floor: "F2"
        id: "elevator_9"
        name: "elevator_9"
        state: "运行"
        type: ""
    }]
}]



// const dataClassify = arr => {
//     const map = {};
//     arr.reduce((pre,{id,name,data}) => {
//         id = data.buildingID;
//         name = data.buildingName;
//         data.forEach(item => {
//             map[item.buildingID] = [];
//             map[item.buildingID].push(item)
//         });
//         pre = [...pre,]
//     },[])
// }