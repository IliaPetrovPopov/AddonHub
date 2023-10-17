import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { getUserData, getUserRole } from "../services/users.service";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user === null) return;

        const snapshot = await getUserData(user.uid);
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        } else {
          const username = Object.keys(snapshot.val())[0];
          const userRole = await getUserRole(username);
          setRole(userRole);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.any,
};
