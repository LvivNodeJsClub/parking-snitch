#!/bin/sh

kubectl apply -f parking-snitch.yml

sleep 15

NS=parking-snitch-production

kubectl apply -n ${NS} -f photo-service/photo-service-queue.yml
kubectl apply -n ${NS} -f report-service/report-service-queue.yml

kubectl apply -n ${NS} -f inspector-service/inspector-service.yml
kubectl apply -n ${NS} -f notification-service/notification-service.yml
kubectl apply -n ${NS} -f admin-api-gateway/admin-api-gateway.yml
kubectl apply -n ${NS} -f report-service/report-service.yml
