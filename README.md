# AWS IaaS Storage/Retrieval Tool

[![](<https://drive.usercontent.google.com/download?id=1eljKh3egZLvRHHh4v3bTyIdbdw-bGdRR>)](https://drive.google.com/file/d/1Sw1XrjI4jibC0oKSovuGKO6GEX0lsEDg/view)

This repo is the front-end for a full-stack web application with CRUD data management and responsive web design.  It used AWS Infrastructure as a Service and follows an MVC architecture.  My AWS Free Tier has since expired, but it is still viewable via this [video demonstration](https://drive.google.com/file/d/1Sw1XrjI4jibC0oKSovuGKO6GEX0lsEDg/view)

## System Design
<img alt="image" src="https://github.com/user-attachments/assets/307ea816-f209-43ff-a4c8-be2d57ea64a6" />

## Discussion
- **Scaling:** As cloud services, AWS' S3, Amplify, Lambda, and DynamoDB each offer horizontal scaling, i.e. as a cloud user I could
pay for more machines to provide my services should my demands for any one of the services increases. S3 would increase
with the number of and size of source data files being stored, Amplify and Lambda would increase with site traffic, and
DynamoDB would increase from both.
- **Monitoring:** AWS Lambda offers a monitoring service called CloudWatch, which provides statistics like the invocations, duration
from request reception to response sending, error and success counts, throttles, and more. The first few can help for
debugging and optimization, while throttling - in conjunction with CloudWatch alarms - would aid in managing resource
scaling.
