
# Servease

This project consists of a React frontend (Client) and a Node.js backend (Server). It uses Vite for the frontend and Express with Sequelize for the backend.

## Getting Started
1. Using Git Bash : `git clone <your-repo-url>`
2. Install Dependecies : Navigate to each folder separately and install dependencies:
   
Using Powershell : 
```
cd Client - Go to Client Folder
npm install @react-google-maps/api axios bcrypt bcryptjs body-parser bootstrap cors dotenv express express-session jsonwebtoken mysql mysql2 react react-dom react-icons react-router-dom @eslint/js @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals vite
```
After installing dependencies on Client Folders, install next on Server
```
cd ../Server - Go to Server Folder
npm install bcryptjs cors dotenv express express-session jsonwebtoken mongoose mysql2 sequelize nodemon
```
3. Create .env files in Client and Server folders

Client .env: Setup Google Maps API (Optional)

 `GOOGLE_MAPS_API_KEY= <your-google-maps-api-key>`

Server .env: Setup your MySQL server first using MySQL Workbench before proceeding 
 ```
DB_HOST= <database-host>
DB_USER= <database-user>
DB_PASS= <database-password>
DB_NAME= <database-name>
SESSION_SECRET= <generated-token-key> - may command dito i forgot
PORT= 3000

```
## Running the project
Using Powershell : 
```
cd Client - Go to Client Folder
npm run dev
```
```
cd ../Server - Go to Server Folder
node server.js
```

## Troubleshooting
ikaw lagi may kasalanan

hindi ung pc mo

bobo amp

tanongin niyo nlng ako o si chatgpt
