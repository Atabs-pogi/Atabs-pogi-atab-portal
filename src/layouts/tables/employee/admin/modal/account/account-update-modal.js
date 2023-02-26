import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import accountImg from "assets/images/small-logos/account.jpg";
import accountService from "services/account-service";
import SelectRole from "../../textfields/select-role";

export default function AccountUpdateModal({ selected, open, onClose, onSuccess }) {
  const [account, setAccount] = React.useState({ ...selected });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [activeStatus, setActiveStatus] = React.useState(false);
  const [unactiveStatus, setUnactiveStatus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newAccount = {
      ...account,
    };
    accountService
      .updateAccount(newAccount)
      .then(() => {
        setAccount({});
        onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setStatusActive = () => {
    setAccount({ ...account, status: 1 });
    setActiveStatus(true);
    setUnactiveStatus(false);
  };

  const setStatusUnactive = () => {
    setAccount({ ...account, status: 0 });
    setActiveStatus(false);
    setUnactiveStatus(true);
  };

  const disableButton = () => account.status === 1;

  React.useEffect(() => {
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line no-unused-expressions
      disableButton() ? setStatusActive() : setStatusUnactive();
    }
  }, []);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh", maxHeight: "100vh", overflowX: "auto" }}
        >
          <Grid item xs={6}>
            <Card sx={{ width: "180vh", height: "95vh", flexDirection: "row", display: "flex" }}>
              <MDBox
                component="img"
                src={accountImg}
                alt="Logo"
                height="100%"
                width="20%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                  mr: 7,
                }}
              />
              <MDBox sx={{ flexGrow: 1 }}>
                <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                    <IconButton>
                      <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </MDBox>
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Account Information ({account?.accountId})
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Username"
                          name="username"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={account?.username}
                          onChange={(evt) => setAccount({ ...account, username: evt.target.value })}
                          sx={{ mb: 4, width: "25%" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "25%" }}
                          disabled={loading}
                          defaultValue={account?.password}
                          onChange={(evt) => setAccount({ ...account, password: evt.target.value })}
                          InputProps={{
                            endAdornment: (
                              <Box
                                role="button"
                                tabIndex={0}
                                onClick={() => setShowPassword(!showPassword)}
                                onKeyPress={() => setShowPassword(!showPassword)}
                                sx={{ margin: 0, cursor: "pointer" }}
                              >
                                {showPassword ? (
                                  <VisibilityIcon size={18} />
                                ) : (
                                  <VisibilityOffIcon size={18} />
                                )}
                              </Box>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectRole
                          name="role"
                          defaultValue={account?.role}
                          onChange={(evt) => setAccount({ ...account, role: evt.target.value })}
                          sx={{ mb: 3, py: 1.7, width: "25%" }}
                        />
                      </Grid>
                      <Grid item xs={3} sx={{ pb: 1, px: 1 }}>
                        <Typography sx={{ ml: 1, fontSize: "12px", color: "Gray" }}>
                          Status
                        </Typography>
                        <MDButton
                          variant="contained"
                          color={account.status === 1 ? "success" : "secondary"}
                          size="sm"
                          disabled={activeStatus}
                          sx={{ mr: 2, width: "100px" }}
                          onClick={setStatusActive}
                        >
                          Active
                        </MDButton>
                        <MDButton
                          variant="contained"
                          color={account.status === 0 ? "success" : "secondary"}
                          size="sm"
                          disabled={unactiveStatus}
                          sx={{ width: "100px" }}
                          onClick={setStatusUnactive}
                        >
                          Unactive
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {/* ERROR MESSAGE */}
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleSave}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                      >
                        Save
                      </MDButton>
                      <MDButton
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                        onClick={handleClose}
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  );
}

AccountUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
AccountUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};
