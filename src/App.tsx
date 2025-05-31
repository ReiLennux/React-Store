import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { Home } from 'lucide-react';
import { LoginForm } from './features/auth';
import { MainLayout } from './shared/layouts/MainLayout';

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
        <Route path="home" element={<Home />} />
        {/* Agrega más rutas protegidas aquí */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
