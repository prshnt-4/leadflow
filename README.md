# 🚀 LeadFlow CRM

A modern, full-stack Customer Relationship Management (CRM) application built with **Next.js 15**, **TypeScript**, **MongoDB Atlas**, and **Tailwind CSS**. LeadFlow helps businesses efficiently manage leads through a clean dashboard, secure authentication, and an intuitive user experience.

> Built for the **Digital Heroes Internship Qualification Task**

---

## 🌐 Live Demo

- **Live Application:** [https://YOUR-VERCEL-URL.vercel.app](https://leadflow-sable-kappa.vercel.app/)
- **GitHub Repository:** https://github.com/prshnt-4/LeadFlow

---

## 🔑 Test Credentials

Email: prshnt@test.com

Password: 12345678



---

# ✨ Features

## 🔐 Authentication
- Secure user registration
- Login with email and password
- Password hashing using bcrypt
- Protected dashboard routes
- Session-based authentication

---

## 📊 Dashboard

- Total Leads
- Lead Status Overview
- Monthly Analytics
- Responsive Charts
- Real-time Statistics

---

## 👥 Lead Management

- Create Lead
- View Leads
- Update Lead
- Delete Lead
- Search Leads
- Filter by Status

---

## 📈 Analytics

- Pie Chart for Lead Distribution
- Monthly Lead Creation Chart
- Dynamic Dashboard Metrics

---

## 📱 Responsive Design

- Desktop
- Tablet
- Mobile

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js API Routes
- Node.js
- Mongoose

## Database

- MongoDB Atlas

## Deployment

- Vercel

---

# 📂 Project Structure

```
LeadFlow/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   └── signup/
│
├── components/
│
├── lib/
│
├── models/
│
├── types/
│
└── public/
```

---

# 🗄 Database Models

## User

| Field | Type |
|--------|------|
| Name | String |
| Email | String |
| Password | Hashed String |

---

## Lead

| Field | Type |
|--------|------|
| Name | String |
| Email | String |
| Phone | String |
| Company | String |
| Status | New / Contacted / Qualified / Proposal / Won / Lost |
| Source | Website / LinkedIn / Referral / Cold Call / Other |
| Assigned To | String |
| Notes | String |
| Created At | Date |

---

# 🔐 Authentication Flow

1. User signs up.
2. Password is securely hashed using bcrypt.
3. User logs in using email and password.
4. Credentials are validated against MongoDB.
5. A secure session is created.
6. Protected routes are accessible only to authenticated users.

---

# 📡 API Endpoints

## Authentication

POST `/api/auth/signup`

POST `/api/auth/login`

POST `/api/auth/logout`

---

## Leads

GET `/api/leads`

POST `/api/leads`

PUT `/api/leads/:id`

DELETE `/api/leads/:id`

---

## Dashboard

GET `/api/dashboard`

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/LeadFlow.git
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file


Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build

npm start
```

---

# 🚀 Deployment

The application is deployed using **Vercel**.

The database is hosted on **MongoDB Atlas**.

---



# 🔒 Security

- Password Hashing (bcrypt)
- Environment Variables
- Protected Routes
- Secure Authentication
- MongoDB Atlas Cloud Database

---

# 🎯 Future Improvements

- Role-Based Access Control
- Email Notifications
- Activity Timeline
- Team Collaboration
- CSV Import & Export
- Dark Mode
- AI Lead Scoring
- Real-Time Notifications

---

# 👨‍💻 Developed By

**Prashant Kumar**

B.Tech, Energy Engineering

Indian Institute of Technology Roorkee (IIT Roorkee)

---

# 📄 License

This project was developed for the **Digital Heroes Internship Qualification Task**.

---

## ❤️ Credit

**Built for Digital Heroes Training Task**

https://digitalheroesco.com
