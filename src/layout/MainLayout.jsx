import { useState, useEffect, useRef, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminAside from "./AdminAside";
import Header from "./Header";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div ref={headerRef}>
        <Header open={open} setOpen={setOpen} />
      </div>
      <div
        className="flex flex-1"
        style={{ marginTop: `${headerHeight}px`, backgroundColor: "black" }}
      >
        <AdminAside open={open} setOpen={setOpen} />
        <div
          className={`flex-1 overflow-y-auto bg-black transition-all duration-300 ease-in-out ${
            open ? "md:ml-[13rem]" : "md:ml-[6rem]"
          }`}
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet key={location.pathname} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
