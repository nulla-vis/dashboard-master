import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Golongan from "./pages/Golongan"
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  const [theme, colorMode] = useMode();
  const { setMode } = colorMode;
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    severity: "error",
    title: "Err001",
    message: "This is an Example error of 001",
  });
  const [userData, setUserData] = useState({
    user_name: "",
    user_role: "",
    user_theme: "dark"
  });
  

  const login = () => {
    setLoggedIn(true);
    return <Navigate to={"/"} />;
  };

  const logout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3131/auth/user/", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success" || data.statusCode === 200) {
          setUserData(data.payload);
          setLoggedIn(true);
          setMode("dark");
        } else {
          setError({
            severity: "error",
            title: data.payload.code,
            message: data.payload.id,
          });
          setLoggedIn(false);
          setUserData({
            user_name: "",
            user_role: "",
            user_theme: "dark"
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent loading={loading} theme={theme} />; // Pass the theme to LoadingComponent
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loggedIn && <Sidebar userData={userData} />}
          <main className="content">
            {loggedIn && <Topbar logout={logout} setError={setError} />}
            <Routes>
              <Route path="/" element={loggedIn ? (<Dashboard error={error} setError={setError} />) : (<Navigate to="/login" />)}/>
              <Route path="/golongan" element={loggedIn ? (<Golongan error={error} setError={setError} />) : (<Navigate to="/login" />)}/>
              <Route path="/login" element={ !loggedIn ? (<Login login={login} loggedIn={loggedIn} />) : (<Navigate to="/" />)}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
