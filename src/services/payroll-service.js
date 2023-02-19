/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

function submit() {
  // return axios.post(`${apiUrl}/merchant/getAllProducts`);
  return Promise.resolve({});
}

export default { submit };
