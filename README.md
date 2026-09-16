# FEB Study Hub

I want to build a personal mobile-first academic management application for myself as a Universitas Indonesia FEB Management student.

Reference images attached:

- SLCM UI Universitas Indonesia Dashboard

- SLCM UI Course/Class Detail Page

- SATU UI Module Selection Page

- SLCM UI Academic Schedule Calendar

Use these references as visual inspiration for:

- Universitas Indonesia academic identity

- color system

- typography hierarchy

- information organization

- academic product feeling

IMPORTANT:

Do not copy SLCM as an enterprise academic portal.

SLCM is only a reference for UI identity and academic structure.

Transform it into a modern personal academic companion app inspired by:

- Notion

- Linear

- Apple Calendar

- Things 3

The purpose of this app:

Help one student manage their entire academic life:

- courses

- class schedules

- assistant sessions

- lecturers

- learning materials

- assignments

- deadlines

- study notes

This is a personal application:

- No login page

- No authentication

- No multi-user system

- Only one student profile

================================================

DESIGN SYSTEM

Create a premium academic productivity interface.

Visual direction:

- Clean

- Minimal

- Modern

- Professional

- Personal

Use Universitas Indonesia visual identity:

Primary:

UI Yellow (#FFD900)

Secondary:

Academic Blue (#234E8A)

Background:

White / Soft gray

Text:

Dark navy / charcoal

Design characteristics:

- Rounded cards

- Soft shadows

- Spacious layout

- Clear typography hierarchy

- Smooth subtle animations

- Mobile-first responsive design

================================================

APP STRUCTURE

Create bottom navigation:

1. Home

2. Courses

3. Calendar

4. Tasks

5. Library

================================================

PAGE 1: HOME DASHBOARD

Create a personalized academic dashboard.

The dashboard should feel like a student's command center, not an administrative portal.

Header:

Show:

"Good Morning, Rasyid 👋"

Below:

"Manajemen FEB UI"

"Semester Gasal 2026/2027"

Main sections:

1. Today's Schedule

Display today's classes.

Example:

08:00 - 10:30

Akuntansi Manajemen untuk Bisnis

Room:

A303

Lecturer:

Rahfiani Khairurzka

Use modern cards inspired by the SLCM schedule design.

2. Upcoming Classes

Show next academic activities.

3. Academic Tasks

Show:

- assignment deadlines

- unfinished tasks

- priority

Example:

Marketing Analysis

Due:

20 September

Status:

In Progress

4. Academic Progress

Show simple progress visualization:

SKS completed

Semester progress

Course completion

================================================

PAGE 2: COURSES

Create course management page.

Each course should appear as a card.

Example:

Manajemen Produk dan Harga

ECMN600040

3 SKS

Lecturer:

Dr. Karto Adiwijaya

Assistant:

(if available)

Weekly Schedule:

Tuesday

11:00 - 13:30

Room:

A212

Clicking a course opens Course Workspace.

================================================

COURSE WORKSPACE

Create detailed course page.

Tabs:

Overview

Materials

Notes

Tasks

Schedule

Overview:

Show:

Course information

Lecturer

Assistant lecturer

Assistant class

Schedule

Room

Materials:

Allow storing:

- textbook

- PDF files

- lecture slides

- important links

Notes:

Personal learning notes.

Tasks:

Course-specific assignments.

Schedule:

Show lectures and assistant sessions.

================================================

PAGE 3: CALENDAR

Create weekly academic calendar inspired by SLCM schedule screenshot.

Requirements:

- weekly view

- time blocks

- course cards

- room information

- lecturer information

Support:

Lecture

Assistant session

Exam

Personal study time

Example:

Monday

08:00

Pengambilan Keputusan Manajerial

A306

14:00

Pengantar Kewirausahaan

B211

Use a cleaner mobile-friendly version of SLCM calendar.

================================================

PAGE 4: TASK MANAGEMENT

Create academic task manager.

Features:

- Create assignment

- Deadline

- Priority

- Course relation

- Completion status

Views:

Today

Upcoming

Completed

================================================

PAGE 5: LIBRARY

Create personal academic knowledge library.

Categories:

Books

Articles

Lecture Files

Personal Notes

Each item can contain:

Title

Description

Link

Attachment

Related course

================================================

UX PRINCIPLES

The app should answer these questions quickly:

1. What class do I have today?

2. What do I need to finish?

3. Where is my learning material?

4. What should I study next?

5. How is my academic progress?

Avoid:

- complicated menus

- large data tables

- enterprise dashboard feeling

- excessive information density

The final result should feel like:

"Notion + Apple Calendar + Universitas Indonesia academic identity"

A personal academic operating system for a FEB UI student.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://feb-focus.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d51de845-2c9b-4ccc-8c4d-3a1ad7943658).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
