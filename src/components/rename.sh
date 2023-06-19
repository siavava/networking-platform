#!/usr/bin/env bash

# Rename all *.txt to *.text
for file in *.jsx; do
  mv -- "$file" "${file%.jsx}.tsx"
done
