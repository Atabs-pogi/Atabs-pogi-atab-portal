import { string, object } from "yup";

export const EmployeeSchema = object().shape({
  lastName: string().required("Required"),
  firstName: string().required("Required"),
  middleName: string().required("Required"),
  mobileNumber: string().required("Required"),
  email: string().required("Required"),
  sex: string().required("Required"),
  address: object().shape({
    houseNo: string().required("Required"),
    barangay: string().required("Required"),
    city: string().required("Required"),
    province: string().required("Required"),
  }),
  imageLocation: string().required("Required"),
  ePhoto: string().required("Required"),
});

export const initialEmployee = {
  lastName: "",
  firstName: "",
  middleName: "",
  mobileNumber: "",
  email: "",
  sex: "",
  address: {
    houseNo: "",
    barangay: "",
    city: "",
    province: "",
  },
  imageLocation: "",
  ePhoto: "",
};
export default EmployeeSchema;
