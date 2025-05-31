import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginForm } from './features/auth';
import { MainLayout } from './shared/layouts/MainLayout';
import HomePage from './features/home/components/home';
import { UsersForm } from './features/users';
import UserHome from './features/users/components/userHome';

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
        <Route path="home" element={<HomePage/>} />
        <Route path="user/*" element={<UserHome/>} />
        <Route path="user/register" element={<UsersForm />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
