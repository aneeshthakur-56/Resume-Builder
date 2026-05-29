# 🚀 AI MERN Stack Resume Builder

An elegant, premium, and feature-rich MERN Stack Resume Builder powered by Google Gemini AI and ImageKit. Users can instantly generate vector-perfect resumes, parse existing PDFs using AI, enhance descriptions in real-time, adjust dynamic HSL accent themes, remove profile picture backgrounds, and manage account preferences in a unified settings panel.

---

## ✨ Key Features

1. **🤖 Google Gemini AI Resume Parser**: Upload your existing PDF resume; Gemini will automatically analyze, parse, structure, and populate the editor fields instantly with high accuracy.
2. **✍️ Real-Time AI Text Enhancements**: Powered by specialized prompt pipelines:
   * **Professional Summary**: Rewrites rough notes into high-impact executive summaries.
   * **Experience Descriptions**: Polishes past job roles to focus on achievements and metrics.
   * **Project Highlights**: Dedicated technical rewrite pipeline highlighting engineering impact.
3. **💾 Vector-Perfect Hidden-Iframe PDF Downloads**: Enterprise-grade client-side print pipeline. Triggers the browser's native save/print dialogue targetting *only* the vector resume layout. Searchability, crisp text scaling, and SVGs are perfectly preserved.
4. **🎨 Custom Accent Color & Background Remover**: 
   * Pick any dynamic theme color via an interactive picker.
   * Toggle **"Remove Background"** to instantly strip backgrounds from profile pictures in real-time using ImageKit AI.
   * The transparent profile photo automatically receives the selected **Accent Color** as its background in both the editor and templates.
5. **⚙️ Unified Account & Settings**: Manage profile details, update initial-based avatars, and change account passwords securely in a responsive control panel.
6. **🔒 Secure JWT Auth & Protected Routing**: Middleware-secured backend routes with React Router route guards.

---

## 🛠️ Technology Stack

* **Frontend**: React (V19), Redux Toolkit, React Router (V7), Tailwind CSS, Axios, Lucide Icons, React Hot Toast
* **Backend**: Node.js, Express, MongoDB (Mongoose), Google Gen AI SDK, ImageKit Node SDK, Multer, bcrypt, jsonwebtoken

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Configure Environment Variables
Create a `.env` file in both `frontend` and `backend` directories. Refer to the respective `.env.example` templates created in each folder.

#### Backend Env (`backend/.env`):
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resume-builder
JWT_SECRET=your_jwt_secure_secret_key
NODE_ENV=development
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

#### Frontend Env (`frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Start the Backend Server
```bash
cd backend
npm install
npm start
```
The server will start listening on `http://localhost:3000` and output `MongoDB connected`.

### 4. Start the Frontend Dev Server
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

---

## 🌐 Deployment Instructions

### 1. Deploy Frontend on Vercel

Vercel is the recommended hosting platform for the React frontend due to its instant builds, Edge network speed, and zero-config deployment.

1. Install Vercel CLI globally or use the [Vercel Web Dashboard](https://vercel.com).
2. Link your Github Repository to Vercel.
3. Configure the following project settings during setup:
   * **Framework Preset**: Vite
   * **Root Directory**: `frontend`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Add the following **Environment Variable** in the Vercel dashboard:
   * `VITE_BACKEND_URL`: Set this to your production backend URL (e.g., `https://resume-builder-api.onrender.com`).
5. **Routing Configuration**: The project is equipped with `frontend/vercel.json` which configures automatic rewrites back to `index.html`. This ensures that refreshing the page on client-side routes (like `/app/settings` or `/app/builder/:id`) works flawlessly without throwing 404 errors.

---

### 2. Deploy Backend on Render

Render is an excellent platform for deploying Node.js Express APIs.

1. Sign up on [Render](https://render.com) and click **New > Web Service**.
2. Connect your Github repository.
3. Configure the following settings:
   * **Name**: `resume-builder-api`
   * **Environment**: `Node`
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
4. **Environment Variables**: Add the following variables under the **Advanced** tab:
   * `PORT`: `10000`
   * `NODE_ENV`: `production`
   * `MONGO_URI`: *Your production MongoDB connection string*
   * `JWT_SECRET`: *A secure random secret key*
   * `IMAGEKIT_PRIVATE_KEY`: *Your ImageKit private key*
   * `GEMINI_API_KEY`: *Your Google Gemini API Key*
   * `GEMINI_MODEL`: `gemini-2.5-flash`
5. Render will build and deploy your API. Once running, copy the provided `.onrender.com` URL and update the `VITE_BACKEND_URL` environment variable on Vercel.

---

## 📄 License
This project is licensed under the MIT License.
