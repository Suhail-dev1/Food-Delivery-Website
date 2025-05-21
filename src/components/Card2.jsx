import React from "react";
import image1 from "../assets/image1.avif"; // fixed variable name
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeItem,decrementQty,incrementQty} from "../redux/cartSlice";

const Card2 = ({ name, id, price, image, qty }) => {
  let dispatch = useDispatch();
  return (
    <div className="w-full h-[120px] p-2 shadow-lg flex justify-between ">
      <div className="w-[60%] h-full flex gap-6">
        {/* Image Section */}
        <div className="w-[60%] h-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Pancake"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info Section */}
        <div className="w-[40%] h-full flex flex-col justify-between gap-3">
          <div className="text-lg text-gray-600 font-semibold">{name}</div>
          {/* Counter Section */}
          <div className="w-[110px] h-[50px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg font-semibold border-2 border-green-400 text-xl">
            <button
              className="w-[33.33%] h-full bg-white  hover:bg-gray-400 flex justify-center items-center hover:text-gray-500"
              onClick={() => {dispatch(decrementQty(id))}}
            >
              -
            </button>
            <span className="w-[33.33%] h-full bg-slate-300  hover:bg-gray-400 flex justify-center items-center">
              {qty}
            </span>
            <button
              className="w-[33.33%] h-full bg-white hover:bg-gray-400 flex justify-center items-center "
              onClick={() => dispatch(incrementQty(id))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start item-end gap-5">
        <span className="text-xl text-green-400 font-semibold">{price}</span>

        <RiDeleteBin6Line
          className="w-[30px] h-[30px] text-red-500 cursor-pointer"
          onClick={() => dispatch(removeItem(id))}
        />
      </div>
    </div>
  );
};

export default Card2;
