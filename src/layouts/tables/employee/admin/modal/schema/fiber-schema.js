import { string, object } from "yup";

export const FiberSchema = object().shape({
  name: string().required("Required"),
  grade: string().required("Required"),
  price: string().required("Required"),
});

export const initialFiber = {
  name: "",
  grade: "",
  price: "",
};
export default FiberSchema;
