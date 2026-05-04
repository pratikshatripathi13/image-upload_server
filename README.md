# 🚀 Scalable Image Upload Server (No Database)

## 📌 Overview
This project is a scalable backend system that allows users to upload images and store them in AWS S3.

It demonstrates:
- Load balancing using NGINX
- Multiple backend instances
- Cloud storage integration (AWS S3)
- CI pipeline using GitHub Actions
- No database architecture

---

## 🏗️ Architecture

Client (Browser / Postman)
        ↓
NGINX Load Balancer
        ↓
Multiple Backend Servers (3001, 3002)
        ↓
AWS S3 Bucket (Image Storage)

---

## ⚙️ Tech Stack

- Node.js (Backend)
- Express.js
- Multer (File Upload)
- AWS SDK (S3)
- NGINX (Load Balancer)
- GitHub Actions (CI/CD)

---

## 📂 Project Structure
project/
├── server.js
├── index.html
├── package.json
├── .gitignore
├── README.md
└── .github/workflows/ci.yml


---

## 🔌 API Endpoint

### POST /upload

Upload an image using:

- Content-Type: multipart/form-data
- Key: `image`

### Response:
```json
{
  "url": "https://bucket-name.s3.amazonaws.com/image.jpg"
}
🛡️ Validation
Only image files allowed (JPG/PNG)
Max file size: 2MB
☁️ AWS S3 Setup
Create S3 bucket
Add bucket policy for access
Add credentials in .env
🔄 Running Multiple Servers

Open 2 terminals:

PORT=3001 node server.js
PORT=3002 node server.js
⚖️ NGINX Configuration
http {
    upstream backend {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
🧪 Testing

Use:

Browser UI → http://localhost
Postman / curl

Verify:

Image uploads to S3
Requests hit different servers (check logs)
🔁 CI Pipeline

GitHub Actions workflow:

Runs on push & pull request
Installs dependencies
Ensures project builds successfully
