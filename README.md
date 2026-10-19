# Northstar Payroll Portal — Hard-coded Credentials CTF

A **deliberately insecure**, dependency-free CTF challenge (HTML/CSS/JavaScript). All names and payslips are fictional.

## Run

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd payroll-ctf
python3 -m http.server 8080
```

Then visit http://localhost:8080. You can also deploy these 3 files as a **static** site (e.g. Vercel).

## Participant prompt (paste into CTFd)

> **Payroll Portal: The Forgotten Account**
>
> The payroll team migrated to a new sign-in system, but an old shortcut may still exist in the website's source files.
> Can you find the administrator's credentials and sign in to recover the flag?
>
> **Hint:** Inspect the JavaScript files loaded by the browser.

**Category:** Web / Source Inspection  
**Difficulty:** Easy  
**Suggested points:** 100  
**CWE:** CWE-798 (Use of Hard-coded Credentials)

## Organizer-only answer key (don't include in participant materials)

- Employee login: `employee01` / `Employee123!`
- Target admin login: `payroll_admin` / `Payroll@2026!`
- CTFd flag: `CTF{SOURCE_CODE_SECRETS_ARE_NOT_SECRET}`
- Intended solution: Developer Tools → Sources (or view `app.js`) → find the `PAYROLL_USERS` array → log in with admin credentials → copy flag.

## Important limitation

This is a **fully client-side** simulation. Because the flag and credentials live in public JavaScript, a user can recover the flag without logging in. There is **no actual authentication or security boundary**. For a competitive, scored CTF, use a backend/serverless route to hold the flag, validate credentials, and rate-limit attempts. Never add actual company credentials or payroll records to this repository.
