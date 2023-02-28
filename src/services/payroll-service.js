/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";
import moment from "moment";

const DEFAULT_DELAY = 1000;

function submit(pay) {
  return axios.post(`${apiUrl}/payroll/`, pay).then((res) => res.data);
}

function getEmployees(period) {
  return axios
    .get(`${apiUrl}/payroll/employees`, { params: { period: moment(period).format("YYYY-MM-DD") } })
    .then((res) => res.data);
}

function getEmployee(id) {
  return axios.get(`${apiUrl}/payroll/employee/${id}`).then((res) => res.data);
}

function getPeriod(period) {
  return axios.get(`${apiUrl}/payroll/${period}`).then((res) => res.data);
}

export default { submit, getEmployees, getEmployee, getPeriod };
