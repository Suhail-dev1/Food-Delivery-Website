import Nav from "../components/Nav";
import Categories from "../Category";
import Card from "../components/Card";
import { food_items } from "../food";
import { useContext } from "react";
import { DataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import Card2 from "../components/Card2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  let { cate, setCate, showCart, setShowCart } = useContext(DataContext);

  function filter(Category) {
    if (Category === "All") {
      setCate(food_items);
    } else {
      const newList = food_items.filter(
        (item) => item.food_category === Category
      );
      setCate(newList);
    }
  }

  const items = useSelector((state) => state.cart);

  let subtotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let deliveryFee = 20;
  let taxes = (subtotal * 0.5) / 100;
  let total = Math.floor(subtotal + deliveryFee + taxes);

  return (
    <div className="bg-gray-900 w-full min-h-screen">
      <Nav />

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-6 w-full">
        {Categories.map((item, index) => (
          <div key={index}>
            <div
              className="w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[16px] font-semibold text-gray-600 rounded-md shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200"
              onClick={() => filter(item.name)}
            >
              {item.icon}
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Food Cards */}
      <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8">
        {cate.length > 0 ? (
          cate.map((items) => (
            <Card
              key={items.id}
              name={items.food_name}
              image={items.food_image}
              price={items.price}
              id={items.id}
              type={items.food_type}
            />
          ))
        ) : (
          <p className="text-white text-lg mt-4">No food items available.</p>
        )}
      </div>

      {/* Cart Sidebar */}
      <div
        className={`w-full md:w-[40vw] h-full fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="w-full flex justify-between items-center">
          <span className="text-green-400 text-[18px] font-semibold">
            Order items
          </span>
          <RxCross2
            className="w-[30px] h-[20px] text-green-400 font-semibold cursor-pointer hover:text-gray-400"
            onClick={() => setShowCart(false)}
          />
        </header>

        {/* Cart Items */}
        {items.length > 0 ? (
          <>
            <div className="w-full mt-9 flex flex-col gap-8">
              {items.map((item) => (
                <Card2
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  qty={item.qty}
                />
              ))}
            </div>

            {/* Pricing Details */}
            <div className="w-full border-t-2 border-b-2 border-gray-400 mt-3 flex flex-col gap-4 p-8">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Taxes
                </span>
                <span className="text-gray-400 font-semibold">Rs {taxes}</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Delivery Fee
                </span>
                <span className="text-gray-400 font-semibold">
                  Rs {deliveryFee}
                </span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Subtotal
                </span>
                <span className="text-gray-400 font-semibold">
                  Rs {subtotal}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="w-full flex justify-between items-center p-3">
              <span className="text-xl text-gray-600 font-semibold">Total</span>
              <span className="text-gray-400 font-semibold">Rs {total}</span>
            </div>

            {/* Place Order Button */}
            <button
              className="w-[80%] p-3 bg-green-200 rounded-lg text-gray-700 hover:bg-green-400 transition-all"
              disabled={items.length === 0}
              onClick={() => toast.success("Order placed")}
            >
              Place Order
            </button>
          </>
        ) : (
          <div className="mt-10 text-gray-600 font-semibold text-lg">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
