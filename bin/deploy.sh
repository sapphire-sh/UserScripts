#!/bin/bash

set -ex

git switch -c release
git add ./dist
git config user.name "github-actions"
git config user.email "github-actions@github.com"
git commit -m "publish: $GITHUB_RUN_NUMBER"
git tag "$GITHUB_RUN_NUMBER"
git push origin release -f
git push origin --tags
