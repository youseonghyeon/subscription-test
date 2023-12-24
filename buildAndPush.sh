#!/bin/bash

IMAGE_NAME="epfzja/vue"

docker build -t "$IMAGE_NAME" .

docker push "$IMAGE_NAME"
