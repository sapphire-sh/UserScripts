#!/bin/bash

set -ex

git switch -c release
git add ./dist
git config user.name "sapphire"
git config user.email "info@sapphire.sh"
git commit -m "publish: $GITHUB_RUN_NUMBER"
git tag "$GITHUB_RUN_NUMBER"
git push origin release -f
git push origin --tags
