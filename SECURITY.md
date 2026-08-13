# Security Architecture & Threat Model

This document outlines the security architecture, authorization controls, data protection policies, and threat model for the **Aryan Neupane Cybersecurity & GRC Portfolio Platform**.

---

## 1. Security Principles & Architecture

The platform enforces defense-in-depth across the application lifecycle:

* **Least Privilege Access Control**: Administrative functions (`/admin/*`) require explicit Firebase Authentication. Unauthenticated users cannot modify database records or upload assets.
* **Server-Side Enforcement**: Authorization rules are enforced at the database level using Cloud Firestore & Firebase Storage Security Rules, not merely through client-side route guards.
* **Zero Secrets in Source Code**: No private keys, service account credentials, or privileged access tokens are committed to repository control.
* **Input Sanitization & XSS Prevention**: User inputs are sanitized prior to rendering, and security response headers are injected at the CDN/Hosting tier.

---

## 2. Firestore Security Rules Matrix

| Collection | Unauthenticated Public | Authenticated Admin | Validation Rules |
| :--- | :--- | :--- | :--- |
| `projects` | `read` (where `published == true`) | `create`, `update`, `delete`, `read` | Must be published or Admin UID |
| `blogPosts` | `read` (where `published == true`) | `create`, `update`, `delete`, `read` | Must be published or Admin UID |
| `contactMessages` | `create` (with valid schema) | `read`, `update`, `delete` | Non-empty name, email, message |
| `users` | `deny` | `read`, `write` | Restricted to Admin UID |
| `auditLogs` | `deny` | `read`, `write` | Restricted to Admin UID |

---

## 3. Storage Security Rules

* **Public Read**: Allowed for assets within `/public/` directory (cover images, artifact documents).
* **Admin Uploads**: Restricted to Admin UID with file type limits (MIME validation for `image/*` and `application/pdf`) and maximum file size cap of **10 MB** per file.

---

## 4. Threat Model & Mitigations

### A. Unauthenticated Administrative Access
* **Threat**: Attacker attempts to forge client state or bypass client route guards to manipulate portfolio content.
* **Mitigation**: Security rules evaluate `request.auth != null` and match the user ID against authorized Admin roles at the database boundary. Direct REST/SDK calls without valid tokens are rejected with permission-denied status.

### B. Contact Form Spam & Automated Bot Abuse
* **Threat**: Automated bots flood the contact form with spam or malicious payload links.
* **Mitigation**: Integrated invisible honeypot parameter (`website_url_hp`). Bots filling out the honeypot field are silently dropped. Firestore schema validation enforces payload boundary limits.

### C. Cross-Site Scripting (XSS) & Content Injection
* **Threat**: Malicious HTML injection in contact messages or Markdown content.
* **Mitigation**: React's safe DOM escaping handles dynamic output. Security headers (`X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`, `X-Frame-Options: DENY`) are enforced via `firebase.json`.

---

## 5. Security Assumptions & Known Limitations

1. **Firebase Public Config**: Firebase API keys included in `src/services/firebase.js` are public identifiers for client app initialization (standard Firebase architecture). Security relies entirely on Firestore & Storage Security Rules.
2. **Spark Plan Quotas**: Rate limiting relies on Firestore security rules and native quota limits (50k reads/day) on the Firebase free tier.
