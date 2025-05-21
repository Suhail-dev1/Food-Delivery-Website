import React from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { AddItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Card = ({ name, image, id, price, type }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(AddItem({ id, name, price, image, qty: 1 }));
    toast.success("Item added to cart");
  };

  return (
    <div className="w-[280px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-2 shadow-lg hover:border-2 border-green-300">
      <div className="w-full h-[60%] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="text-2xl font-semibold">{name}</div>
      <div className="w-full flex justify-between items-center">
        <div className="text-lg font-bold text-green-500">Rs {price}/-</div>
        <div className="flex justify-center items-center gap-2 text-green-500 font-bold">
          <IoMdRadioButtonOn className={type === "veg" ? "text-green-500" : "text-red-500"} />
          <span>{type}</span>
        </div>
      </div>
      <button
        className="w-full p-3 bg-green-200 rounded-lg text-gray-700 hover:bg-green-400 transition-all"
        onClick={handleAddItem}
      >
        Add to Dish
      </button>
    </div>
  );
};

export default Card;
