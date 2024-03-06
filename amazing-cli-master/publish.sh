# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 读取package.json中的version
version=`jq -r .version package.json`

# 提交版本更新代码到github
git add .
git cm -m "update $version"
git push

# 发布到npm，pnpm(高性能的npm)
pnpm publish



