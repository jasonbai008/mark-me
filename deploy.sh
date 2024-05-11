#! bin/bash
yarn build
git add .
git commit -m 'release a new version'
git push