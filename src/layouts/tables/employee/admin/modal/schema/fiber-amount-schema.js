import { string, object } from "yup";

export const FiberSchema = object().shape({
  excellentFiberAmount: string().required("Required"),
  goodFiberAmount: string().required("Required"),
  resecoFiberAmount: string().required("Required"),
});

export const initialFiberAmount = {
  excellentFiberAmount: "",
  goodFiberAmount: "",
  resecoFiberAmount: "",
};
export default FiberSchema;
