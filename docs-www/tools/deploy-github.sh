#!/bin/bash

GITHUB_REPO_NAME=$(basename -s .git `git config --get remote.origin.url`);

# adding CNAME to public directory sets custom domain of github pages
# https://github.com/tschaub/gh-pages/issues/127
cp ./tools/CNAME ./public/

# deploy to github pags
node ./node_modules/.bin/gh-pages -d public
