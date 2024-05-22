import { ChevronDown, Menu, Power, Shield } from "lucide-react";
import { UserContext } from "../../../context/userContext";
import { useContext, useState } from "react";
import { ProfileContext } from "../../../context/profileContext";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import Toggle from "../Toggle";

const ProfileHeader = ({ requestSelling, handleLogout, className }) => {
  const { user } = useContext(UserContext);
  const { show, setShow } = useContext(ProfileContext);

  const [dropDown, setDropDown] = useState(false);

  return (
    <div
      className={`${className} bg-darkgray sticky top-0 z-10 w-full flex justify-between items-center border-b-[1px] border-gray py-5 sm:px-10 px-4`}
    >
      <Menu className="text-white" onClick={() => setShow(!show)} />
      <Link
        to={"/"}
        className="flex gap-2 text-orange cursor-pointer max-[350px]:hidden"
      >
        <Link2 />
        <p className="max-md:hidden">Go to Urbannest.pk</p>
      </Link>
      <div className="flex items-center gap-2 relative">
        <div>
          <button
            onClick={requestSelling}
            className={`${
              user && user?.roles?.name === "buyer" && !user.seller
                ? "block"
                : "hidden"
            } text-white bg-orange rounded-lg px-3 py-2 font-bold`}
          >
            Become a seller
          </button>
          <div
            className={`${
              user && user.seller ? "flex items-center gap-2" : "hidden"
            } text-white max-sm:hidden`}
          >
            <p className="text-sm">{`Switch to ${
              user?.roles?.name == "seller" ? "Buying" : "Selling"
            }`}</p>
            <Toggle />
          </div>
        </div>
        <img
          src={user?.avatar}
          className="rounded-full w-8 h-8 object-cover"
          alt="profile"
        />
        <p className="text-white max-sm:hidden">{user?.username}</p>
        <p className="text-white max-sm:block hidden">
          {user?.username?.length > 8
            ? user?.username.slice(0, 8)
            : user?.username}
        </p>
        <ChevronDown
          className={`${
            dropDown ? "" : "rotate-180"
          } text-white w-5 cursor-pointer transition-all duration-150`}
          onClick={() => setDropDown(!dropDown)}
        />
        <div
          className={`${
            dropDown ? "absolute scale-100" : "absolute scale-0"
          } transition-all duration-150 flex flex-col items-start gap-2 bg-white px-5 py-2 right-0 top-10 rounded-lg cursor-pointer`}
        >
          <Link
            to={"/admin-dashboard"}
            className={`${
              user?.roles?.name === "admin" ? "flex" : "hidden"
            } items-center justify-center gap-2`}
          >
            <Shield className="w-4" />
            <p>Admin Pannel</p>
          </Link>
          <div
            className="flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <Power className="text-red w-4" />
            <p className="text-red">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
