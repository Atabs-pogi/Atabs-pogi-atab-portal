import { string, object, number } from "yup";

export const TuxySchema = object().shape({
  id: number(),
  name: string().required("Required"),
  goodPrice: number().min(1, "Should be greater than or equal to 1").required("Required"),
  discartePrice: number().min(1, "Should be greater than or equal to 1").required("Required"),
  resecoPrice: number().min(1, "Should be greater than or equal to 1").required("Required"),
});

export const initialTuxy = {
  id: undefined,
  name: "",
  goodPrice: 0,
  discartePrice: 0,
  resecoPrice: 0,
};
export default TuxySchema;
