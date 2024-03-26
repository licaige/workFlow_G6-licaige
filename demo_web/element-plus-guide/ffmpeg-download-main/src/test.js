import fs from 'fs'

let content = fs.readFileSync('./video/downloaded.txt', 'utf-8');
console.log('fileStream', content.split(`\n`))
content += `新的内容\n`

fs.writeFileSync('./video/downloaded.txt', content)