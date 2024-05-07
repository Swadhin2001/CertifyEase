**Backend Documentation**
The backend edits the PDF with provided data, saves it to Drive, sends a drive link to the user's email, and stores the drive link in the database for future retrieval.

## Folder Structure

```
.
├── src --------- Source code root
│   ├── assets --------- Contains static assets used in the application.
│   │   └──TDC.pdf --------- Certificate PDF format
│   ├── controllers --------- Route specific application logic.
│   │   └──createtodb.controller.ts
│   ├── db --------- Reusable components related to database
│   │   └──index.ts
│   ├── routes --------- Reusable components for routing
│   │   └──index.ts
│   ├── schema --------- Reusable components related to data schema definitions
│   │   └──user.model.ts
│   ├── utils --------- Global utility functions
│   │   ├── asyncHandler.ts ------ Utility functions for handling asynchronous operations.
│   │   ├── driveConfig.ts ------ Configuration settings for Google Drive integration.
│   │   ├── generatePdf.ts ------ Configuration settings for PDF generation.
│   │   └── nodemailerConfig.ts --- Configuration settings for Nodemailer.
│   └index.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json ----- TypeScript configuration file
```


### Usage

To use the backend of our application:

1. Clone the repository to your local machine.
2. Navigate to the backend directory.
3. Install dependencies using `npm install`.
4. Set up environment variables in the `.env` file.
5. Start the server using `npm start` for development mode.
