# My-File-Uploader-App

This is a simple web-based file upload application built with **Node.js (http)**, **Busboy**, and **vanilla JavaScript**. It features a **modal popup**, **drag and drop upload**, and **progress bar** for real-time feedback during file upload.

## 🚀 Features

- Upload files via drag-and-drop or file picker
- Modal popup for clean UI interaction
- Upload progress bar with percentage display
- Server-side file handling using Busboy and Node.js
- CORS enabled for cross-origin frontend/backend communication

- ## 📁 Folder Structure

- project-root/
├── uploads/ # Uploaded files saved here
├── scripts.js # Frontend JavaScript logic
├── home.html # Main HTML file with modal UI
├── styles.css # Basic CSS styling
└── server.js # Node.js backend (Busboy file handling)

## How It Works

### Frontend:
- Modal is triggered by clicking "Add a File".
- Files can be added via:
  - Dragging and dropping into the modal.
  - Clicking "Browse" to open the file picker.
- File is uploaded via AJAX (XMLHttpRequest) with progress feedback.

### Backend:
- server.js listens on port 3000.
- Handles POST requests to /upload using Busboy.
- Files are saved to the /uploads directory.
- Responds with success/failure JSON message.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (native http module)
- **File Parsing**: [Busboy](https://www.npmjs.com/package/busboy)

---

## Getting Started

### Prerequisites:
- [Node.js](https://nodejs.org/) installed

### Setup Instructions:

1. **Clone the repository**

git clone https://github.com/your-username/file-upload-modal-app.git
cd file-upload-modal-app

2. **Install Busboy**

npm install busboy

3. **Run the backend server**

node server.js

4. **Open home.html in your browser**

Just open the file directly or use a simple static server like Live Server in VS Code.

## Notes
Uploaded files are stored in the /uploads folder.

Backend runs on http://localhost:3000.

CORS is enabled to allow frontend/backend communication.

