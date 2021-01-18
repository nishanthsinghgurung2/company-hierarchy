#!/bin/bash
mode=$1

node --experimental-modules index.mjs ${mode:7:9} "$2"