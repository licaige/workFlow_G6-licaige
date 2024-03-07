let slogan = {
    lastSentance: '牛年掘金沸点游',
    nextSentance: '成为大佬不用愁',
    summary: '街溜子'
}
function becomeBoss(slogan, way, action) {
    if (way === 'juejin' && action === 'execute') {
        format(slogan);
    } else {
        console.log('快上掘金！');
    }
}
function format({ lastSentance, nextSentance, summary }) {
    console.log('    ' + summary);
    (lastSentance + nextSentance).split('').forEach((item, index, arr) => {
        if (index < lastSentance.length) {
            console.log(item + '         ' + arr[index + 7] + '\n');
        }
    })
}
becomeBoss(slogan, 'juejin', 'execute');