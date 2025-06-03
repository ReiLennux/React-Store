import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginForm } from './features/auth';
import { MainLayout } from './shared/layouts/MainLayout';
import HomePage from './features/home/components/home';
import { UsersForm } from './features/users';
import UserHome from './features/users/components/userHome';
import ProductHome from './features/products/components/ProductsHome';
import ProductCreate from './features/products/components/ProductCreate';
import ProductEdit from './features/products/components/ProductEdit';

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
          <Route path="user/register" element={<UsersForm />} />
          <Route path='product/*' element={<ProductHome />} />
          <Route path='product/form' element={<ProductCreate />} />
          <Route path='product/form/:id' element={<ProductEdit />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
