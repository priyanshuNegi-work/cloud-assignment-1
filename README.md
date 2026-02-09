# Secure Cloud Data Vault
**Author:** Priyanshu Negi
**Date:** February 2026
**Tech Stack:** Google Cloud Compute Engine, Node.js v24, Nginx, Cloud Storage

## 1. Executive Summary
This project implements a secure web application capable of capturing sensitive user data and securely archiving it to Google Cloud Storage (GCS). 

Unlike typical "Hello World" applications, this project demonstrates a **production-grade architecture** using a dedicated Virtual Machine (VM), a Reverse Proxy (Nginx) for traffic management, and strict Identity Access Management (IAM) policies.

## 2. System Architecture
The application follows a **3-Tier Microservices Architecture**:
**User** -> **Nginx (Reverse Proxy)** -> **Node.js (Backend)** -> **Cloud Storage (Bucket)**

* **Nginx (Port 80):** Acts as the secure gateway and traffic cop.
* **Node.js (Port 3000):** Validates input and handles business logic.
* **Service Account:** Uses a restricted identity (`web-uploader`) that only has permission to **write** to the bucket, not read or delete.

## 3. Infrastructure & Configuration
* **Compute Engine:** Debian 11 VM (`assignment-1`)
* **Security:** Custom IAM Role (`Storage Object Creator`) attached to the VM.
* **Storage:** Private Google Cloud Bucket (`assignment-1-data-bucket`).

## 4. Key Features
* **Secure Proxying:** The backend is hidden from the public internet; only Nginx is exposed.
* **Identity Management:** No hardcoded API keys. The app uses Application Default Credentials (ADC).
* **Data Sanitization:** Usernames are sanitized to prevent file system attacks.
* **Modern UI:** A responsive, "Glassmorphism" design for the frontend.

## 5. How to Run
1.  Clone the repo.
2.  Install dependencies: `npm install`
3.  Start the server: `node server.js`
4.  Configure Nginx to proxy port 80 to 3000.
