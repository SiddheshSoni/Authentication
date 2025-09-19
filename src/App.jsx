import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserProfile from './components/Profile/UserProfile.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
