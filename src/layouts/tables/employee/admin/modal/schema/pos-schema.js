import { string, object, array } from "yup";

export const PointSaleSchema = object().shape({
  farmerId: string().required("Required"),
  items: array().of(
    object().shape({
      id: string(),
      grade: string(),
      kilo: string(),
    })
  ),
});

export const initialPos = {
  farmerId: "",
  items: [],
};

export default PointSaleSchema;
