import { string, object } from "yup";

export const FarmerSchema = object().shape({
  lastName: string().required("Required"),
  firstName: string().required("Required"),
  middleName: string(""),
  mobileNumber: string().required("Required"),
  email: string(""),
  sex: string().required("Required"),
  address: object().shape({
    houseNo: string(""),
    unit: string(""),
    barangay: string().required("Required"),
    city: string().required("Required"),
    province: string().required("Required"),
  }),
  imageLocation: string().required("Required"),
  affiliation: string().required("Required"),
  civilStatus: string().required("Required"),
  educationalAttainment: string().required("Required"),
  estimatedAnnualIncome: string().required("Required"),
  facebookAccount: string().required("Required"),
  noOfDependents: string().required("Required"),
  spouse: string().required("Required"),
  viberAccount: string().required("Required"),
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
  affiliation: "",
  civilStatus: "",
  educationalAttainment: "",
  estimatedAnnualIncome: "",
  facebookAccount: "",
  noOfDependents: "",
  spouse: "",
  viberAccount: "",
};
export default FarmerSchema;
