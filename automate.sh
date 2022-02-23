#!/bin/bash
docker rm -f MG_web
docker rm `docker ps -a -q`
docker-compose down
docker-compose up -d
