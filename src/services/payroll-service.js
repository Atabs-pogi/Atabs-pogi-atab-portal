/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

function submit(pay) {
  return axios.post(`${apiUrl}/payroll/`, pay).then((res) => res.data);
}

function getEmployees() {
  return axios.get(`${apiUrl}/payroll/employees`).then((res) => res.data);
}

function getEmployee(id) {
  return axios.get(`${apiUrl}/payroll/employee/${id}`).then((res) => res.data);
}

export default { submit, getEmployees, getEmployee };
