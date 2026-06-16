# GestaPet 🐾
 
Web application for appointment and operations management in veterinary clinics. Academic team project built with Node.js, Angular and MySQL.
 
**Stack:** Node.js · Express · Prisma ORM · MySQL · Angular · TypeScript
 
> **Academic project** — Universidad Técnica Nacional (UTN), Costa Rica. Built as part of the Software Engineering program using open-source tools.
 
---
 
## What it does
 
GestaPet helps veterinary clinics manage their day-to-day operations: scheduling appointments, handling a service and product catalog, generating invoices and controlling access by role. It supports multiple user types with different levels of access and a visual weekly agenda with slot blocking.
 
---
 
## Features
 
### Appointment Management
- Appointment registration with configurable states: Pending, Confirmed, Completed, Cancelled, Rescheduled, No-show.
- Service classification by category: consultations, vaccinations, surgery, etc.
- Fields for owner, species and emergency availability per service.
### Product Catalog
- Product management with vendor, expiration date and category fields.
- Filtering by category.
### User Roles & Access Control
- Three roles with distinct permissions:
  - **Administrator** — full system control (users, branches, services, billing).
  - **Manager** — appointment and branch management.
  - **Client** — self-registration, booking and appointment history.
### Weekly Schedule
- Visual weekly agenda with real-time availability.
- Slot and full-day blocking.
- Appointment rescheduling and cancellation.
### Billing
- Invoice generation in **PDF format**.
- Automatic email delivery to the client.
- Automatic inclusion of services and products.
---
 
## Project Structure
 
```
GestaPet/
├── server/              # Node.js + Express API with Prisma ORM
│   ├── controllers/     # Route handlers
│   ├── routes/          # API route definitions
│   ├── prisma/          # Schema and migrations
│   └── .env.example     # Environment variable template
└── appAngular/          # Angular frontend
    └── src/
        ├── app/         # Components, pages and services
        └── assets/      # Static resources
```
 
---
 
## Getting Started
 
**Requirements:** Node.js 18+, npm, MySQL
 
### Backend (`server/`)
 
```bash
cd server
npm install
```
 
Create a `.env` file based on `.env.example`:
 
```env
DATABASE_URL="mysql://user:password@localhost:3306/gestapet_db"
PORT=3000
JWT_SECRET="your-secret-key"
SMTP_HOST="smtp.example.com"
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"
```
 
Apply the database schema and seed base data:
 
```bash
npx prisma db push
npx prisma db seed
npm run dev
```
 
### Frontend (`appAngular/`)
 
```bash
cd appAngular
npm install
ng serve
```
 
The frontend runs at `http://localhost:4200` and connects to the backend at `http://localhost:3000`.
 
---
 
## Team
 
| Name | Role |
|---|---|
| Marco Daniel Centeno Céspedes | Project Lead & Full Stack Developer |
| Marcia Elena Sánchez Abellán | Full Stack Developer |
 
---
 
## License
 
MIT






