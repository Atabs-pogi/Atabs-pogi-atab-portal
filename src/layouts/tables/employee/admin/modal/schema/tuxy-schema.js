import { string, object, number } from "yup";

export const TuxySchema = object().shape({
  name: string().required("Required"),
  price: object().shape({
    good: number().min(1, "Should be greater than or equal to 1").required("Required"),
    discarte: number().min(1, "Should be greater than or equal to 1").required("Required"),
    reseco: number().min(1, "Should be greater than or equal to 1").required("Required"),
  }),
});

export const initialTuxy = {
  name: "",
  price: {
    good: 0,
    discarte: 0,
    reseco: 0,
  },
};
export default TuxySchema;
