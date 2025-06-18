import { Outlet, useLocation } from 'react-router-dom';
import HeroNavbar from './HeroNavbar';
import MainNavbar from './MainNavbar';
import GeneralNavBar from './GeneralNavBar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
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
