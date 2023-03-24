/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

// const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function generateReport(report, filename, fileType) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "http://localhost:8080/report/generate",
      responseType: "blob",
      data: report,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}.${fileType}`);
        document.body.appendChild(link);
        link.click();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default { generateReport };
