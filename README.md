# Aryan Neupane — Cybersecurity & GRC Portfolio

Personal portfolio for early-career cybersecurity and GRC work: ISO/IEC 27001:2022 and NIST CSF 2.0 practice, a simulated enterprise GRC capstone, a Splunk SOC home lab, and web/API security testing reports.

---

## 1. Stack

* **Frontend**: Vite + React 18, Lucide icons, vanilla CSS design tokens (dark default, light and system themes).
* **Backend (Firebase Spark tier)**:
  * **Authentication** — email/password sign-in for the admin CMS.
  * **Cloud Firestore** — projects, blog posts and contact messages.
  * **Storage** — images and artifact PDFs.
  * **Hosting** — static delivery with SPA rewrites and security headers.
* **Contact delivery**: EmailJS, called directly from the browser.

When the `VITE_FIREBASE_*` variables are absent the app runs in **local content mode**: it reads the seed content in `src/data/seedData.js` and persists admin edits to `localStorage`. This is for local development only.

---

## 2. Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Hero, selected work, summary, progression, capstone, certifications, posts, contact CTA |
| `/about` | Background, experience, education, certification status, practice repositories |
| `/portfolio` | Filterable project index |
| `/portfolio/[slug]` | Case study: objective, context, methodology, frameworks, artifacts, evidence, lessons |
| `/blog`, `/blog/[slug]` | Writing on risk registers, framework mapping and detection engineering |
| `/contact` | EmailJS-backed contact form |
| `/admin/login`, `/admin/dashboard` | CMS for projects, posts, messages and media |

The VertexOne case study is a **simulated** enterprise GRC capstone and is labelled as such throughout the site.

---

## 3. Environment variables

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

All of these are public browser identifiers; access control is enforced by the Firestore/Storage rules (see `SECURITY.md`).

---

## 4. Local development

```bash
npm install
npm run dev      # dev server
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

There is currently no lint or typecheck script in `package.json`.

---

## 5. Admin setup

1. Create an email/password user in Firebase Authentication.
2. In Firestore, create `users/{uid}` with `{ "role": "admin" }` for that user's UID.

Step 2 is required — authentication alone grants no write access. See `SECURITY.md` §2.

---

## 6. Deployment

```bash
npm run build
npx -y firebase-tools@latest hosting:channel:deploy preview   # temporary preview URL
npx -y firebase-tools@latest deploy --only hosting,firestore:rules,storage
```

A `.firebaserc` (project alias) must exist or be supplied with `--project <id>`. The custom domain `aryanneupane.com.np` is managed through Cloudflare DNS and must not be pointed at Firebase until the preview has been reviewed.
