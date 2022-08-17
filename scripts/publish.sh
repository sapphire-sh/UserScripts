#!/bin/bash

set -ex

git switch --orphan release
git add ./dist
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git commit -m "publish: $GITHUB_RUN_NUMBER"
git tag "$GITHUB_RUN_NUMBER"
git push origin release -f
git push origin --tags
