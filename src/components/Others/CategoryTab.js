import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const CategoryTab = ({ title, href }) => {
  return (
    <Link to={href}>
      <div className="category_tab">
        <p>{title}</p>
        <IoIosArrowForward />
      </div>
    </Link>
  );
};

export default CategoryTab;
