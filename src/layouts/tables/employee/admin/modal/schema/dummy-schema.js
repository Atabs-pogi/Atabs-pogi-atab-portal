import { string, object } from "yup";

export const EmployeeSchema = object().shape({
  imageLocation: string().required("Required"),
});

export const initialEmployee = {
  imageLocation: "",
};
export default EmployeeSchema;
