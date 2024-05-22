import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import bath from "../assets/bath.svg";
import bed from "../assets/bed.svg";

const ListingCard = ({ listing, className }) => {
  return (
    <div
      className={`${
        className || ""
      } bg-gray relative rounded-lg overflow-hidden w-full pb-3 border border-gray-600`}
    >
      <Link
        className="bg-gray z-50 text-light-gray"
        to={`/listing/${listing._id}`}
      >
        <div className="relative">
          <span
            className={`${
              listing.purpose === "rent" ? "bg-orange" : "bg-gray"
            } text-white text-sm font-semibold rounded-full absolute z-40 drop-shadow-lg bottom-3 left-3 px-3 flex items-center justify-center`}
          >
            {listing.purpose[0].toUpperCase() + listing.purpose.slice(1)}
          </span>
          <img
            src={listing.images[0]}
            alt="listing cover"
            className="h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
        </div>
        <div className="p-5 box-border flex flex-col gap-2">
          <div className="text-neutral-600 flex justify-between">
            <div className=" flex items-center gap-2">
              {listing.bedrooms}
              <img src={bed} alt="bed" width={20} height={20} />{" "}
              {listing.bathrooms}
              <img src={bath} alt="bath" width={20} height={20} />
            </div>
            <h6>{listing?.type?.home}</h6>
          </div>
          <h2 className="font-semibold text-xl truncate">{listing.title}</h2>
          <div>
            <span className="text-neutral-600">PKR</span> {listing.price}
          </div>
          <div className="flex gap-2 items-center">
            <FaLocationDot color="green" />{" "}
            <span className="truncate">{listing.address}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
