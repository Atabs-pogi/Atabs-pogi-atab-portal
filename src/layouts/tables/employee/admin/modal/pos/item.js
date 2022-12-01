import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectFiber from "../../textfields/select-fiber";
import SelectGrade from "../../textfields/select-grade";

export default function PosItem({ info, onChange, disabled, allowDelete, onDelete, autoFocus }) {
  const [item, setItem] = useState(info || {});
  useEffect(() => {
    onChange?.(item);
  }, [item]);

  const subTotal =
    (item?.fiber?.prices?.find((price) => price?.grade === item?.grade)?.price || 0) *
    (item?.kilo || 0);
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <SelectFiber
          name="name"
          disabled={disabled}
          value={item?.fiber?.id}
          onChange={(f) => {
            setItem({ ...item, fiber: f });
          }}
          sx={{ py: 1.5 }}
          autoFocus={autoFocus}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectGrade
          name="grade"
          disabled={disabled}
          value={item?.grade}
          onChange={(evt) => setItem({ ...item, grade: evt?.target?.value })}
          sx={{ pr: 7, py: 1.5 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="outlined-start-adornment"
          name="kilogram"
          label="Weight(kg)"
          disabled={disabled}
          value={item?.kilo}
          onChange={(evt) => setItem({ ...item, kilo: evt?.target?.value })}
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
          name="price"
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
      <Grid item xs={1}>
        <IconButton onClick={() => onDelete?.(item)}>
          <DeleteIcon disabled={allowDelete} sx={{ cursor: "pointer" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

PosItem.defaultProps = {
  info: {},
  onChange: () => {},
  disabled: false,
  allowDelete: false,
  onDelete: () => {},
  autoFocus: false,
};
// Typechecking props of the MDAlert
PosItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  info: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  allowDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  autoFocus: PropTypes.bool,
};
