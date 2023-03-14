import { string, object } from "yup";

const CostingBillSchema = object().shape({
  name: string().required("Required"),
  type: string().required("Required"),
  referenceCode: string().required("Required"),
});

export const initialCostingBill = {
  name: "",
  type: "",
  referenceCode: "",
};

export default CostingBillSchema;
