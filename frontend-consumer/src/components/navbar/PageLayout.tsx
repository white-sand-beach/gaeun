import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

// 상단바를 숨기고 싶은 경로 목록
const hideNavBarLayoutPaths = ['/none'];
// 하단바를 숨기고 싶은 경로 목록
const hideFooterLayoutPaths = ['/cart'];

const PageLayout = () => {
  const location = useLocation();
  const showNavBarLayout = !hideNavBarLayoutPaths.includes(location.pathname);
  const showFooterLayout = !hideFooterLayoutPaths.includes(location.pathname);

  return (
    <div>
      {showNavBarLayout && <NavBar />}
      {showFooterLayout && <Footer />}
    </div>
  );
};

export default PageLayout;