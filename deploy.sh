#!/bin/bash

# artifactをアップロードするs3 bucketを作成
BUCKET="write-code-everyday-lambda-`date +%Y%m%d%H%M%S`"
aws s3 mb s3://${BUCKET}

# ソースファイルをアップデートし、s3 bucketに参照を置き換えたCFnを作成
TEMPLATE_FILE=cloudformation/lambda.yml
TMP_CFN=tmp-cfn.yml

aws cloudformation package \
    --template-file ${TEMPLATE_FILE} \
    --s3-bucket ${BUCKET} \
    --output-template-file $TMP_CFN

# lambdaをデプロイ
# roleを作成するためCAPABILITY_NAMED_IAMを指定
aws cloudformation deploy \
    --template-file $TMP_CFN \
    --stack-name write-code-everyday-lambda \
    --parameter-overrides \
    Env=prd \
    ServiceName=write-code-everyday \
    --capabilities CAPABILITY_NAMED_IAM

# artifactをアップロードしたs3 bucketを削除
aws s3 rb s3://${BUCKET} --force
# アップロードに利用したCFnを削除
rm ${TMP_CFN}
