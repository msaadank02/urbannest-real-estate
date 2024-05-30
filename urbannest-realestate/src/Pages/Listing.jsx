import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { Bath, Bed, Phone, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { IoIosCall, IoMdCall, IoMdMail } from "react-icons/io";

const Listing = () => {
  const { setLoading, setSelectedChat, chats, setChats } =
    useContext(UserContext);

  const [listing, setListing] = useState(null);
  const [listingUser, setListingUser] = useState(null);
  const navigate = useNavigate();

  const param = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      const { data } = await axios.get(`/get-listing-by-id/${param.id}`);
      if (data.error) {
        toast.error("Error fetching the listing!");
        return;
      }
      setListing(data);
    };
    fetchListing();
  }, []);

  useEffect(() => {
    const fetchListingUser = async () => {
      const { data } = await axios.get(`/user/${listing.userRef}`);
      if (data.error) {
        toast.error("Error fetching the user!");
        return;
      }
      setListingUser(data);
    };
    fetchListingUser();
  }, [listing]);

  const chatSeller = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/access-chat`, {
        userId: listing.userRef,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoading(false);
      navigate("/profile/notifications");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(listing);

  return (
    <div className="py-10 xl:px-32 px-16">
      <h2 className="text-white font-bold text-xl">{listing?.title}</h2>
      <div className="flex gap-3 flex-col lg:flex-row">
        <div className="max-w-[1200px] w-full h-[500px] my-4 mx-auto rounded-lg overflow-hidden">
          <ImageSlider imageUrls={listing?.images} />
        </div>
        <div className="lg:w-72 bg-gray px-5 py-8 rounded-lg flex items-center lg:flex-col sm:flex-row flex-col gap-5 w-full">
          <div>
            <h2 className="text-white text-2xl">
              PKR <span className="font-bold text-3xl">{listing?.price}</span>
            </h2>
            <button
              className="text-white font-bold bg-orange px-4 py-2 rounded-lg"
              onClick={chatSeller}
            >
              Contact Seller
            </button>
          </div>
          <div>
            <p className="flex items-center gap-3 text-white">
              <IoMdCall /> {listingUser?.phone}
            </p>
            <p className="flex items-center gap-3 text-white">
              <IoMdMail /> {listingUser?.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 my-5">
        <div className="flex items-center gap-2">
          <Bed color="white" />
          <span className="text-white">{listing?.bedrooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath color="white" />
          <span className="text-white">{listing?.bathrooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <Ruler color="white" />
          <span className="text-white">
            {listing?.areaSize} {listing?.areaUnit}
          </span>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-white font-bold text-xl">Overview</h2>
        <div className="px-4 py-2 grid gap-2">
          <h3 className="text-white text-lg font-semibold">Details</h3>
          <div className="grid grid-cols-2 text-white bg-gray rounded-lg overflow-hidden max-w-xl">
            <h4 className="px-2 py-1 font-medium">Type</h4>
            <p className="px-2 py-1 bg-black">
              {listing?.type?.home ||
                listing?.type?.plots ||
                listing?.type?.commercial}
            </p>
            <h4 className="px-2 py-1 font-medium bg-black">Price</h4>
            <p className="px-2 py-1">{listing?.price} pkr</p>
            <h4 className="px-2 py-1 font-medium">Address</h4>
            <p className="px-2 py-1 bg-black">{listing?.address}</p>
            <h4 className="px-2 py-1 font-medium bg-[#030303]">Bedrooms</h4>
            <p className="px-2 py-1">{listing?.bedrooms}</p>

            <h4 className="px-2 py-1 font-medium">Area</h4>
            <p className="px-2 py-1 bg-black">
              {listing?.areaSize} {listing?.areaUnit}
            </p>
            <h4 className="px-2 py-1 font-medium bg-black">Purpose</h4>
            <p className="px-2 py-1">{listing?.purpose}</p>
            <h4 className="px-2 py-1 font-medium">Bath</h4>
            <p className="px-2 py-1 bg-black">{listing?.bathrooms}</p>
          </div>
        </div>
        <div className="text-white pt-5">
          <h2 className="font-bold text-xl">Description</h2>
          <p className="px-4">{listing?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
