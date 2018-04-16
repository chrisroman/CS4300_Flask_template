#!/bin/bash
./node_modules/.bin/webpack;
rm ../app/static/js/js/bundle.js;
cp ./src/app/static/js/js/bundle.js ../app/static/js/js/
