import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginForm } from './features/auth';
import { MainLayout } from './shared/layouts/MainLayout';
import HomePage from './features/home/components/home';

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
        {/* Agrega más rutas protegidas aquí */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
