import { string, object } from "yup";

export const CostingBillSchema = object().shape({
  name: string().required("Required"),
  type: string().required("Required"),
  accountNo: string().required("Required"),
  amount: string().required("Required"),
});

export const initialCostingBill = {
  name: "",
  type: "",
  accountNo: "",
  amount: "",
};

export default CostingBillSchema;
