import { string, object, date } from "yup";

const CostingBillSchema = object().shape({
  name: string().required("Required"),
  type: string().required("Required"),
  dueDate: date(),
});

export const initialCostingBill = {
  name: "",
  type: "",
  dueDate: new Date(),
};

export default CostingBillSchema;
