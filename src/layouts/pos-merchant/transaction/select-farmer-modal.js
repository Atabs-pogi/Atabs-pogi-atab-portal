import React from "react";
import PropTypes from "prop-types";
import tuxyImg from "assets/images/small-logos/account.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import farmerService from "services/farmer-service";
import MDBox from "components/MDBox";
import Modal from "components/Modal";
import FarmerGrid from "../farmer/farmer-grid";

export default function FarmerModal({ open, onClose, farmer: selectedFarmer, onFarmerSelect }) {
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    onClose?.();
  };

  const handleSearchChange = (evt) => {
    setSearch(evt?.target?.value);
  };

  const handleSearch = () => {
    setLoading(true);
    farmerService
      .searchFarmer(search)
      .then((e) => {
        setItems(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  const isAdded = React.useCallback(
    (item) => selectedFarmer?.farmerId === item?.farmerId,
    [selectedFarmer]
  );

  const listItems = items?.map((item) => ({
    ...item,
    added: isAdded(item),
  }));

  const handleItemAdd = (item) => {
    onFarmerSelect?.(item);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleClose}
      title="Select Farmer"
      picture={tuxyImg}
      noCancel
      saveText="Done"
    >
      <MDBox sx={{ display: "flex", flexDirection: "column" }}>
        <MDBox>
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearchChange}
            value={search}
            sx={{ paddingBottom: 1 }}
          />
        </MDBox>
        <MDBox sx={{ flexGrow: 1 }}>
          <FarmerGrid items={listItems} loading={loading} onFarmerSelect={handleItemAdd} />
        </MDBox>
      </MDBox>
    </Modal>
  );
}

FarmerModal.defaultProps = {
  open: false,
  onClose: () => {},
  farmer: null,
  onFarmerSelect: () => {},
};

FarmerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  farmer: PropTypes.object,
  onFarmerSelect: PropTypes.func,
};
