import { string, object } from "yup";

export const MerchantProdSchema = object().shape({
  productCategory: string().required("Required"),
  productName: string().required("Required"),
  unit: string().required("Required"),
  unitPrice: string().required("Required"),
  costPrice: string().required("Required"),
  quantity: string().required("Required"),
  minimumStock: string().required("Required"),
});

export const initialMerchantProd = {
  productCategory: "",
  productName: "",
  unit: "",
  unitPrice: "",
  costPrice: "",
  quantity: "",
  minimumStock: "",
};

export default MerchantProdSchema;
