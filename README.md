<img src="public/favicon/favicon.svg" width="48" alt="project icon" />

# Wedding Invitation

> A digital wedding invitation for Josip & Storm's wedding, with animated envelope reveal, interactive RSVP system, and detailed event information.

![Deploy](https://github.com/SirBepy/wedding-invitation/actions/workflows/deploy.yml/badge.svg) ![Last Commit](https://img.shields.io/github/last-commit/SirBepy/wedding-invitation) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)

**Live:** https://sirbepy.github.io/wedding-invitation/

---

## About

A fully interactive digital wedding invitation built with React. Guests are greeted with an animated envelope that opens to reveal the invitation, followed by a smooth transition into the main content.

Features include a detailed wedding timeline, FAQ sections for general and travel questions, location details with map links, and a complete RSVP system backed by Google Apps Script and Google Sheets. Guests can search for their name, manage group RSVPs, and receive confirmation - while the couple gets email notifications with response summaries.

---

## How to run

```bash
npm install
npm run dev
```

Requires a `.env` file with `VITE_APPS_SCRIPT_URL` pointing to the Google Apps Script deployment URL. See `.env.example`.

---

## Project write-up

See [PORTFOLIO.md](.portfolio-data/PORTFOLIO.md) for the full project write-up.
