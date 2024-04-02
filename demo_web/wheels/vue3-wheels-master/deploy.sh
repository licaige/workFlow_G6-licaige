rm -rf dist &&
npm run build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:wuchuan123/vue3-wheels-dist.git &&
git push -f -u origin master &&
cd -
