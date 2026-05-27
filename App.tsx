import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CareersPage from './pages/CareersPage';
import HomePage from './pages/HomePage';
import VacancyPage from './pages/VacancyPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/:id" element={<VacancyPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
