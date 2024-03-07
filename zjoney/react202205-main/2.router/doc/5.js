//捕获分组
console.log('1ab'.match(/1[a-z]([b-c])/));//1ab b就放在了分组里
//非捕获分组 表示分组的值不捕获，不要了，不放在结果里
console.log('1ab'.match(/1[a-z](?:[b-c])/));
console.log('11-22'.replace(/(?<x>\d{2})-(?<y>\d{2})/, "$<y>-$<x>"));