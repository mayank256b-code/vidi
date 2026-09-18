import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import LoadingTransition from './components/LoadingTransition';
import BottomNav from './components/BottomNav';
import Landing from './pages/Landing';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SearchPage from './pages/Search';
import TutorProfile from './pages/TutorProfile';
import Chat from './pages/Chat';
import Bookings from './pages/Bookings';
import ProfilePage from './pages/Profile';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isLoggedIn, user } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user && !allowedRoles.includes(user.role || '')) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppContent() {
  const { user } = useApp();
  
  return (
    <>
      <div className="mobile-container">
        <LoadingTransition />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reviews" element={<Bookings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <BottomNav userRole={user?.role || null} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
