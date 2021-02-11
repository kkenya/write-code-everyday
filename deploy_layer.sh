#!/bin/bash
FILE_NAME="dependencies.zip"
docker run -it --mount type=bind,source="$(pwd)/tmp",target=/tmp write-code-everyday-dependencies zip -r /tmp/${FILE_NAME} nodejs/

# artifactをアップロードするs3 bucketを作成
BUCKET="write-code-everyday-dependencies-`date +%Y%m%d%H%M%S`"
aws s3 mb s3://${BUCKET}
aws s3 cp tmp/${FILE_NAME} s3://${BUCKET}

# layerのアップロード
aws lambda publish-layer-version \
    --layer-name "write-code-everyday-dependencies" \
    --description "write-code-everyday dependency modules" \
    --license-info "MIT" \
    --content S3Bucket=${BUCKET},S3Key=${FILE_NAME} \
    --compatible-runtimes nodejs12.x

# artifactをアップロードしたs3 bucketを削除
aws s3 rb s3://${BUCKET} --force

