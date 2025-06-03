import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginForm } from './features/auth';
import { MainLayout } from './shared/layouts/MainLayout';
import HomePage from './features/home/components/home';
import { UsersForm } from './features/users';
import UserHome from './features/users/components/userHome';
import ProductHome from './features/products/components/ProductsHome';
import ProductCreate from './features/products/components/ProductCreate';
import ProductEdit from './features/products/components/ProductEdit';
import UnauthorizedPage from './routes/unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="user/*" element={<UserHome />} />
          <Route path="user/register" element={
            <ProtectedRoute allowedRoles={['SYSADMIN']}>
              <UsersForm />
            </ProtectedRoute>
          }
          />
          <Route path='product/*' element={<ProductHome />} />
          <Route path='product/form' element={<ProductCreate />} />
          <Route path='product/form/:id' element={<ProductEdit />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
