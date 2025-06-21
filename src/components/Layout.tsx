import { Outlet, useLocation } from 'react-router-dom';
import HeroNavbar from './HeroNavbar';
import MainNavbar from './MainNavbar';
import GeneralNavBar from './GeneralNavBar';
import Footer from './Footer';
import { useUIStore } from '../store/uiStore';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isDarkTheme } = useUIStore();

  return (
    <div className={`flex flex-col min-h-screen overflow-x-hidden ${isDarkTheme ? 'bg-[#16171E]' : 'bg-white'}`}>
      {isHomePage ? (
        <>
          <HeroNavbar />
          <MainNavbar />
        </>
      ) : (
        <GeneralNavBar />
      )}
      <main className={`flex-grow ${!isHomePage ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
