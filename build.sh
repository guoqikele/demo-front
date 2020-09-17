#!/bin/bash
echo $PATH
npm config set proxy null
npm config set https-proxy null
npm config set registry https://registry.npm.taobao.org
node -v
npm -v
npm install
npm run build