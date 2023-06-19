#!/usr/bin/env bash

# Rename all *.txt to *.text
for file in *.js; do
  mv -- "$file" "${file%.js}.ts"
done
