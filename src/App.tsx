import React, { useContext, useEffect, useState, Suspense } from "react";
import { Context } from "./context/Context";
import { AuthRoutes } from "./routes";
import DashboardLayout from "./features";

const AnimatedLogo = React.lazy(() => import("./lazy/LogoLazy"));

function App() {
  const { token } = useContext(Context);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setShowLogo(false);
      }, 2000); 
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowLogo(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (token) return (
    <Suspense fallback={<div>Loading...</div>}>
      {showLogo ? <AnimatedLogo /> : <DashboardLayout />}
    </Suspense>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showLogo ? <AnimatedLogo /> : <AuthRoutes />}
    </Suspense>
  );
}

export default App;


