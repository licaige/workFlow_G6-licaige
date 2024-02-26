#!/bin/bash

root=$(pwd)
echo $root

rm -rf $root/html

cd $root/main-app && pnpm build
cd $root/app-01 && pnpm build
cd $root/app-02 && pnpm build

mkdir -p $root/html/sub/

mv $root/main-app/dist/* $root/html
mv $root/app-01/dist $root/html/sub/app-01
mv $root/app-02/dist $root/html/sub/app-02
