#! /bin/bash

zip -r alexa-explore-github.zip ./*
aws s3 cp alexa-explore-github.zip s3://alexa-explore-github-artifacts/alexa-explore-github.zip 
aws lambda update-function-code --function-name alexa-explore-github --s3-bucket alexa-explore-github-artifacts --s3-key alexa-explore-github.zip --publish