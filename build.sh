#!/bin/bash
set -e

if [ $PACKAGE_MANAGER == "pnpm" ]; then
  npm install -g pnpm

  for i in {1..5}; do
    pnpm install --concurrency 8 && break || sleep 1;
  done

  pnpm install babel-template babel-runtime estraverse https://github.com/twbs/bootstrap/archive/6ec9aa34a4b6d43b593b97f9b207410eff8f0152.tar.gz
  npm rebuild node-sass
fi

if [ $PACKAGE_MANAGER == "npm" ]; then
  npm install
fi
