import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContent";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    setUserDetail(user);
    login();
    navigate("/blogs");
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="h-20 bg-blue-500 flex justify-between items-center px-5">
        <h1 className="text-white md:text-2xl">Blog Site</h1>
        {isAuthenticated && (
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-white md:text-2xl ">{userDetail?.email}</h1>
            <button
              className="border px-3 py-1 rounded-lg bg-red-500 text-slate-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <div className="p-2 md:p-10">
        <Outlet />
      </div>
      <footer className="h-20 bg-blue-500"></footer>
    </>
  );
}

export default App;
