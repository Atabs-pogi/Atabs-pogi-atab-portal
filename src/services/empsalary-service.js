/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function addSalary(employee) {
  return axios.post(`${BASE_URL}/salary/`, employee);
}

function getSalary() {
  return axios.get(`${BASE_URL}/salary/`).then((res) => res.data);
}

function updateSalary(salary) {
  return axios.put(`${BASE_URL}/salary/`, salary);
}

export default {
  addSalary,
  getSalary,
  updateSalary,
};
