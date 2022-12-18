import { string, object } from "yup";

export const FarmerSchema = object().shape({
  lastName: string().required("Required"),
  firstName: string().required("Required"),
  middleName: string().required("Required"),
  mobileNumber: string().required("Required"),
  email: string().required("Required"),
  sex: string().required("Required"),
  address: object().shape({
    houseNo: string().required("Required"),
    unit: string().required("Required"),
    barangay: string().required("Required"),
    city: string().required("Required"),
    province: string().required("Required"),
  }),
  imageLocation: string().required("Required"),
});

export const initialFarmer = {
  lastName: "",
  firstName: "",
  middleName: "",
  mobileNumber: "",
  email: "",
  sex: "",
  address: {
    houseNo: "",
    unit: "",
    barangay: "",
    city: "",
    province: "",
  },
  imageLocation: "",
};
export default FarmerSchema;
