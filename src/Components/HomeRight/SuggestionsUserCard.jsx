import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuggestionsUserCard = ({ image, username, description }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store);

  
  const handleNavigate = () => {
    navigate(`/${username}`);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img className="w-9 h-9 rounded-full object-cover" src={image} alt="" />
        <div onClick={handleNavigate} className="ml-2 cursor-pointer">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-sm font-semibold opacity-70">{description}</p>
        </div>
      </div>
      <p onClick={handleNavigate} className="text-blue-700 text-sm font-semibold cursor-pointer">Follow</p>
    </div>
  );
};

export default SuggestionsUserCard;
