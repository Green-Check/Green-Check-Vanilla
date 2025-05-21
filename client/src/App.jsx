import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy loading the components
const Layout = lazy(() => import('./components/Layout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/AboutPage'));
const Profile = lazy(() => import('./pages/ProfilePage'));

function App() {
  return (
    <div className='w-screen overflow-x-hidden h-screen border-2 border-red-500'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Layout component will wrap all routes */}
          <Route path="/" element={<Layout />}>
              {/* Default route (Home Page) */}
              <Route index element={<HomePage />} />
              {/* About Page */}
              <Route path="about" element={<About />} />
              {/* Profile Page */}
              <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
