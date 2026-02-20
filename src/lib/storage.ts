import { Project, Developer, SubmissionStore } from "@/types";

const STORAGE_KEY = "onchainers_submissions";

function getStore(): SubmissionStore {
  if (typeof window === "undefined") return { projects: [], developers: [] };
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : { projects: [], developers: [] };
  } catch (error) {
    console.error("Failed to read storage", error);
    return { projects: [], developers: [] };
  }
}

function setStore(store: SubmissionStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error("Failed to write storage", error);
  }
}

export function getSubmissions(): SubmissionStore {
  return getStore();
}

export function saveProjectSubmission(project: Project) {
  const store = getStore();
  // Ensure no duplicate slug locally? Or just append. Append for now.
  const newProject = { ...project, slug: project.slug || `local-${Date.now()}` };
  store.projects.push(newProject);
  setStore(store);
}

export function saveDeveloperSubmission(developer: Developer) {
  const store = getStore();
  const newDev = { ...developer, slug: developer.slug || `local-${Date.now()}` };
  store.developers.push(newDev);
  setStore(store);
}

export function removeProjectSubmission(slug: string) {
  const store = getStore();
  store.projects = store.projects.filter((p) => p.slug !== slug);
  setStore(store);
}

export function removeDeveloperSubmission(slug: string) {
  const store = getStore();
  store.developers = store.developers.filter((d) => d.slug !== slug);
  setStore(store);
}
