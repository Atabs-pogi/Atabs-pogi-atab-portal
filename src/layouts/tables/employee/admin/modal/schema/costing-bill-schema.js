import { string, object } from "yup";

export const CostingBillSchema = object().shape({
  name: string().required("Required"),
  type: string().required("Required"),
});

export const initialCostingBill = {
  name: "",
  type: "",
};

export default CostingBillSchema;
