#!/bin/sh

NS=parking-snitch-production

kubectl delete -n ${NS} -f inspector-service/inspector-service.yml
kubectl delete -n ${NS} -f notification-service/notification-service.yml
kubectl delete -n ${NS} -f admin-api-gateway/admin-api-gateway.yml
kubectl delete -n ${NS} -f report-service/report-service.yml

kubectl delete -n ${NS} -f photo-service/photo-service-queue.yml
kubectl delete -n ${NS} -f report-service/report-service-queue.yml

kubectl delete -f parking-snitch.yml
