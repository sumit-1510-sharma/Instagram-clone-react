import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import "./Sidebar.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const excludedBoxRef = useRef(null);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMorePressed, setIsMorePressed] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (tab === "Home") {
      navigate("/home");
    } else if (tab === "Create") {
      onOpen();
    }

    if (tab === "Search") {
      setIsSearchBoxVisible(true);
    } else setIsSearchBoxVisible(false);
  };

  function handleClick() {
    setShowDropdown(!showDropdown);
    setIsMorePressed(!isMorePressed);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMoreClick = () => {
    setIsMorePressed(!isMorePressed);
  };

  // useEffect(() => {
  //   window.addEventListener("click", handleClick);
  //   return () => window.removeEventListener("click", handleClick);
  // }, []);

  return (
    <div className=" sticky top-0 h-[100vh] pb-10 flex">
      <div
        className={`${
          activeTab === "Search" ? "px-3" : "px-10"
        } flex flex-col justify-between h-full`}
      >
        <div className="pt-10">
          {!isSearchBoxVisible && (
            <img
              className="w-40"
              src="https://i.imgur.com/zqpwkLQ.png"
              alt=""
            />
          )}
          <div className="mt-10">
            {mainu.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-5 cursor-pointer text-lg"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                <p
                  className={` ${
                    activeTab === item.title ? "font-bold" : "font-semibold"
                  } ${isSearchBoxVisible ? "hidden" : "block"}`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            onClick={handleClick}
            className={
              isMorePressed
                ? "flex items-center cursor-pointer font-semibold"
                : "flex items-center cursor-pointer"
            }
          >
            <IoReorderThreeOutline className="text-2xl" />
            {!isSearchBoxVisible && (
              <p onClick={handleMoreClick} className="ml-5">
                More
              </p>
            )}
          </div>
          <div className="absolute bottom-8 bg-[#D397F8] left-14 w-[11vw] z-50">
            {showDropdown && (
              <div className="shadow-md relative">
                <p className=" w-full py-2 text-base px-4 border-t border-b cursor-default">
                  Switch Appearance
                </p>
                <p className=" w-full py-2 text-base px-4 border-t border-b cursor-pointer">
                  Saved
                </p>
                <p
                  onClick={handleLogout}
                  className=" w-full py-2 text-base px-4 border-t border-b cursor-pointer"
                >
                  Log out
                </p>
                <IoClose
                  onClick={handleClick}
                  className="absolute right-1.5 top-2 text-sm cursor-pointer"
                >
                  x
                </IoClose>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearchBoxVisible && (
        <div>
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
    </div>
  );
};

export default Sidebar;
