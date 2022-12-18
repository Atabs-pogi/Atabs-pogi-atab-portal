/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";

// @mui icon

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in.jpg";
import finailLogo from "assets/images/small-logos/final_logo.jpg";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import accountService from "services/account-service";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "user-context/user-context";
import { Schema } from "./schema";

function Basic() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [user, userDispatch] = useUserContext();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      setLoading(true);
      setError("");
      const creds = {
        username: formik?.values?.username,
        password: formik?.values?.password,
      };
      accountService
        .authenticate(creds)
        .then((info) => {
          window.sessionStorage.setItem("currentUser", JSON.stringify(info));
          userDispatch.login(info);
          navigate("/dashboard");
        })
        .catch((err) => {
          let message = "";
          if (err?.response?.status === 400) {
            message = "Invalid Username / Password";
          } else if (err?.response?.status === 500) {
            message = "Internal Server Error";
          }
          setError(message || err?.message);
        })
        .finally(() => {
          setLoading(false);
          // PARA TANGGALIN ANG NAIIWANG PASSWORD KAPAG NAG LOGIN
          actions?.resetForm({ values: { ...values, password: "" } });
        });
    },
  });
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDBox
            component="img"
            src={finailLogo}
            alt="Logo"
            height="60px"
            sx={{ borderRadius: "40%" }}
          />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
              id="outlined-basic"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              variant="outlined"
              disabled={loading}
              fullWidth
              sx={{
                paddingBottom: 3,
              }}
            />
            <TextField
              id="outlined-password-input"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBLur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              fullWidth
              sx={{
                paddingBottom: 3,
              }}
            />
            {error}
            <MDButton type="submit" name="login-btn" variant="contained" fullWidth color="success">
              Login
            </MDButton>
          </form>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
