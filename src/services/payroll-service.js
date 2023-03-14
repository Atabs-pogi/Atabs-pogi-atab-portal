/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";
import moment from "moment";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function submit(pay) {
  return axios.post(`${BASE_URL}/payroll/`, pay).then((res) => res.data);
}

function getEmployees(period) {
  return axios
    .get(`${BASE_URL}/payroll/employees`, {
      params: { period: moment(period).format("YYYY-MM-DD") },
    })
    .then((res) => res.data);
}

function getEmployee(id) {
  return axios.get(`${BASE_URL}/payroll/employee/${id}`).then((res) => res.data);
}

function getPeriod(period) {
  return axios.get(`${BASE_URL}/payroll/${period}`).then((res) => res.data);
}

export default { submit, getEmployees, getEmployee, getPeriod };
