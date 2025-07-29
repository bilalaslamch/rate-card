# Hub71 Rate Card Calculator

## Overview
A professional rate card calculator for Hub71, supporting both Custom Resource and SWAT Team calculations. Features PDF and email export with company branding, business logic encapsulated in custom hooks, and seamless API integration.

---

## Technical Architecture
- **Frontend:** Next.js (React), custom hooks for data, PDF and email UI components.
- **Backend:** Next.js API routes for email (SendGrid).
- **Database:** Supabase for rate data.
- **PDF/Email:** React-PDF for downloads, HTML templates for email.

---

## API Integration

### Send Email Endpoint
- **POST** `/api/email`
- **Payload:**
  ```json
  {
    "email": "recipient@example.com",
    "name": "Sender Name",
    "type": "custom" | "swat",
    "data": { ...calculatorData }
  }
  ```
- **Response:**
  - `{ success: true, message: "Email sent successfully!" }`
  - `{ success: false, message: "Error message" }`

### Supabase Data Fetching
- **CustomResourceRates:** Fetched via `useCustomResourceRates` hook.
- **SWATTeamRates:** Fetched and calculated via `useSwatTeamRates` hook.

---

## Deployment Guide

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `EMAIL_FROM` (verified sender for SendGrid)
   - `SENDGRID_API_KEY`
3. **Run locally:**
   ```bash
   npm run dev
   ```
4. **Deploy:**
   - Standard Next.js deployment (Vercel, Netlify, etc.)

---

## Business Logic Explanation

### Custom Resource Calculator
- Fetches all rates from Supabase.
- User selects region, role, and seniority.
- Displays the corresponding rate.

### SWAT Team Calculator
- User selects role, workload (percentage), and duration.
- Base rate is calculated from the intermediate rate for the role.
- Workload percentage is applied.
- Duration discount is applied (-5% for 2 months, -10% for 3+ months).
- Final rate is displayed and included in PDF/email.

---

## Features
- Professional PDF and email export with branding
- Custom hooks for business logic
- Toast notifications for user feedback
- Responsive, modern UI

---

## License
MIT
