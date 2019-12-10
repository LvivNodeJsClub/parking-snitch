#!/bin/sh

VERSION=1.1

docker tag admin-api-gateway parkingsnitch/admin-api-gateway:${VERSION}
docker push parkingsnitch/admin-api-gateway

docker tag report-service parkingsnitch/report-service:${VERSION}
docker push parkingsnitch/report-service

docker tag report-processing-service parkingsnitch/report-processing-service:${VERSION}
docker push parkingsnitch/report-processing-service

docker tag photo-service parkingsnitch/photo-service:${VERSION}
docker push parkingsnitch/photo-service

docker tag notification-service parkingsnitch/notification-service:${VERSION}
docker push parkingsnitch/notification-service

docker tag inspector-service parkingsnitch/inspector-service:${VERSION}
docker push parkingsnitch/inspector-service