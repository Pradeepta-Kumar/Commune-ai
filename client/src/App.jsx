import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Main from "./app/Main";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/Check-auth";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./app/Sign-in";
import AuthRegister from "./app/Sign-up";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import Chat from "./app/Chat";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log({user});

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="sign-in" element={<AuthLogin />} />
          <Route path="sign-up" element={<AuthRegister />} />
        </Route>

        <Route
          path="/chat"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Chat />
            </CheckAuth>
          }
        />
      </Routes>
      {!isAuthenticated ? <Footer /> : <></>}
    </>
  );
}

export default App;
