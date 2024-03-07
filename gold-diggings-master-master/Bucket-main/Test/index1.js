let arr = [{
    id: '1',
    data:[{
        buildingID: "UINO_T2",
        buildingName: "T2"
    }]
},{
    id: '2',
    data:[{
        buildingID: "UINO_T1",
        buildingName: "T1"
    }]
},{
    id: '3',
    data:[{
        buildingID: "UINO_T1",
        buildingName: "T1"
    }]
},{
    id: '4',
    data:[{
        buildingID: "UINO_T2",
        buildingName: "T2"
    }]
}]

let res = arr.reduce((acc,cur) => {
    if(!acc[cur.data[0].buildingID]){
        acc[cur.data[0].buildingID] = [];
    }
    acc[cur.data[0].buildingID].push(cur);
    return acc
},{})

console.log(res);