import { useEffect, useState } from "react";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import { Route, Routes } from "react-router-dom";
import LoginView from "./views/LogIn/LogInView";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SettingsView from "./views/Settings/SettingsView";
import { ResetPassword } from "./components/LogIn/ResetPassword";
import SignUpView from "./views/SignUp/SignUpView";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { RoleProvider } from "./context/RoleContext";
import UserList from "./components/UserList/UserList";
import { DragNDrop } from "./components/DragNDrop/DragNDrop";
import { Home } from "./views/Home/Home";
import SingleAddonView from "./views/SingleAddon/SingleAddon";
import AddonList from "./components/AddonList/AddonList";
import ReauthenticateView from "./views/Reauthenticate/ReauthenticateView";
import Edit from "./views/Edit/Edit";
import { BrowseAll } from "./components/BrowseAll/BrowseAll";
import AboutUsView from "./views/AboutUsView/AboutUsView";
import { HelmetProvider } from "react-helmet-async";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "./config/particles-config";
import { CreateAddon } from "./views/CreateAddon/CreateAddon";

const App = () => {
  const helmetContext = {};
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [appState, setAppState] = useState({
    user,
    userData: null,
  });

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = () => {};

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user !== appState.user) {
      setAppState((prevState) => ({
        ...prevState,
        user,
      }));
    }

    if (user === null) {
      setUserData(null);
      return;
    }

    getUserData(user.uid).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error("User data not found");
      }
      setUserData(Object.values(snapshot.val())[0]);

      setAppState({
        ...appState,
        userData: Object.values(snapshot.val())[0],
      });
    });
  }, [user]);

  return (
    <HelmetProvider context={helmetContext}>
      <AuthContext.Provider value={{ ...appState, setContext: setAppState }}>
        <RoleProvider>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
          />
          <div
            className="App"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <div className="container mx-auto min-h-screen max-w-full">
              <NavBar userData={userData} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowseAll />} />
                <Route path="/create-addon" element={<CreateAddon />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/reauth" element={<ReauthenticateView />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/signup" element={<SignUpView />} />
                <Route path="/settings" element={<SettingsView />} />
                <Route path="/users/:username" element={<UserDashboard />} />
                <Route path="/addons/:uid" element={<SingleAddonView />} />
                <Route path="/addons/:uid/edit" element={<Edit />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/addon-list" element={<AddonList />} />
                <Route path="/about-us" element={<AboutUsView />} />
                <Route path="drag-n-drop-dev" element={<DragNDrop />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </RoleProvider>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
