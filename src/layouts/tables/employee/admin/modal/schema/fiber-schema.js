import { string, object, number } from "yup";

export const FiberSchema = object().shape({
  name: string().required("Required"),
  grade: string().required("Required"),
  price: string().required("Required"),
  stripping: string().required("Required"),
  knifeUsed: number().min(1, "Should be greater than or equal to 1").required("Required"),
});

export const initialFiber = {
  name: "",
  grade: "",
  price: "",
  stripping: "",
  knifeUsed: 0,
};
export default FiberSchema;
