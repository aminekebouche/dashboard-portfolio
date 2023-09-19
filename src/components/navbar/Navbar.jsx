import React, { useState } from "react";
import "./navbar.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { signOut, getAuth } from "firebase/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Loged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar">
      <NotificationsNoneIcon style={{ color: "gray" }} />
      <div className="navbar-profile">
        <img src="/images/pdp.jpg" alt="pdp" />
      </div>
      <div className="navbar-name">
        <h1>Kebouche Amine</h1>
        <p>Admin</p>
      </div>
      {open && (
        <div className="navbar-modal">
          <div className="btn-modal" onClick={logOut}>
            <LogoutIcon />
            <p>Logout</p>
          </div>
          <div className="btn-modal">
            <PersonIcon />
            <p>Mon profile</p>
          </div>
        </div>
      )}
      <ExpandMoreIcon onClick={() => setOpen(!open)} className="btn" />
    </div>
  );
};

export default Navbar;
