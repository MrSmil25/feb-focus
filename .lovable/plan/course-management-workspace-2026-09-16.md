# Course Management Workspace

## Goal
Turn Courses into the academic center of the app while preserving the current design system, navigation, colors, and Home dashboard.

## Course list
- Enrich every current-semester course card with course code, SKS, lecturer, next class day and time, room, and live upcoming-task count.
- Keep the existing mobile-first card grid and calm Notion/Linear-inspired visual hierarchy.
- Make each complete card open its dedicated course workspace.

## Course workspace
- Expand the header with course name, code, SKS, lecturer, assistant lecturer, and next class context.
- Preserve the five tabs: Overview, Materials, Notes, Tasks, and Schedule.
- **Overview:** course details, weekly lecture schedule, room, lecturer, assistant lecturer, and assistant-session information.
- **Materials:** organized Textbook, PDF, Slides, and Important Link resources, including descriptions and working attachment/link actions.
- **Notes:** create, edit, delete, topic-organize, and attach-file interactions, scoped to the selected course.
- **Tasks:** course-specific assignments with deadline, priority, status, and quick completion.
- **Schedule:** separate lecture, assistant-session, and exam entries with time, location, and type.

## Technical details
- Extend the existing in-file course data model with assistant, resources, notes, tasks, and schedule data.
- Keep interaction state in the current app component; no login, database, route, or navigation changes.
- Reuse existing buttons, cards, tabs, typography, tokens, and animations.
- Verify the course list and all five workspace tabs at mobile and desktop sizes, including note creation/editing and task completion.
