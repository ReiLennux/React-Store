import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { MainLayout } from './shared/layouts/MainLayout';
import HomePage from './features/home/components/home';
import { UsersForm } from './features/users';
import UserHome from './features/users/components/userHome';
import ProductHome from './features/products/components/ProductsHome';
import ProductCreate from './features/products/components/ProductCreate';
import ProductEdit from './features/products/components/ProductEdit';
import UnauthorizedPage from './routes/unauthorized';
import { AuthPage } from './features/auth';
import CouponsPage from './features/coupons/components/CouponsPage';
import CouponCreate from './features/coupons/components/CouponCreate';
import CouponEdit from './features/coupons/components/CouponEdit';
import CartPage from './features/cart/components/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* AUTHENTICATION ROUTES */}
          <Route path="home" element={<HomePage />} />
          <Route path="user/*" element={<UserHome />} />
          <Route path="user/register" element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
              <UsersForm />
            </ProtectedRoute>
          }
          />

          {/* PRODUCT ROUTES */}
          <Route path='product/*' element={<ProductHome />} />
          <Route path='product/form' element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
              <ProductCreate />
            </ProtectedRoute>
          } />
          <Route path='product/form/:id' element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
              <ProductEdit />
            </ProtectedRoute>
          } />

          {/* COUPON ROUTES */}

          <Route path='coupon/*' element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR', 'VENTAS']}>
              <CouponsPage />
            </ProtectedRoute>
          } />
          <Route path='coupon/form' element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR', 'VENTAS']}>
              <CouponCreate />
            </ProtectedRoute>
          } />

          <Route path='coupon/form/:id' element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
              <CouponEdit />
            </ProtectedRoute>
          }
          />

          {/* CART ROUTES */}
          <Route path="cart/*" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          {/* TODO: PUBLIC ROUTES */}

          {/* REDIRECT ROUTES */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
