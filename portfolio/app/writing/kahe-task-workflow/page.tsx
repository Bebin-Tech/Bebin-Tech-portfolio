import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "KAHE TMS: roles and approval workflow | Bebin R", description: "Project notes on the four roles, task handoffs, and access controls in KAHE TMS." };
export default function TaskWorkflowNotes() {
 return <main className="project-notes">
  <Link href="/#projects">← Back to projects</Link>
  <p className="section-label">Project notes · KAHE TMS</p>
  <h1>Coordinating academic tasks across four roles</h1>
  <p className="notes-lead">KAHE TMS uses React and a Django REST API to organize task assignment, submissions, and reviews between Admin, Dean, HOD, and Faculty.</p>
  <h2>The workflow</h2>
  <p>A Dean assigns an institutional task to an HOD. The HOD divides the work into faculty subtasks. Faculty submit their work for HOD review; the HOD can approve it or request changes. Completed departmental work then goes to the Dean for final review.</p>
  <ol><li>Dean: create tasks and review departmental submissions.</li><li>HOD: assign subtasks and review faculty work.</li><li>Faculty: update progress and submit assigned work.</li><li>Admin: manage users, departments, and module permissions.</li></ol>
  <h2>Authentication and permissions</h2>
  <p>The API uses JWT authentication. The frontend stores sessions separately by role, while module permissions cover access, viewing, editing, and deletion. Separate sessions help prevent one role’s login from replacing another in the browser; server-side permission checks remain essential.</p>
  <h2>What to inspect in the code</h2>
  <p>The backend core models, serializers, and views define the task and submission flow. The React pages use those endpoints for dashboards, task lists, completed work, and reports. The README documents local setup and the main routes.</p>
  <h2>Scope and next evaluation</h2>
  <p>This write-up describes the documented workflow, not a claim about adoption or time saved. Useful next measurements include approval turnaround time and the number of submissions returned for changes. Neither is currently reported here.</p>
  <a className="btn-primary" href="https://github.com/Bebin-Tech/KAHE-TMS" target="_blank" rel="noopener noreferrer">Read the source and README ↗</a>
 </main>;
}
