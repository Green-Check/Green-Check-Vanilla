import { Outlet } from 'react-router-dom';
import Header from './Header'; // Your Header component
import Footer from './Footer'; // Your Footer component
import './Layout.css'

function Layout() {
  return (
    <div>
      <Header />
      <main className='main max-w-screen h-screen flex justify-center items-center border-2 border-yellow-500'>
        <Outlet /> {/* This is where the content from each page will be rendered */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
