import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../assets/Images/urbannestNavbar.png";
import logoIcon from "../assets/Images/urbannestIcon.png";
import { navLinks } from "../data/data";
import { ChevronDown, MenuIcon, Power } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import Sidenavbar from "./Sidenavbar";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { ProfileContext } from "../../context/profileContext";
import { useNavigate } from "react-router-dom";
import Toggle from "./Toggle";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = ({ handleLogout }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useContext(UserContext);

  const { setRequestSellerSession } = useContext(ProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [user]);

  const requestSelling = async () => {
    try {
      const { data } = await axios.patch("/become-a-seller");

      if (data.uncomplete) {
        toast.error(data.uncomplete);
        console.log(data);
        setRequestSellerSession(true);
        navigate("/profile");
        location.reload(true);
      } else {
        toast.success(data.success);
        location.reload(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error becoming a seller!");
    }
  };

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check if the current path is '/profile'
  if (location.pathname !== "/profile") {
    return (
      <nav className="navbar">
        <Link to="/" className="hover:scale-110 transition-all duration-300">
          <img
            src={logo}
            alt="urban-nest-logo"
            className="w-40 max-sm:hidden block"
          />
          <img
            src={logoIcon}
            alt="urban-nest-logo"
            className=" w-9 max-sm:block hidden"
          />
        </Link>
        <ul className="lg:flex hidden items-center text-white">
          {navLinks.map(({ text, url }, index) => (
            <li key={index}>
              <NavLink
                to={url}
                className={({ isActive }) =>
                  `${isActive ? "text-orange" : "text-white"} nav-links`
                }
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul
          className={`${showProfile ? "hidden" : "lg:flex"} text-white  hidden`}
        >
          <li className="font-bold px-5 py-2 rounded cursor-pointer">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "text-orange" : "text-white"} nav-links`
              }
            >
              Log In
            </NavLink>
          </li>
          <li className="register-btn">
            <NavLink
              to="/register"
              className={({ isActive }) => `${isActive} : 'text-white' : '' `}
            >
              Register
            </NavLink>
          </li>
        </ul>
        <ul
          className={`${
            showProfile ? "lg:flex hidden" : "hidden"
          } items-center text-white gap-4`}
        >
          <button
            onClick={requestSelling}
            className={`${
              user && user?.roles?.name === "buyer" && !user?.seller
                ? "block"
                : "hidden"
            } bg-orange rounded-lg px-3 py-2 font-bold`}
          >
            Become a seller
          </button>
          <div
            className={`${
              user && user.seller ? "flex gap-2 items-center" : "hidden"
            }`}
          >
            <p className="text-sm">
              <span>Switch to</span>
              <br className="w-0 h-0 p-0 m0" />
              {`${user?.roles?.name == "seller" ? "Buying" : "Selling"}`}
            </p>
            <Toggle />
          </div>
          <Link to={"/profile"}>
            <img
              src={user?.avatar}
              className=" w-10 h-10 object-cover rounded-full"
            />
          </Link>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              open
              sx={{
                padding: 0,
                margin: 0,
              }}
            >
              <ChevronDown className="text-white" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem className="flex gap-2">
                <img className="rounded-full w-8" src={user?.avatar} alt="" />
                {user?.username}
              </MenuItem>
              <Link
                to={"/admin-dashboard"}
                className={`${user?.roles?.name === "admin" ? "" : "hidden"}`}
              >
                <MenuItem onClick={handleClose}>Admin Pannel</MenuItem>
              </Link>
              <Link to={"/profile"}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </ul>
        <div className="lg:hidden text-white">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <MenuIcon width={30} height={30} />
          </div>
          <div className={`${showSidebar ? "block" : "hidden"}`}>
            <Sidenavbar
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
              handleLogout={handleLogout}
              requestSelling={requestSelling}
            />
          </div>
        </div>
      </nav>
    );
  }
};

export default Header;
