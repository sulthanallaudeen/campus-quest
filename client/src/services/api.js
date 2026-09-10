import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api"
});

export function getStudentId() {
  return localStorage.getItem("studentId");
}

export function setStudentId(id) {
  localStorage.setItem("studentId", id);
}

export function clearStudentId() {
  localStorage.removeItem("studentId");
}
