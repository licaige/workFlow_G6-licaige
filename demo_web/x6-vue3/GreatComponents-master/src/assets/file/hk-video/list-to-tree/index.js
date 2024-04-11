var fs = require("fs");
var source = require("./source.json");

function getChildren (list, pid) {
    const arr = [];
    list.forEach(val => {
        if (val.parentId == pid) {
            const children = getChildren(list, val.id);
            const obj = {
                label: val.name,
                id: val.id,
                indexCode: val.code,
            };
            // 如果有 children 则插入 obj 中
            if (children.length) {
                obj.children = children;
            }
            arr.push(obj);
        }
    })
    return arr
}

function saveFiles (list) {
    const tree = getChildren(list, -1);
    let data = JSON.stringify(tree, null, 4);

    fs.writeFile("tree.json", data, err => {
        if (err) throw err;
        console.log("文件已被保存");
    });
}

saveFiles(source);