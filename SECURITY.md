# Security

Security architecture, authorization model and threat notes for the Aryan Neupane cybersecurity & GRC portfolio.

---

## 1. Principles

* **Server-side enforcement** — authorization is enforced by Cloud Firestore and Firebase Storage security rules. Client-side route guards are convenience only.
* **Least privilege** — writes to `projects`, `blogPosts` and `contactMessages` require an authenticated admin. Anonymous users may only read published content and create a validated contact message.
* **No secrets in source** — no service-account keys, private tokens or passwords are committed. Firebase client config and the EmailJS public key are supplied through `VITE_*` environment variables and are, by design, public browser identifiers.
* **Deny by default** — the Firestore ruleset ends with a catch-all `allow read, write: if false`.

## 2. Admin authorization model

Admin status is derived from a single source: a Firestore document at `users/{uid}` with `role == "admin"`.

* `firestore.rules` and `storage.rules` both evaluate this document; there is no hardcoded UID.
* `users/{uid}` is writable only by an existing admin, so the **first admin document must be created manually in the Firebase console**. Creating an Authentication user alone grants no privileges.
* Signing in via `/admin/login` only authenticates; every privileged read/write is still evaluated against the rules.

## 3. Firestore rules matrix

| Collection | Anonymous | Admin | Validation |
| :--- | :--- | :--- | :--- |
| `projects` | `get`, `list` where `published == true` | full | — |
| `blogPosts` | `get`, `list` where `published == true` | full | — |
| `contactMessages` | `create` only | `read`, `update`, `delete` | name ≤ 120, email ≤ 254, message ≤ 5000, all non-empty |
| `users` | deny | read own, write as admin | — |
| `auditLogs` | deny | full | — |
| everything else | deny | deny | — |

## 4. Storage rules

* `public/**` — world readable; writable only by an admin.
* Everything else — admin read/write only.
* Uploads must be `image/*` or `application/pdf` and under 10 MB. The admin UI enforces the same limits client-side for feedback only.

## 5. Contact form

* Delivery uses EmailJS directly from the browser (`VITE_EMAILJS_*`). The public key is a browser identifier; abuse protection relies on EmailJS quotas plus the checks below.
* Spam controls: hidden honeypot field (`website_url_hp`) and a minimum time-to-submit check. Both silently discard the submission.
* Client-side validation covers required fields, email shape and message length. Firestore rules re-validate the archived copy server-side.
* If EmailJS is not configured, the form states so and offers a direct mailto link rather than reporting a false success.

## 6. XSS and content injection

* All dynamic content is rendered through React's escaping; the app uses no `dangerouslySetInnerHTML`. Blog content is parsed by a small renderer that emits only headings, lists and paragraphs as React elements — raw HTML in post bodies is displayed as text, not executed.
* Response headers set in `firebase.json`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

## 7. Known limitations

1. **Public client config** — Firebase web API keys and the EmailJS public key are visible in the built bundle. This is expected; all protection comes from the security rules and EmailJS-side settings.
2. **No rate limiting** — the Spark plan offers no request throttling beyond daily quotas. Contact abuse is mitigated only by the honeypot, timing check and EmailJS quotas.
3. **Local content mode** — when `VITE_FIREBASE_*` is unset the app reads seed data and stores admin edits in `localStorage`. This mode is for local development only and carries no authorization.

## 8. Reporting

Report suspected vulnerabilities to `official.aryanneupane@gmail.com`.
