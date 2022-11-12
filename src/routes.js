import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

import BadgeIcon from "@mui/icons-material/Badge";
import GrassIcon from "@mui/icons-material/Grass";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmployeeTable from "layouts/tables/employee/admin/employee";
import FarmerTable from "layouts/tables/employee/admin/farmer";
import FiberTable from "layouts/tables/employee/admin/fiber";

const cashierRoutes = [
  {
    type: "title",
    title: "Cashier",
    key: "cashier",
  },
  {
    type: "collapse",
    name: "Cashier",
    key: "cashier",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/cashier",
    component: <EmployeeTable />,
  },
  {
    type: "divider",
    key: "divider",
  },
].map((route) => ({ ...route, role: ["cashier", "superAdmin"] }));

const posRoutes = [
  {
    type: "title",
    title: "Point of Sales",
    key: "pos",
  },
  {
    type: "collapse",
    name: "Sales",
    key: "sales",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/sales",
    component: <EmployeeTable />,
  },
  {
    type: "divider",
    key: "divider1",
  },
].map((route) => ({ ...route, role: ["pos", "superAdmin"] }));
const adminRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "title",
    title: "Registration",
    key: "registration",
  },
  {
    type: "collapse",
    name: "Employee",
    key: "employee",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/employee",
    component: <EmployeeTable />,
  },
  {
    type: "collapse",
    name: "Farmers",
    key: "farmers",
    icon: <GrassIcon fontSize="small">table_view</GrassIcon>,
    route: "/farmers",
    component: <FarmerTable />,
  },
  {
    type: "collapse",
    name: "Fiber",
    key: "fiber",
    icon: <StorefrontIcon fontSize="small">table_view</StorefrontIcon>,
    route: "/fiber",
    component: <FiberTable />,
  },
  {
    type: "divider",
    key: "divider2",
  },
].map((route) => ({ ...route, role: ["admin", "superAdmin"] }));

const routes = [
  ...adminRoutes,
  ...cashierRoutes,
  ...posRoutes,
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export const defaultRoute = {
  admin: "/dashboard",
  superAdmin: "/dashboard",
  pos: "/sales",
  cashier: "/cashier",
  payroll: "/payroll",
};

export default routes;
