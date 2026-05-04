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
