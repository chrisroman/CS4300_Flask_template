#!/bin/bash
./node_modules/.bin/webpack;
rm ../app/static/css/*
cp ./public/css/* ../app/static/css/
