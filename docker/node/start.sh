#!/bin/env bash
echo "Starting..."
cp package2.json package.json
npm install
nodemon --ignore dist --exec gulp
