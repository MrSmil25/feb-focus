import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft, BookOpen, CalendarDays, Check, CheckCircle2, ChevronRight, Clock3,
  FileText, GraduationCap, Home, Library, Link2, ListTodo, MapPin, MoreHorizontal,
  Plus, Search, Sparkles, UserRound, X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type View = "home" | "courses" | "calendar" | "tasks" | "library";
type Task = { id: number; title: string; course: string; due: string; priority: "High" | "Medium"; done: boolean };

const courses = [
  { code: "ECAC600056", title: "Akuntansi Manajemen untuk Bisnis", sks: 2, lecturer: "Rahfiani Khairurzka, S.E., M.A.", day: "Tuesday", time: "08:00 – 10:30", room: "A.303", accent: "bg-primary" },
  { code: "ECMN600040", title: "Manajemen Produk dan Harga", sks: 3, lecturer: "Dr. Karto Adiwijaya, S.E., M.M.", assistant: "Sri Daryanti, S.E., M.M.", day: "Tuesday", time: "11:00 – 13:30", room: "A.212", accent: "bg-academic" },
  { code: "ECMN600020", title: "Bisnis Internasional", sks: 3, lecturer: "Aswin Dewanto Hadisumarto, S.E., M.I.A.", day: "Wednesday", time: "08:00 – 10:30", room: "B.111", accent: "bg-success" },
  { code: "ECMN600018", title: "Metode Riset Bisnis", sks: 3, lecturer: "Lenny Suardi, S.Si., M.Si.", day: "Thursday", time: "14:00 – 16:30", room: "B.101", accent: "bg-warning" },
];

const schedule = [
  { day: "Mon", date: "14", items: [{ time: "08:00", title: "Pengambilan Keputusan Manajerial", room: "A.306", kind: "Lecture" }, { time: "14:00", title: "Pengantar Kewirausahaan", room: "B.211", kind: "Lecture" }] },
  { day: "Tue", date: "15", items: [{ time: "08:00", title: "Akuntansi Manajemen", room: "A.303", kind: "Lecture" }, { time: "11:00", title: "Manajemen Produk dan Harga", room: "A.212", kind: "Lecture" }, { time: "16:00", title: "Review pricing strategy", room: "Library", kind: "Study" }] },
  { day: "Wed", date: "16", items: [{ time: "08:00", title: "Bisnis Internasional", room: "B.111", kind: "Lecture" }, { time: "13:00", title: "Assistant session", room: "Online", kind: "Assistant" }] },
  { day: "Thu", date: "17", items: [{ time: "08:00", title: "Perencanaan Pemasaran", room: "B.110", kind: "Lecture" }, { time: "14:00", title: "Metode Riset Bisnis", room: "B.101", kind: "Lecture" }] },
  { day: "Fri", date: "18", items: [{ time: "10:00", title: "Midterm preparation", room: "FEB Library", kind: "Study" }] },
];

const initialTasks: Task[] = [
  { id: 1, title: "Marketing Analysis", course: "Perencanaan Pemasaran", due: "20 Sep", priority: "High", done: false },
  { id: 2, title: "Cost behavior worksheet", course: "Akuntansi Manajemen", due: "22 Sep", priority: "Medium", done: false },
  { id: 3, title: "Read chapter 4", course: "Bisnis Internasional", due: "Today", priority: "Medium", done: false },
  { id: 4, title: "Research question draft", course: "Metode Riset Bisnis", due: "15 Sep", priority: "High", done: true },
];

const courseWorkspaceTasks: [Task, Task] = [
  { id: 101, title: "Marketing Analysis", course: "Perencanaan Pemasaran", due: "20 Sep", priority: "High", done: false },
  { id: 102, title: "Cost behavior worksheet", course: "Akuntansi Manajemen", due: "22 Sep", priority: "Medium", done: false },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Rasyid Academic — FEB UI Companion" },
    { name: "description", content: "Rasyid's personal academic command center for courses, schedules, tasks, and study materials." },
    { property: "og:title", content: "Rasyid Academic — FEB UI Companion" },
    { property: "og:description", content: "A personal academic command center for a FEB UI Management student." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AcademicApp,
});

function AcademicApp() {
  const [view, setView] = useState<View>("home");
  const [workspace, setWorkspace] = useState<(typeof courses)[number] | null>(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState("");

  const navigate = (next: View) => { setWorkspace(null); setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleTask = (id: number) => setTasks((items) => items.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((items) => [...items, { id: Date.now(), title: newTask.trim(), course: "Personal study", due: "Today", priority: "Medium", done: false }]);
    setNewTask(""); setShowAdd(false); setView("tasks");
  };

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground md:pb-8">
      <DesktopHeader view={view} navigate={navigate} />
      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 md:py-8">
        {workspace ? <CourseWorkspace course={workspace} onBack={() => setWorkspace(null)} /> : (
          <div key={view} className="page-enter">
            {view === "home" && <HomeView tasks={tasks} toggleTask={toggleTask} openCourses={() => navigate("courses")} />}
            {view === "courses" && <CoursesView onOpen={setWorkspace} />}
            {view === "calendar" && <CalendarView />}
            {view === "tasks" && <TasksView tasks={tasks} toggleTask={toggleTask} showAdd={showAdd} setShowAdd={setShowAdd} newTask={newTask} setNewTask={setNewTask} addTask={addTask} />}
            {view === "library" && <LibraryView />}
          </div>
        )}
      </main>
      {!workspace && <BottomNav view={view} navigate={navigate} />}
    </div>
  );
}

function Brand() {
  return <div className="flex min-w-0 items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><GraduationCap className="size-5" /></div><div className="min-w-0"><p className="font-display text-sm font-bold">RASYID ACADEMIC</p><p className="truncate text-xs text-muted-foreground">Universitas Indonesia</p></div></div>;
}

function DesktopHeader({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  return <header className="sticky top-0 z-30 hidden border-b border-border bg-surface/95 backdrop-blur md:block"><div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6"><Brand /><nav className="flex gap-1">{navItems.map(({ id, label }) => <Button key={id} variant={view === id ? "academic" : "ghost"} onClick={() => navigate(id)}>{label}</Button>)}</nav><div className="grid size-9 place-items-center rounded-full bg-academic text-sm font-bold text-academic-foreground">RS</div></div></header>;
}

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home }, { id: "courses", label: "Courses", icon: BookOpen }, { id: "calendar", label: "Calendar", icon: CalendarDays }, { id: "tasks", label: "Tasks", icon: ListTodo }, { id: "library", label: "Library", icon: Library },
];

function BottomNav({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  return <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface/95 px-2 pt-2 shadow-[0_-8px_24px_color-mix(in_oklab,var(--academic)_8%,transparent)] backdrop-blur md:hidden">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => navigate(id)} aria-label={label} className={`flex min-w-0 flex-col items-center gap-1 py-1 text-[10px] font-semibold transition-colors ${view === id ? "text-academic" : "text-muted-foreground"}`}><span className={`grid size-8 place-items-center rounded-xl ${view === id ? "bg-primary" : ""}`}><Icon className="size-4" /></span>{label}</button>)}</nav>;
}

function MobileTop({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 md:hidden"><div className="min-w-0"><p className="mb-1 text-xs font-semibold uppercase text-academic">{eyebrow}</p><h1 className="truncate text-2xl font-bold">{title}</h1></div>{action}</div>;
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-base font-bold md:text-lg">{title}</h2>{action}</div>; }

function HomeView({ tasks, toggleTask, openCourses }: { tasks: Task[]; toggleTask: (id: number) => void; openCourses: () => void }) {
  return <div>
    <MobileTop eyebrow="Wednesday, 16 September" title="Good Morning, Rasyid 👋" action={<div className="grid size-10 place-items-center rounded-full bg-academic text-xs font-bold text-academic-foreground">RS</div>} />
    <section className="mb-7 overflow-hidden rounded-2xl bg-academic p-5 text-academic-foreground shadow-lg md:p-8"><div className="flex items-center gap-2 text-xs font-semibold opacity-80"><span className="size-2 rounded-full bg-primary" />SEMESTER GASAL 2026/2027</div><h1 className="mt-3 hidden text-3xl font-bold md:block">Good Morning, Rasyid 👋</h1><p className="mt-2 max-w-xl text-sm opacity-85">Manajemen FEB UI · Week 5 of 16</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-academic-foreground/20"><div className="h-full w-[31%] rounded-full bg-primary" /></div></section>
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)]"><div className="space-y-7">
      <section><SectionHeader title="Today’s schedule" action={<button onClick={() => openCourses()} className="text-xs font-semibold text-academic">View courses</button>} /><article className="academic-card overflow-hidden"><div className="flex"><div className="w-2 shrink-0 bg-primary" /><div className="min-w-0 flex-1 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-academic">08:00 — 10:30</span><MoreHorizontal className="size-5 text-muted-foreground" /></div><h3 className="text-lg font-bold">Akuntansi Manajemen untuk Bisnis</h3><div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><span className="flex items-center gap-2"><MapPin className="size-4 text-academic" />Room A.303</span><span className="flex items-center gap-2"><UserRound className="size-4 text-academic" />Rahfiani Khairurzka</span></div></div></div></article></section>
      <section><SectionHeader title="Up next" /><div className="academic-card divide-y divide-border">{[{ time: "11:00", title: "Manajemen Produk dan Harga", meta: "A.212 · Lecture" }, { time: "13:00", title: "Assistant session", meta: "Online · Bisnis Internasional" }].map((item) => <div key={item.title} className="grid grid-cols-[3.4rem_minmax(0,1fr)_auto] items-center gap-3 p-4"><span className="text-xs font-bold text-academic">{item.time}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.meta}</p></div><ChevronRight className="size-4 text-muted-foreground" /></div>)}</div></section>
      <section><SectionHeader title="Academic tasks" action={<span className="text-xs text-muted-foreground">{tasks.filter(t => !t.done).length} open</span>} /><div className="space-y-2">{tasks.filter(t => !t.done).slice(0,3).map(task => <TaskRow key={task.id} task={task} toggleTask={toggleTask} />)}</div></section>
    </div><aside className="space-y-7"><section><SectionHeader title="Academic progress" /><div className="academic-card p-5"><div className="mb-5 flex items-end justify-between"><div><p className="text-xs text-muted-foreground">SKS completed</p><p className="mt-1 font-display text-3xl font-bold">92<span className="text-sm text-muted-foreground"> / 144</span></p></div><span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-academic">64%</span></div><Progress value={64} className="h-2" /><div className="mt-6 grid grid-cols-2 gap-3"><Metric label="Semester" value="31%" /><Metric label="Courses" value="8 active" /></div></div></section><section><SectionHeader title="Study next" /><div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-md"><Sparkles className="size-5" /><h3 className="mt-8 text-lg font-bold">Pricing strategy notes</h3><p className="mt-2 text-xs leading-5 opacity-75">Continue your summary before Tuesday’s lecture.</p><Button variant="academic" size="sm" className="mt-4">Open notes <ChevronRight /></Button></div></section></aside></div>
  </div>;
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>; }

function CoursesView({ onOpen }: { onOpen: (course: (typeof courses)[number]) => void }) {
  return <div><MobileTop eyebrow="Semester 1" title="My Courses" /><div className="mb-7 hidden md:block"><p className="text-sm text-academic">Semester Gasal 2026/2027</p><h1 className="mt-1 text-3xl font-bold">My Courses</h1></div><div className="mb-5 flex gap-2 overflow-x-auto pb-1"><span className="shrink-0 rounded-full bg-academic px-3 py-1.5 text-xs font-semibold text-academic-foreground">All courses · 8</span><span className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">Today · 2</span></div><div className="grid gap-4 sm:grid-cols-2">{courses.map(course => <button key={course.code} onClick={() => onOpen(course)} className="academic-card group overflow-hidden text-left transition-transform hover:-translate-y-0.5"><div className={`h-2 ${course.accent}`} /><div className="p-5"><div className="flex items-start justify-between gap-4"><span className="text-xs font-semibold text-academic">{course.code}</span><span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">{course.sks} SKS</span></div><h2 className="mt-4 min-h-12 text-base font-bold leading-6">{course.title}</h2><p className="mt-4 text-xs text-muted-foreground">Lecturer</p><p className="mt-1 line-clamp-1 text-sm font-medium">{course.lecturer}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs"><span className="flex items-center gap-1.5"><CalendarDays className="size-4 text-academic" />{course.day}, {course.time}</span><ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></div></div></button>)}</div></div>;
}

function CourseWorkspace({ course, onBack }: { course: (typeof courses)[number]; onBack: () => void }) {
  const lectureStart = course.time.split(" – ").at(0) ?? course.time;
  return <div className="page-enter"><Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2"><ArrowLeft /> Courses</Button><div className="mb-6 overflow-hidden rounded-2xl bg-academic p-5 text-academic-foreground md:p-8"><div className="flex items-center justify-between"><span className="text-xs font-semibold opacity-75">{course.code}</span><span className="rounded-lg bg-academic-foreground/15 px-2.5 py-1 text-xs font-semibold">{course.sks} SKS</span></div><h1 className="mt-5 max-w-2xl text-2xl font-bold md:text-3xl">{course.title}</h1><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs opacity-85"><span className="flex items-center gap-2"><Clock3 className="size-4" />{course.day}, {course.time}</span><span className="flex items-center gap-2"><MapPin className="size-4" />Room {course.room}</span></div></div><Tabs defaultValue="overview"><TabsList className="mb-5 flex h-auto w-full justify-start overflow-x-auto bg-transparent p-0"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="materials">Materials</TabsTrigger><TabsTrigger value="notes">Notes</TabsTrigger><TabsTrigger value="tasks">Tasks</TabsTrigger><TabsTrigger value="schedule">Schedule</TabsTrigger></TabsList><TabsContent value="overview"><div className="grid gap-4 md:grid-cols-2"><InfoCard title="Course team" icon={UserRound}><Info label="Lecturer" value={course.lecturer} /><Info label="Assistant lecturer" value={course.assistant ?? "Not assigned"} /><Info label="Assistant class" value="Wednesday, 13:00 · Online" /></InfoCard><InfoCard title="Weekly schedule" icon={CalendarDays}><Info label="Lecture" value={`${course.day}, ${course.time}`} /><Info label="Room" value={course.room} /><Info label="Period" value="24 Aug — 8 Dec 2026" /></InfoCard></div></TabsContent><TabsContent value="materials"><ResourceList /></TabsContent><TabsContent value="notes"><div className="academic-card p-5"><h2 className="text-base font-bold">Personal notes</h2><textarea aria-label="Personal course notes" defaultValue="Pricing decisions connect customer value, demand elasticity, and the cost structure." className="mt-4 min-h-44 w-full resize-none rounded-xl border border-input bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring" /></div></TabsContent><TabsContent value="tasks"><div className="space-y-2"><TaskRow task={courseWorkspaceTasks[0]} toggleTask={() => {}} /><TaskRow task={courseWorkspaceTasks[1]} toggleTask={() => {}} /></div></TabsContent><TabsContent value="schedule"><div className="academic-card p-5"><ScheduleLine time={lectureStart} title="Weekly lecture" meta={`${course.day} · ${course.room}`} /><ScheduleLine time="13:00" title="Assistant session" meta="Wednesday · Online" /></div></TabsContent></Tabs></div>;
}

function InfoCard({ title, icon: Icon, children }: { title: string; icon: typeof UserRound; children: React.ReactNode }) { return <section className="academic-card p-5"><div className="mb-5 flex items-center gap-2"><Icon className="size-5 text-academic" /><h2 className="text-base font-bold">{title}</h2></div><div className="space-y-4">{children}</div></section>; }
function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div>; }
function ResourceList() { return <div className="academic-card divide-y divide-border">{[{ icon: BookOpen, title: "Pricing Strategy — Chapter 4", type: "Textbook" }, { icon: FileText, title: "Week 5 Lecture Slides", type: "PDF · 2.4 MB" }, { icon: Link2, title: "Case: Unilever Indonesia", type: "Important link" }].map(({ icon: Icon, title, type }) => <div key={title} className="flex items-center gap-3 p-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-academic"><Icon className="size-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{type}</p></div><ChevronRight className="size-4 text-muted-foreground" /></div>)}</div>; }

function CalendarView() {
  const [selectedDay, setSelectedDay] = useState("Wed");
  const selected = schedule.find(day => day.day === selectedDay);
  if (!selected) return null;
  return <div><MobileTop eyebrow="September 2026" title="Academic Calendar" action={<Button variant="outline" size="icon" aria-label="Calendar options"><MoreHorizontal /></Button>} /><div className="mb-7 hidden items-end justify-between md:flex"><div><p className="text-sm text-academic">September 2026</p><h1 className="mt-1 text-3xl font-bold">Academic Calendar</h1></div><div className="flex gap-2"><span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-academic">Week</span><span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">Month</span></div></div><div className="mb-5 grid grid-cols-5 gap-2">{schedule.map(day => <button key={day.day} onClick={() => setSelectedDay(day.day)} className={`rounded-xl py-3 text-center transition-colors ${selectedDay === day.day ? "bg-academic text-academic-foreground shadow-md" : "bg-surface text-muted-foreground"}`}><span className="block text-[10px] font-semibold">{day.day}</span><span className="mt-1 block font-display text-lg font-bold">{day.date}</span><span className={`mx-auto mt-1 block size-1.5 rounded-full ${day.items.length ? "bg-primary" : "bg-transparent"}`} /></button>)}</div><div className="md:hidden"><p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">{selected.day}, {selected.date} September</p><div className="space-y-3">{selected.items.map(item => <ScheduleCard key={item.time + item.title} item={item} />)}</div></div><div className="hidden overflow-hidden rounded-2xl border border-border bg-surface md:grid md:grid-cols-5">{schedule.map(day => <div key={day.day} className="min-h-[520px] border-r border-border p-3 last:border-r-0"><div className="mb-4 text-center"><p className="text-xs text-muted-foreground">{day.day}</p><p className="font-display text-lg font-bold">{day.date}</p></div><div className="space-y-3">{day.items.map(item => <ScheduleCard key={item.time + item.title} item={item} compact />)}</div></div>)}</div><div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground"><Legend color="bg-primary" label="Lecture" /><Legend color="bg-academic" label="Assistant" /><Legend color="bg-success" label="Personal study" /></div></div>;
}
function ScheduleCard({ item, compact = false }: { item: { time: string; title: string; room: string; kind: string }; compact?: boolean }) { const color = item.kind === "Lecture" ? "border-primary" : item.kind === "Assistant" ? "border-academic" : "border-success"; return <article className={`academic-card border-l-4 ${color} ${compact ? "p-3" : "p-4"}`}><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-academic">{item.time}</span><span className="text-[10px] text-muted-foreground">{item.kind}</span></div><h3 className={`mt-2 font-bold leading-5 ${compact ? "text-xs" : "text-sm"}`}>{item.title}</h3><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{item.room}</p></article>; }
function Legend({ color, label }: { color: string; label: string }) { return <span className="flex items-center gap-2"><span className={`size-2 rounded-full ${color}`} />{label}</span>; }

function TasksView({ tasks, toggleTask, showAdd, setShowAdd, newTask, setNewTask, addTask }: { tasks: Task[]; toggleTask: (id: number) => void; showAdd: boolean; setShowAdd: (value: boolean) => void; newTask: string; setNewTask: (value: string) => void; addTask: () => void }) {
  const [tab, setTab] = useState("today");
  const filtered = useMemo(() => tab === "completed" ? tasks.filter(t => t.done) : tab === "today" ? tasks.filter(t => !t.done && t.due === "Today") : tasks.filter(t => !t.done), [tasks, tab]);
  return <div><MobileTop eyebrow="Academic planner" title="Tasks" action={<Button variant="yellow" size="icon" onClick={() => setShowAdd(true)} aria-label="Create assignment"><Plus /></Button>} /><div className="mb-7 hidden items-end justify-between md:flex"><div><p className="text-sm text-academic">Academic planner</p><h1 className="mt-1 text-3xl font-bold">Tasks</h1></div><Button variant="yellow" onClick={() => setShowAdd(true)}><Plus /> Create assignment</Button></div>{showAdd && <div className="academic-card mb-5 p-4"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><input autoFocus value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Assignment title" className="min-w-0 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /><Button variant="academic" onClick={addTask}><Check /> Add</Button></div><button onClick={() => setShowAdd(false)} className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><X className="size-3" />Cancel</button></div>}<div className="mb-5 flex gap-2 border-b border-border">{["today", "upcoming", "completed"].map(value => <button key={value} onClick={() => setTab(value)} className={`border-b-2 px-3 pb-3 text-sm font-semibold capitalize ${tab === value ? "border-academic text-academic" : "border-transparent text-muted-foreground"}`}>{value}</button>)}</div><div className="space-y-2">{filtered.length ? filtered.map(task => <TaskRow key={task.id} task={task} toggleTask={toggleTask} />) : <div className="py-16 text-center"><CheckCircle2 className="mx-auto size-9 text-success" /><h2 className="mt-4 text-base font-bold">All clear</h2><p className="mt-1 text-sm text-muted-foreground">Nothing needs your attention here.</p></div>}</div></div>;
}

function TaskRow({ task, toggleTask }: { task: Task; toggleTask: (id: number) => void }) { return <article className="academic-card grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4"><button onClick={() => toggleTask(task.id)} aria-label={task.done ? `Mark ${task.title} incomplete` : `Complete ${task.title}`} className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors ${task.done ? "border-success bg-success text-academic-foreground" : "border-input bg-background"}`}>{task.done && <Check className="size-3.5" />}</button><div className="min-w-0"><p className={`truncate text-sm font-semibold ${task.done ? "text-muted-foreground line-through" : ""}`}>{task.title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{task.course}</p></div><div className="text-right"><p className={`text-xs font-semibold ${task.due === "Today" ? "text-destructive" : "text-academic"}`}>{task.due}</p><p className="mt-1 text-[10px] text-muted-foreground">{task.priority}</p></div></article>; }

function LibraryView() {
  const [query, setQuery] = useState("");
  const items = [{ title: "Management Accounting", description: "Horngren · Core textbook", type: "Books", course: "Akuntansi Manajemen", icon: BookOpen }, { title: "Pricing Strategy — Week 5", description: "Lecture slides · PDF", type: "Lecture Files", course: "Manajemen Produk", icon: FileText }, { title: "International Market Entry", description: "Harvard Business Review", type: "Articles", course: "Bisnis Internasional", icon: Link2 }, { title: "Research Design Summary", description: "Personal study note", type: "Personal Notes", course: "Metode Riset Bisnis", icon: FileText }];
  const visible = items.filter(item => `${item.title} ${item.description} ${item.course}`.toLowerCase().includes(query.toLowerCase()));
  return <div><MobileTop eyebrow="Knowledge workspace" title="Library" action={<Button variant="yellow" size="icon" aria-label="Add library item"><Plus /></Button>} /><div className="mb-7 hidden items-end justify-between md:flex"><div><p className="text-sm text-academic">Knowledge workspace</p><h1 className="mt-1 text-3xl font-bold">Library</h1></div><Button variant="yellow"><Plus /> Add resource</Button></div><label className="mb-5 flex items-center gap-3 rounded-xl border border-input bg-surface px-4 py-3"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search books, files, and notes" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label><div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[{ label: "Books", count: 12, icon: BookOpen }, { label: "Articles", count: 28, icon: Link2 }, { label: "Lecture Files", count: 46, icon: FileText }, { label: "Personal Notes", count: 19, icon: FileText }].map(({ label, count, icon: Icon }) => <button key={label} className="academic-card p-4 text-left"><Icon className="size-5 text-academic" /><p className="mt-5 text-sm font-bold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{count} items</p></button>)}</div><SectionHeader title="Recently opened" /><div className="academic-card divide-y divide-border">{visible.map(({ title, description, course, icon: Icon }) => <button key={title} className="flex w-full items-center gap-3 p-4 text-left"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-academic"><Icon className="size-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{description} · {course}</p></div><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div></div>;
}

function ScheduleLine({ time, title, meta }: { time: string; title: string; meta: string }) { return <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-l-2 border-primary py-3 pl-4"><span className="text-xs font-bold text-academic">{time}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{meta}</p></div></div>; }