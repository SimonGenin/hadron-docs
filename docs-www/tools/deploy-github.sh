#!/bin/bash

GITHUB_REPO_NAME=$(basename -s .git `git config --get remote.origin.url`);

# deploy to github pags
node ./node_modules/.bin/gh-pages -d public
