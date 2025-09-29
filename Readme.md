
# Note Taker App

A full-stack note-taking application with a React + Vite + TypeScript frontend and an Express + TypeScript + MongoDB backend.

---

## 🚀 Project Structure

```
Note_Taker_App/
├── backend/      # Express, TypeScript, MongoDB
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/     # React, Vite, TypeScript
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md     # Project documentation (this file)
```

---

## 🛠️ Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or cloud, e.g. MongoDB Atlas)

### 1. Clone the repository
```sh
git clone https://github.com/Sonudhukia143/note-taker.git
cd note-taker
```

### 2. Setup Backend
```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` with the following variables:
  ```env
  MONGODB_URI=your_mongodb_connection_string
  PORT=3000
  CLIENT_URL=http://localhost:5173
  # For nodemailer (see below for details)
  EMAIL_USER=your_email@gmail.com
  EMAIL_PASS=your_email_password_or_app_password
  ```
- To start the backend in development mode:
  ```sh
  npm run dev
  ```
- To build and start in production mode:
  ```sh
  npm run build
  npm start
  ```

### 3. Setup Frontend
```sh
cd ../frontend
npm install
```
- To start the frontend in development mode:
  ```sh
  npm run dev
  ```
- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## ✉️ Setting up Nodemailer

See the section below for detailed steps on configuring your own credentials for sending emails with Nodemailer.

---

## 🤝 Contributing Guidelines
1. Each commit for a new feature should be done with a new branch and then be merged later on.

2. Branching
    Skeleton = Feature/name of feature added
    Example = git checkout Feature/Setup

2. Commit Description
    Skeleton = 
    " Name for commit (Ex : SignUp  , etc. ) : Feature Project setup for frontend and backend complete "

    Example = git commit -m "Setup : Project setup complete for both backend and frontend"

    Note : Keep the tense present

---

## 📧 Setting Nodemailer with your own credentials

1. Getting NodeMailer Credentials

    Step 1. 
    Visit the url below and also make sure get details given 
    below after clicking on the gear icon :
        https://developers.google.com/oauthplayground/

    Step 2.
        OAuth 2.0 configuration
        OAuth flow:
        OAuth endpoints:
        Authorization endpoint: 
            https://accounts.google.com/o/oauth2/v2/auth
        
        Token endpoint: 
        https://oauth2.googleapis.com/token
            Note: The OAuth endpoints above need to implement the OAuth 2.0 draft 10 specification or above. Other specification are likely to be incompatible.

        Access token location:
            You will need to list the URL https://developers.google.com/oauthplayground as a valid redirect URI in the developer console of your API. Then enter your client ID and secret below:

        OAuth Client ID: 
            Get from https://console.cloud.google.com/auth/clients
    
        OAuth Client secret: 
            Get from https://console.cloud.google.com/auth/clients
        
        Note: 
            Your credentials will be sent to our server as we need to proxy the request. Your credentials will not be logged.

    Step 4. 
        To get client id and secret, visit the url below
        https://console.cloud.google.com/auth/clients
        Generate new secret and add valid redirect uri as to get you credentials

---

## 📄 License

This project is licensed under the ISC License.

---

## 📝 Credits

Created by [Sonudhukia143](https://github.com/Sonudhukia143)