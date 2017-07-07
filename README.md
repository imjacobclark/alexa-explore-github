# Explore GitHub

Explore GitHub with Alexa.

You'll need the AWS cli configured and ready to go and once your skill is running - you'll need to link it to a skill in the Amazon Developer Console with the lambdas ARN.

### Create the stacks

First, we create a stack for an S3 bucket to hold your lambda functions:

```shell
$ aws cloudformation create-stack --stack-name alexa-explore-github-artifacts --template-body file://./cloudformation/artifacts.json
```

Second, we bundle our lambda function up and upload it into the newly created bucket:

```shell
$ zip -r alexa-explore-github.zip ./*
$ aws s3 cp alexa-explore-github.zip s3://alexa-explore-github-artifacts/alexa-explore-github.zip 
```

Finally, we create a stack for our lambda function:

```shell
$ aws cloudformation create-stack --stack-name alexa-explore-github-functions --template-body file://./cloudformation/functions.json
```

If you make any changes to the lambda function, you can re-deploy it by running `deploy.sh`.