/* eslint-disable no-unused-vars */
import axios from "axios";
// import BASE_URL from "env";
import moment from "moment";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function payday(pay) {
  return axios.post(`${BASE_URL}/payroll/`, pay).then((res) => res.data);
}

function benefit(benefitInfo) {
  return axios.post(`${BASE_URL}/payroll/benefit`, benefitInfo).then((res) => res.data);
}

function deduction(deductionInfo) {
  return axios.post(`${BASE_URL}/payroll/deductibles`, deductionInfo).then((res) => res.data);
}

function getEmployeesByPeriod(start, end, name) {
  return axios
    .get(`${BASE_URL}/payroll/review`, {
      // dating period
      params: {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
        name,
      },
    })
    .then((res) => res.data);
}

function getEmployees(date) {
  return axios
    .get(`${BASE_URL}/payroll/employees`, {
      // gawing review ito
      params: {
        date: moment(date).format("YYYY-MM-DD"),
      },
    })
    .then((res) => res.data);
}

function getEmployee(empId, start, end) {
  return axios
    .get(`${BASE_URL}/payroll/employee`, {
      params: {
        empId,
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
      },
    })
    .then((res) => res.data);
}

function getPeriod(period) {
  return axios.get(`${BASE_URL}/payroll/${period}`).then((res) => res.data);
}

export default {
  payday,
  benefit,
  deduction,
  getEmployeesByPeriod,
  getEmployees,
  getEmployee,
  getPeriod,
};
