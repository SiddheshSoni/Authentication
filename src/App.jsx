import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useContext } from 'react';
import AuthContext from './store/AuthenticationContext.jsx';

function App() {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        {isLoggedIn && (<Route path='/profile' element={<ProfilePage />} />)}
        <Route path='*' element={<Navigate to="/auth" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
