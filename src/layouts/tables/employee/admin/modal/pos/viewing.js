import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SelectFiber from "../../textfields/select-tuxy";
import SelectGrade from "../../textfields/select-grade";

export default function PosItem({ info }) {
  const item = {
    price: info?.plantPrice,
    kilo: info?.plantKilogram,
    grade: info?.plantGrade,
    fiber: {
      // id: fibers.find((f) => f.name === info?.plantName)?.id,
    },
  };

  const subTotal = (item?.price || 0) * (item?.kilo || 0);
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <SelectFiber readOnly value={item?.fiber?.id} sx={{ py: 1.5 }} />
      </Grid>
      <Grid item xs={2}>
        <SelectGrade readOnly value={item?.grade} sx={{ pr: 7, py: 1.5 }} />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="outlined-start-adornment"
          label="Weight(kg)"
          readOnly
          value={item?.kilo}
          sx={{ pr: 2, mb: 5 }}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography component="span" sx={{ fontSize: "15px" }}>
                  kg
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="outlined-basic"
          label="Price"
          readOnly
          value={subTotal}
          // onBlur={formik.handleBLur}
          // error={formik.touched.price && Boolean(formik.errors.price)}
          // helperText={formik.touched.price && formik.errors.price}
          variant="outlined"
          type="number"
          sx={{ pr: 2 }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

PosItem.defaultProps = {
  info: {},
};
// Typechecking props of the MDAlert
PosItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  info: PropTypes.object,
};
