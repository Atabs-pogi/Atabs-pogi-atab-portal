import { string, object, date } from "yup";

export const FarmerSchema = object().shape({
  lastName: string().required("Required"),
  firstName: string().required("Required"),
  middleName: string(""),
  mobileNumber: string().required("Required"),
  email: string().required("Required"),
  sex: string().required("Required"),
  birthday: date(),
  address: object().shape({
    houseNo: string().required("Required"),
    unit: string(""),
    barangay: string().required("Required"),
    city: string().required("Required"),
    province: string().required("Required"),
  }),
});

export const initialFarmer = {
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
};

export default FarmerSchema;
