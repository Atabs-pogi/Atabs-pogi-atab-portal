import React from "react";
import Modal from "components/Modal";
import PropTypes from "prop-types";
import tuxyImg from "assets/images/small-logos/account.jpg";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import merchantProdService from "services/merchant-prod-service";
import ItemGrid from "../items/item-grid";

export default function ItemModal({ open, onClose, items: selectedItems, onItemAdd }) {
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
    merchantProdService
      .getAllMerchProd(search)
      .then((e) => {
        setItems(e?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  const addCount = React.useCallback(
    (item) => selectedItems?.filter((s) => s?.productId === item?.productId)?.length || 0,
    [selectedItems]
  );

  const listItems = items?.map?.((item) => ({
    ...item,
    count: addCount(item),
  }));

  const handleItemAdd = (item) => {
    onItemAdd?.(item);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleClose}
      title="Select Item"
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
          <ItemGrid items={listItems} loading={loading} onItemAdd={handleItemAdd} />
        </MDBox>
      </MDBox>
    </Modal>
  );
}

ItemModal.defaultProps = {
  open: false,
  onClose: () => {},
  items: [],
  onItemAdd: () => {},
};

ItemModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  onItemAdd: PropTypes.func,
};
