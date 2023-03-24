import { string, object } from "yup";

export const SalarySchema = object().shape({
  effDate: string().required("Required"),
  expDate: string().required("Required"),
  dailyBasic: string().required("Required"),
  monthlyBasic: string().required("Required"),
  bankAccountInfo: string().required("Required"),
  taxInfo: string().required("Required"),
});

export const initialSalary = {
  effDate: "",
  expDate: "",
  dailyBasic: "",
  monthlyBasic: "",
  bankAccountInfo: "",
  taxInfo: "",
};
export default SalarySchema;
