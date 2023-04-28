import { string, object } from "yup";

const CostingBillSchema = object().shape({
  vendorName: string().required("Required"),
  billType: string().required("Required"),
  accountNumber: string().required("Required"),
  referenceCode: string().required("Required"),
});

export const initialCostingBill = {
  vendorName: "",
  billType: "",
  accountNumber: "",
  referenceCode: "",
};

export default CostingBillSchema;
