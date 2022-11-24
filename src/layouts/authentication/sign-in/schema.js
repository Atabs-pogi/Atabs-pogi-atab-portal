import { string, object } from "yup";

// const passwordSequence = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters , 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const Schema = object().shape({
  username: string().required("Username is Required"),
  password: string().required("Password is Required"),
});

export default Schema;
