import { string, object, date } from "yup";

export const EmployeeSchema = object().shape({
  lastName: string().required("Required"),
  firstName: string().required("Required"),
  middleName: string(""),
  mobileNumber: string().required("Required"),
  email: string(""),
  sex: string().required("Required"),
  birthday: date(),
  address: object().shape({
    houseNo: string(""),
    unit: string(""),
    barangay: string().required("Required"),
    city: string().required("Required"),
    province: string().required("Required"),
  }),
  imageLocation: string().required("Required"),
});

export const initialEmployee = {
  lastName: "",
  firstName: "",
  middleName: "",
  mobileNumber: "",
  email: "",
  sex: "",
  birthday: new Date(),
  address: {
    houseNo: "",
    barangay: "",
    unit: "",
    city: "",
    province: "",
  },
  imageLocation: "",
};
export default EmployeeSchema;
