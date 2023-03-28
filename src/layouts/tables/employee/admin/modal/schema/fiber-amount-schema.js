import { string, object } from "yup";

export const FiberSchema = object().shape({
  excellentFiberAmount: string().required("Required"),
  goodFiberAmount: string().required("Required"),
  resecoFiberAmount: string().required("Required"),
  excellentOrCode: string().required("Required"),
  goodOrCode: string().required("Required"),
  resecoOrCode: string().required("Required"),
});

export const initialFiberAmount = {
  excellentFiberAmount: "",
  goodFiberAmount: "",
  resecoFiberAmount: "",
  excellentOrCode: "",
  goodOrCode: "",
  resecoOrCode: "",
};
export default FiberSchema;
