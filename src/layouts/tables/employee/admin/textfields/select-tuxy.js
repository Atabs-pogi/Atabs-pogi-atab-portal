import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import AsyncSelect from "react-select/async";
import PropTypes from "prop-types";
import tuxyService from "services/tuxy-service";

export default function SelectTuxy({ onChange, ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const handleChange = (evt) => {
    console.log(evt);
    // onChange?.(match);
  };
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    tuxyService
      ?.getTuxyList("")
      .then((i) => {
        setItems(i);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ pr: 2 }}>
      <FormControl fullWidth>
        <AsyncSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ py: 1.5 }}
          onChange={handleChange}
          getOptionLabel={(e) => `${e?.name}`}
          loadOptions={tuxyService?.getTuxyList}
          // isDisabled={loading}
          defaultOptions={items}
          {...props}
        />
      </FormControl>
    </Box>
  );
}

SelectTuxy.defaultProps = {
  onChange: () => {},
};
// Typechecking props of the MDAlert
SelectTuxy.propTypes = {
  onChange: PropTypes.func,
};
