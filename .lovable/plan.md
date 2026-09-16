# Personal Course Workspace Upgrade

## Goal
Make each course feel like a complete personal study space while preserving the current navigation, design system, course cards, colors, and typography.

## Course header
- Keep the premium academic header and ensure it clearly presents course name, code, SKS, lecturer, assistant lecturer, weekly schedule, and room.

## Workspace tabs
- **Overview:** add a concise course summary, teaching team details, current completion progress, and a focused list of upcoming deadlines.
- **Materials:** support Textbook, Slides, PDF, External Link, and Article resources with title, description, attachment/link, plus an in-workspace form for saving new resources.
- **Notes:** retain and refine note creation, editing, topic organization, attachments, deletion, and empty states.
- **Tasks:** retain course-specific deadlines, priority, status, and quick completion with progress reflected in Overview.
- **Schedule:** retain calendar-style cards for lectures, assistant sessions, and exams.

## Technical details
- Extend existing course data with summaries and richer material types.
- Add course-scoped resource state and creation interactions inside the workspace.
- Derive progress and upcoming deadlines directly from the course task state.
- Keep all data local to the existing personal app; no authentication, backend, routes, or navigation changes.
- Verify the workspace tabs and key interactions on mobile and desktop.
