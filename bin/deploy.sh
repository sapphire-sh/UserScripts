#!/bin/bash

set -ex

git config user.email "deploy@travis-ci.org"
git config user.name "Deployment Bot (from Travis CI)"
git remote add origin https://${GITHUB_TOKEN}@github.com/sapphiredev/UserScripts.git
git checkout -b release
git add ./dist
git commit -m "travis-ci build: $TRAVIS_BUILD_NUMBER"
git push origin release
