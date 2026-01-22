  **`Task2_JobBoardApp/README.md`**

# Task 2 – Job Board Application

A full-stack Job Board web application that allows employers to post job openings and candidates to search and apply for jobs.

###  Employer
- Post new job openings
- View posted jobs

###  Candidate
- Browse available jobs
- View job details
- Apply for jobs with form submission

###  General
- Job listing and job detail pages
- REST API integration
- Modular backend structure

### Frontend
- React
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for resume upload – optional)


##  Project Structure

Task2_JobBoardApp/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Home.js
│ │ │ ├── Jobs.js
│ │ │ ├── Employer.js
│ │ │ └── Apply.js
│ │ └── App.js
│ └── package.json
│
├── server/
│ ├── models/
│ │ ├── Job.js
│ │ └── Application.js
│ ├── routes/
│ │ ├── jobs.js
│ │ └── apply.js
│ ├── index.js
│ └── package.json
│
└── README.md

## ▶️ How to Run the Application

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ssdivya08/MYDAILYWORK.git
cd MYDAILYWORK/Task2_JobBoardApp
``` 
### 2️⃣ Start Backend Server
```bash
cd server
npm install
node index.js
``` 
### Backend runs on:
http://localhost:5000
### 3️⃣ Start Frontend
Open a new terminal:
```bash
cd client
npm install
npm start
```
### Frontend runs on:
http://localhost:3000
### Test Flow
Open /employer → Post a job
Open /jobs → View all jobs
Click Apply Now → Submit application
Verify data via backend responses
### Notes
node_modules are intentionally excluded from the repository

MongoDB should be running locally (or connection string configured)

This project is intended for local demonstration and review

### 👩‍💻 Author

Samatham Sai Divya

B.Tech CSE | Internship Task 2

GitHub: https://github.com/ssdivya08

