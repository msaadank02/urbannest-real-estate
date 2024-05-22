import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Explore = () => {
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    purpose: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const purposeFromUrl = urlParams.get("purpose");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || purposeFromUrl || sortFromUrl || orderFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        purpose: purposeFromUrl || "all",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const { data } = await axios.get(`/explore?${searchQuery}`);
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sell" ||
      e.target.id === "rent"
    ) {
      setSidebarData((prev) => ({ ...prev, purpose: e.target.id }));
    } else if (e.target.id === "searchTerm") {
      setSidebarData((prev) => ({ ...prev, searchTerm: e.target.value }));
    } else if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("purpose", sidebarData.purpose);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();

    navigate(`/explore?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const { data } = await axios.get(`/explore?${searchQuery}`);

    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex-col flex md:flex-row">
      <form action="" onSubmit={handleSubmit}>
        <div className="w-full flex items-center justify-center p-5 sticky top-16">
          <input
            type="text"
            id="searchTerm"
            className="rounded-s-lg px-4 py-2 bg-gray-600 text-white w-72 focus:outline-none focus:ring-1 focus:ring-orange"
            placeholder="Search"
            value={sidebarData.searchTerm}
            onChange={handleChange}
          />
          <button className="bg-orange p-3 rounded-r-lg">
            <FaSearch color="white" />
          </button>
        </div>
        <div className="md:w-[30%] lg:w-[25%] px-4 pl-8">
          <div className="md:min-h-screen flex md:flex-col gap-3 flex-wrap bg-darkgray">
            <div className="flex items-center gap-3">
              <FaFilter color="white" />
              <h2 className="text-white text-xl font-bold">Filters:</h2>
            </div>
            <div className="flex gap-x-3 gap-y-0 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  checked={sidebarData.purpose === "all"}
                  onChange={handleChange}
                  className="peer relative appearance-none w-5 h-5 border border-orange rounded-md cursor-pointer focus:outline-none checked:bg-orange hover:ring-1 hover:ring-orange after:contemt-[''] after:w-full after:h-full after:top-0 after:left-0"
                />
                <label
                  htmlFor="all"
                  className="text-white text-lg cursor-pointer"
                >
                  Sell & Rent
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sell"
                  name="sell"
                  checked={sidebarData.purpose === "sell"}
                  onChange={handleChange}
                  className="peer relative appearance-none w-5 h-5 border border-orange rounded-md cursor-pointer focus:outline-none checked:bg-orange hover:ring-1 hover:ring-orange after:contemt-[''] after:w-full after:h-full after:top-0 after:left-0"
                />
                <label
                  htmlFor="sell"
                  className="text-white text-lg cursor-pointer"
                >
                  Sell
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  checked={sidebarData.purpose === "rent"}
                  onChange={handleChange}
                  className="peer relative appearance-none w-5 h-5 border border-orange rounded-md cursor-pointer focus:outline-none checked:bg-orange hover:ring-1 hover:ring-orange after:contemt-[''] after:w-full after:h-full after:top-0 after:left-0"
                />
                <label
                  htmlFor="rent"
                  className="text-white text-lg cursor-pointer"
                >
                  Rent
                </label>
              </div>
            </div>
            <div>
              <select
                name="sort"
                id="sort_order"
                defaultValue={`created_at_desc`}
                onChange={handleChange}
                className="bg-gray-600 text-white rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange"
              >
                <option value="createdAt_desc">Latest</option>
                <option value="price_desc">Price high to low</option>
                <option value="price_asc">Price low to high</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="text-white bg-orange px-4 rounded-md font-bold">
              Apply filters
            </button>
          </div>
        </div>
      </form>
      <div className="w-full">
        <div
          className={`${
            loading ? "flex items-center justify-center" : "grid"
          } px-10 py-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-sm:flex flex-col w-full gap-2`}
        >
          {!loading && listings?.length === 0 && (
            <p className="text-white text-xl">No listings found</p>
          )}
          {loading && (
            <div className="flex items-center justify-center w-full gap-2 mt-4">
              <Loader width={"w-[30px]"} />
              <p className="text-white">Fetching Properties</p>
            </div>
          )}
          {!loading &&
            listings?.length > 0 &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-orange text-center w-full hover:underline"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
