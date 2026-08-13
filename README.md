# Aryan Neupane — Cybersecurity & GRC Portfolio Platform

A dynamic, evidence-based personal portfolio platform built for **Aryan Neupane**, showcasing technical security capabilities, governance management systems (ISO/IEC 27001:2022), risk assessment frameworks (NIST CSF 2.0), and practical security operations.

---

## 1. Platform Architecture

The platform is designed as a modern Single-Page Application (SPA) backed by Firebase Spark tier services:

* **Frontend Engine**: Vite + React + Lucide Icons + Custom CSS Design Tokens.
* **Backend Services (Firebase Spark Plan - 100% Free)**:
  * **Firebase Authentication**: Email & Password authentication for administrative content management.
  * **Cloud Firestore**: Dynamic NoSQL database for projects, GRC deliverables, journal articles, contact submissions, and security audit logs.
  * **Firebase Storage**: Asset and artifact document hosting (PDFs, diagrams, report evidence).
  * **Firebase Hosting**: High-performance static content delivery with strict Security Headers.

---

## 2. Dynamic Routes & Features

* `/` — **Homepage**: Positioning hero, core progression architecture (*Technical Labs → Internship → GRC Mentorship → Enterprise Capstone*), certifications, featured VertexOne GRC Capstone preview, and recent articles.
* `/about` — **About & Philosophy**: Narrative profile, BIM studies under Tribhuvan University, Synthbit Technologies internship, GRC mentorship under Sandeep Sharma (CTO, Synthbit Technologies), and practical lab experience.
* `/portfolio` — **Portfolio Index**: Categorized project showcase (ISO 27001, NIST CSF 2.0, SOC Operations, Vulnerability Assessment).
* `/portfolio/vertexone-enterprise-grc-assessment` — **Primary Capstone View**: Interactive GRC Artifact Explorer (ISMS Scope, Risk Register, Statement of Applicability, Control Ownership Matrix, NIST CSF 2.0 Maturity Dashboard).
* `/blog` & `/blog/[slug]` — **Journal & Articles**: Technical writing on ISO 27001 risk registers, NIST CSF mapping, and SOC Splunk telemetry.
* `/contact` — **Contact System**: Direct email links (`contact@aryanneupane.com.np`, `email@aryanneupane.com`) and interactive contact form with honeypot bot defense.
* `/admin` & `/admin/dashboard` — **Administrative CMS**: Secure management interface for creating/editing projects, publishing blog posts, inspecting contact messages, and viewing audit logs.

---

## 3. Environment Variables

Create a `.env` file in the root directory for live Firebase project integration (or rely on default fallback mode for local offline development):

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 4. Local Development & Build

### Install Dependencies
```bash
npm install
```

### Start Local Development Server
```bash
npm run dev
```

### Build Production Bundle
```bash
npm run build
```

The compiled production bundle will be generated in `dist/`.

---

## 5. Deployment Instructions

This platform deploys seamlessly to **Firebase Hosting** (or GitHub Pages / Cloudflare Pages) without incurring any billing account requirement.

### Deploying via Firebase CLI
```bash
npx -y firebase-tools@latest deploy --only hosting
```

---

## 6. Source of Truth & Personal Branding

* **Name**: Aryan Neupane
* **Positioning**: Early-career Cybersecurity & GRC Specialist (BIM Student, TU).
* **Primary Capstone**: VertexOne Digital Services — Enterprise GRC Assessment *(Simulated enterprise capstone project demonstrating practical GRC capabilities)*.
* **Verified Emails**: `contact@aryanneupane.com.np`, `email@aryanneupane.com`.
