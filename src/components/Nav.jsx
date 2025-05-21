import React, { useContext, useEffect } from "react";
import { IoFastFoodSharp, IoSearch } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { DataContext } from "../context/UserContext";
import { food_items } from "../food";
import { useSelector } from "react-redux";

const Nav = () => {
  const { input, setInput, setCate, showCart, setShowCart } =
    useContext(DataContext);

  useEffect(() => {
    if (input && input.trim() !== "") {
      const newList = food_items.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase())
      );
      setCate(newList);
    } else {
      setCate(food_items);
    }
  }, [input, setCate]);

  const handleSubmit = (e) => e.preventDefault();

  let items = useSelector((state) => state.cart);
 

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-5 md:px-8">
      <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl">
        <IoFastFoodSharp className="w-[30px] h-[30px] text-green-500" />
      </div>

      <form
        className="w-[45%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md md:w-[70%]"
        onSubmit={handleSubmit}
      >
        <IoSearch className="text-green-500 w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search items"
          className="w-full outline-none text-[16px] md:text-[20px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      <div
        className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer"
        onClick={() => setShowCart(true)}
      >
        <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">
          {items.length}
        </span>
        <MdAddShoppingCart className="w-[30px] h-[30px] text-green-500" />
      </div>
    </div>
  );
};

export default Nav;
