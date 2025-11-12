import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { SubjectsPageEnhanced } from './components/SubjectsPageEnhanced';
import { MaterialsPage } from './components/MaterialsPage';
import { UploadPage } from './components/UploadPage';
import { ProfilePage } from './components/ProfilePage';
import { Header } from './components/Header';
import { Toaster } from './components/ui/sonner';

export type Page = 'login' | 'register' | 'forgotPassword' | 'subjects' | 'materials' | 'upload' | 'profile';

export interface User {
  id: string;
  nickname: string;
  email: string;
  avatar?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - generate unique user tag
    const userTag = 'user' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setUser({
      id: userTag,
      nickname: 'Student123',
      email: email,
    });
    setCurrentPage('subjects');
  };

  const handleRegister = (nickname: string, email: string, password: string) => {
    // Mock registration - generate unique user tag
    const userTag = 'user' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setUser({
      id: userTag,
      nickname: nickname,
      email: email,
    });
    setCurrentPage('subjects');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSelectedSubject(null);
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentPage('materials');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {user && (
        <Header
          user={user}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentPage('register')}
          onForgotPassword={() => setCurrentPage('forgotPassword')}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'forgotPassword' && (
        <ForgotPasswordPage
          onBackToLogin={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'subjects' && user && (
        <SubjectsPageEnhanced onSubjectSelect={handleSubjectSelect} />
      )}

      {currentPage === 'materials' && user && selectedSubject && (
        <MaterialsPage
          subjectId={selectedSubject}
          onBack={() => setCurrentPage('subjects')}
        />
      )}

      {currentPage === 'upload' && user && (
        <UploadPage />
      )}

      {currentPage === 'profile' && user && (
        <ProfilePage user={user} />
      )}
    </div>
  );
}

export default App;