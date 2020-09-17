#!/bin/bash
docker stop nginx
echo 'nginx stop'
rm -rf /home/nginx/html/*
echo '/home/nginx/html'
docker cp jenkins:/var/jenkins_home/workspace/demo-front-master/dist/* /home/nginx/html/
docker start nginx
echo 'nginx start'