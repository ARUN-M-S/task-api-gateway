#!/bin/bash

PROTO_DIR=./src/protos
OUT_DIR=./src/protos/interface

mkdir -p ${OUT_DIR}

# Generate TypeScript definitions using npx
npx protoc \
  --plugin=protoc-gen-ts_proto=$(npx which protoc-gen-ts_proto) \
  --ts_proto_out=${OUT_DIR} \
  --ts_proto_opt=nestJs=true \
  -I ${PROTO_DIR} \
  ${PROTO_DIR}/*.proto
