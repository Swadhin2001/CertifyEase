### Tutedude Assignment

Welcome to the Certificate Request Management System! This system provides an interface for admins to view and manage certificate requests, generate certificates automatically, and store the generated certificate links along with the student's email in a database.

### Admin Interface
The admin side of the system includes an interface where admins can perform the following actions:
- View certificate requests submitted by students.
- Approve certificate requests by entering the Name, Course, and Date of Certificate approval.
- Generate certificate PDFs automatically based on the provided details.
- Save the generated certificate PDF to Google Drive.
- Store the link to the generated certificate PDF along with the student's email in the database.

### Details Submission
When an admin approves a certificate request, they will enter the following details:
- Name: The name of the student.
- Course: The course for which the certificate is being issued.
- Date of Certificate Approval: The date when the certificate was approved.

Sure, here's a basic setup guide for setting up a project with frontend using Vite with TypeScript and backend using Express.js with TypeScript, with two routes:

### Frontend Setup (Vite + TypeScript)

1. **Go to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Backend Setup (Express.js + Mongoose + TypeScript)

1. **Go to the backend directory**:
   ```bash
   cd backend
   ```

2. **Initialize a new npm project**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Technologies Used
- Frontend: Vite, React, TypeScript
- Backend: Node.js, Express.js
- Database: MongoDB
- PDF Generation: pdf-lib
- Google Drive Integration: Google Drive API
- Send Email: nodemailer
