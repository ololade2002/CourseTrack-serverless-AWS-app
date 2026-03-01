# CourseTrack 📚

## Overview
A full-stack serverless course tracking app that helps users manage their learning journey, monitor progress, and stay organized — built on AWS.

## Live Demo
Live Demo: https://d11hc25q0b3oxs.cloudfront.net

## Architecture
![Architecture](./frontend/courseTracker/docs/Blank%20diagram.png)

## How it works

- User visits the app via CloudFront (CDN)
- CloudFront serves the React app from a private S3 bucket
- User logs in via AWS Cognito — receives a JWT token
- Frontend attaches the JWT token to every API request
- API Gateway validates the JWT with Cognito before allowing access
- Validated requests trigger the appropriate Lambda function (get / create / update / delete)
- Lambda reads/writes data to DynamoDB

## Tech Stack

- React + Vite	
- Tailwind CSS
- Amazon S3	
- Amazon CloudFront	
- Amazon Cognito	
- Amazon API Gateway	
- AWS Lambda
- Amazon DynamoDB

## Screenshots

### Homepage
![Homepage](./frontend/courseTracker/docs/api.jpeg)

### Dashboard
![Dashboard](./frontend/courseTracker/docs/dashboard.png)

### Courses Page
![Courses](./frontend/courseTracker/docs/coursesPage.png)

### Login Page
![Login](./frontend/courseTracker/docs/login.png)

### CloudFront Distribution
![CloudFront Distribution](./frontend/courseTracker/docs/cloudfront.jpeg)

### API Gateway
![API](./frontend/courseTracker/docs/api.jpeg)

### Cognito
![Cognito](./frontend/courseTracker/docs/cognito.jpeg)

### Lambda
![Lambda](./frontend/courseTracker/docs/lambda.png)

### s3 Storage
![S3](./frontend/courseTracker/docs/s3.png)


## Features

- Cognito-based authentication (JWT)
- Protected HTTP API via API Gateway
- Serverless backend with Lambda
- DynamoDB-powered data storage
- CloudFront + private S3 hosting
- Full CRUD functionality
- Responsive dashboard UI

## Future Improvements

- Implement CI/CD pipeline using GitHub Actions.
- Add custom domain with AWS Route 53.
- Convert infrastructure to Infrastructure-as-Code (Terraform or AWS CDK).
- Add monitoring and alerts using CloudWatch Alarms.

## 👩🏽‍💻 Author

Eleja Ololade  