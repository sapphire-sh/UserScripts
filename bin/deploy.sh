#!/bin/bash

set -ex

rm ./dist/.gitignore
git config user.email "deploy@travis-ci.org"
git config user.name "Deployment Bot (from Travis CI)"
git remote set-url origin https://${GITHUB_TOKEN}@github.com/sapphiredev/UserScripts.git
git checkout -b release
git add ./dist
git commit -m "travis-ci build: $TRAVIS_BUILD_NUMBER"
git push origin release -f
