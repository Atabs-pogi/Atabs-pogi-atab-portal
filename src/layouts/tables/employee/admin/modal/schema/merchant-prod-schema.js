import { string, object } from "yup";

export const MerchantProdSchema = object().shape({
  item: string().required("Required"),
  price: string().required("Required"),
  quantity: string().required("Required"),
});

export const initialMerchantProd = {
  item: "",
  price: "",
  quantity: "",
};

export default MerchantProdSchema;
