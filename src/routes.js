/* eslint-disable no-unused-vars */
import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

import BadgeIcon from "@mui/icons-material/Badge";
import GrassIcon from "@mui/icons-material/Grass";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmployeeTable from "layouts/tables/employee/admin/employee";
import FarmerTable from "layouts/tables/employee/admin/farmer";
import FiberTable from "layouts/tables/employee/admin/fiber";
import AccountTable from "layouts/tables/employee/admin/account-role";
import SignOut from "layouts/authentication/sign-out";
import TuxyTable from "layouts/tables/employee/admin/tuxy";
import PriceLogsTable from "layouts/tables/employee/admin/pricelogs";
import MerchantProdTable from "layouts/tables/employee/admin/merchant-prod";
import TransactionPage from "layouts/pos/transaction";
import MechantTransactionPage from "layouts/pos-merchant/transaction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PosPage from "layouts/pos";
import MerchantTransactionHistory from "layouts/pos-merchant";

const registrationRoutes = [
  {
    type: "divider",
    key: "registration-divider",
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
    type: "collapse",
    name: "Account - Role",
    key: "account",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/account",
    component: <AccountTable />,
  },
  {
    type: "collapse",
    name: "Tuxy",
    key: "tuxy",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/tuxy",
    component: <TuxyTable />,
  },
  {
    type: "collapse",
    name: "Price Logs",
    key: "pricelogs",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/pricelogs",
    component: <PriceLogsTable />,
  },
];

const storeRoutes = [
  {
    type: "collapse",
    name: "Merchant Product",
    key: "merchantProduct",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/merchantProduct",
    component: <MerchantProdTable />,
  },
  {
    type: "divider",
    key: "store-divider",
    role: ["cashier"],
  },
  {
    type: "title",
    title: "Store",
    key: "cashier",
    role: ["cashier"],
  },
  {
    type: "collapse",
    name: "New Transaction",
    key: "new-merchant-transaction",
    icon: <AddShoppingCartIcon fontSize="small">table-view</AddShoppingCartIcon>,
    route: "/new-merchant-transaction",
    role: ["cashier"],
    component: <MechantTransactionPage />,
  },
  {
    type: "collapse",
    name: "Transaction History",
    key: "merchant-sales",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/merchant-sales",
    role: ["cashier"],
    component: <MerchantTransactionHistory />,
  },
];

const dashboardRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    role: ["*"],
    component: <Dashboard />,
  },
];

const userRoutes = [
  {
    type: "divider",
    key: "user-divider",
    role: ["*"],
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    role: ["*"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    role: ["*"],
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-out",
    role: ["*"],
    component: <SignOut />,
  },
];

const posRoutes = [
  {
    type: "divider",
    key: "pos-divider",
    role: ["cashier", "pos"],
  },
  {
    type: "title",
    title: "Tuxy Sales",
    role: ["cashier", "pos"],
    key: "pos",
  },
  {
    type: "collapse",
    name: "New Transaction",
    key: "new-transaction",
    icon: <AddShoppingCartIcon fontSize="small">table-view</AddShoppingCartIcon>,
    route: "/new-transaction",
    role: ["pos"],
    component: <TransactionPage />,
  },
  {
    type: "collapse",
    name: "Transaction History",
    key: "sales",
    icon: <BadgeIcon fontSize="small">table-view</BadgeIcon>,
    route: "/sales",
    role: ["cashier", "pos"],
    component: <PosPage />,
  },
];

const routes = [
  ...dashboardRoutes,
  ...registrationRoutes,
  ...storeRoutes,
  ...posRoutes,
  ...userRoutes,
];

export const defaultRoute = {
  admin: "/dashboard",
  superAdmin: "/dashboard",
  pos: "/dashboard",
  cashier: "/dashboard",
  payroll: "/payroll",
};

export default routes;
