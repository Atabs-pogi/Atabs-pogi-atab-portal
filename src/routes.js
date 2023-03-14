import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BackupIcon from "@mui/icons-material/Backup";
import BadgeIcon from "@mui/icons-material/Badge";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ForestIcon from "@mui/icons-material/Forest";
import GrassIcon from "@mui/icons-material/Grass";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoreIcon from "@mui/icons-material/Store";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOffIcon from "@mui/icons-material/WorkOff";

import AccountTable from "layouts/tables/employee/admin/account-role";
import BackupTable from "layouts/tables/employee/admin/backup";
import CostingBillTable from "layouts/tables/employee/admin/costing-bill";
import EmployeeTable from "layouts/tables/employee/admin/employee";
import FarmerTable from "layouts/tables/employee/admin/farmer";
import FiberTable from "layouts/tables/employee/admin/fiber";
import GenerateBillTable from "layouts/generating-bills";
import HolidayTable from "layouts/payroll/holiday";
import MerchantProdTable from "layouts/tables/employee/admin/merchant-prod";
import MerchantTransactionHistory from "layouts/pos-merchant";
import MerchantTransactionPage from "layouts/pos-merchant/transaction";
import PayrollTable from "layouts/payroll";
import PosPage from "layouts/pos";
import PriceLogsTable from "layouts/tables/employee/admin/pricelogs";
import Reports from "layouts/tables/employee/admin/reports";
import SignOut from "layouts/authentication/sign-out";
import TuxyTable from "layouts/tables/employee/admin/tuxy";
import TransactionPage from "layouts/pos/transaction";

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
    icon: <ForestIcon fontSize="small">table-view</ForestIcon>,
    route: "/tuxy",
    component: <TuxyTable />,
  },
  {
    type: "collapse",
    name: "Price Logs",
    key: "pricelogs",
    icon: <HistoryIcon fontSize="small">table-view</HistoryIcon>,
    route: "/pricelogs",
    component: <PriceLogsTable />,
  },

  {
    type: "collapse",
    name: "Costing Bill",
    key: "costingbill",
    icon: <PaymentsIcon fontSize="small">table-view</PaymentsIcon>,
    route: "/costingbill",
    component: <CostingBillTable />,
  },
  {
    type: "collapse",
    name: "Generate Bill",
    key: "generate-bill",
    icon: <PaymentIcon fontSize="small">table-view</PaymentIcon>,
    route: "/generate-bill",
    component: <GenerateBillTable />,
  },
  {
    type: "collapse",
    name: "Backup Data",
    key: "backup",
    icon: <BackupIcon fontSize="small">table-view</BackupIcon>,
    route: "/backup",
    component: <BackupTable />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <FileDownloadIcon fontSize="small">table-view</FileDownloadIcon>,
    route: "/reports",
    component: <Reports />,
  },
];

const storeRoutes = [
  {
    type: "collapse",
    name: "Merchant Product",
    key: "merchantProduct",
    icon: <StoreIcon fontSize="small">table-view</StoreIcon>,
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
    component: <MerchantTransactionPage />,
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

const payrollRoutes = [
  {
    type: "divider",
    key: "hr-divider",
    role: ["cashier", "pos"],
  },
  {
    type: "title",
    title: "Payroll",
    role: ["hr"],
    key: "hr",
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
    name: "Holiday",
    key: "holiday",
    icon: <WorkOffIcon fontSize="small">table-view</WorkOffIcon>,
    route: "/holiday",
    role: ["hr"],
    component: <HolidayTable />,
  },
  {
    type: "collapse",
    name: "Payroll",
    key: "payroll",
    icon: <PaidIcon fontSize="small">table-view</PaidIcon>,
    route: "/payroll",
    role: ["hr"],
    component: <PayrollTable />,
  },
];

const routes = [
  ...dashboardRoutes,
  ...registrationRoutes,
  ...storeRoutes,
  ...posRoutes,
  ...payrollRoutes,
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
