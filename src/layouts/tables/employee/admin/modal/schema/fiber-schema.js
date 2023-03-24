import { string, object } from "yup";

export const FiberSchema = object().shape({
  excellentFiberKg: string().required("Required"),
  goodFiberKg: string().required("Required"),
  resecoFiberKg: string().required("Required"),
});

export const initialFiber = {
  excellentFiberKg: "",
  goodFiberKg: "",
  resecoFiberKg: "",
};
export default FiberSchema;
