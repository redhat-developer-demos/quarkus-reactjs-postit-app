#!/bin/bash
if [ ! -d /work/volumes/.m2/repository ]; then
  mkdir -p /work/volumes/.m2/repository;
  cp -rf /work/m2repo/* /work/volumes/.m2/repository/;
fi

if [ ! -d /projects/postit-app/node-frontend/node_modules ]; then
  while [ ! -d /projects/postit-app/node-frontend ]; do
    echo '/projects/postit-app/node-frontend folder not created yet ...retry in 1sec';
    sleep 1;
  done
  sleep 5;
  echo 'copying /work/node_modules/* to /projects/postit-app/node-frontend/node_modules';
  cd /projects/postit-app/node-frontend/;
  tar -zxvf /work/node_modules.tar.gz
fi
sleep infinity

