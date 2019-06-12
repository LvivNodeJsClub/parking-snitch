#!/bin/bash

npm run clean &&
npm ci &&
# npm run lint &&
# npm run build &&
# npm test &&
# npm run spec &&

docker build .  &&
#docker push

echo "Build SUCCESS" || echo "Build FAILED"