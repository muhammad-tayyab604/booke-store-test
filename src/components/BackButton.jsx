import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <IoArrowBackCircleOutline />
      </Link>
    </div>
  );
};

export default BackButton;
