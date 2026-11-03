import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';
import ElementsPage from './pages/ElementsPage';
import ElementsAlertsPage from './pages/ElementsAlertsPage';
import ElementsBadgesPage from './pages/ElementsBadgesPage';
import ElementsButtonsPage from './pages/ElementsButtonsPage';
import ElementsCardsPage from './pages/ElementsCardsPage';
import ElementsFormsPage from './pages/ElementsFormsPage';
import ElementsModalsPage from './pages/ElementsModalsPage';
import ElementsTablesPage from './pages/ElementsTablesPage';
import FilesPage from './pages/FilesPage';
import FormsPage from './pages/FormsPage';
import HelpPage from './pages/HelpPage';
import MessagesPage from './pages/MessagesPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import ReportsPage from './pages/ReportsPage';
import SecurityPage from './pages/SecurityPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TwoFactorPage from './pages/TwoFactorPage';
import LockScreenPage from './pages/LockScreenPage';
import NotFoundPage from './pages/404Page';
import ServerErrorPage from './pages/500Page';
import MaintenancePage from './pages/MaintenancePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="elements" element={<ElementsPage />} />
        <Route path="elements/alerts" element={<ElementsAlertsPage />} />
        <Route path="elements/badges" element={<ElementsBadgesPage />} />
        <Route path="elements/buttons" element={<ElementsButtonsPage />} />
        <Route path="elements/cards" element={<ElementsCardsPage />} />
        <Route path="elements/forms" element={<ElementsFormsPage />} />
        <Route path="elements/modals" element={<ElementsModalsPage />} />
        <Route path="elements/tables" element={<ElementsTablesPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="two-factor" element={<TwoFactorPage />} />
        <Route path="lock-screen" element={<LockScreenPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="500" element={<ServerErrorPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
