import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import{ UserContext } from "../../context/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const singOutContexthandler = async () => {
    await signOutUser();
  }
  //console.log(currentUser)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-link" to="/">
          <CrwnLogo></CrwnLogo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={singOutContexthandler}>SIGNOUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
