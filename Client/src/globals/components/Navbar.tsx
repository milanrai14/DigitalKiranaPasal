import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchCartItems } from "../../store/cartSlice";

function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { items } = useAppSelector((store) => store.cart);

  const localStorageToken = localStorage.getItem("tokenHoYo");
  const isLoggedIn = !!reduxToken || !!localStorageToken;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <div className="flex items-center text-2xl">
          HDokaan..
        </div>

        <div className="flex mt-4 sm:mt-0">
          <Link className="px-4" to="/products">
            Products
          </Link>
          <Link className="px-4" to="/my-orders">
            My Orders
          </Link>
        </div>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <>
              <span className="mr-[10px]">
                <Link to="/my-cart">
                  Cart <sup>{items?.length || 0}</sup>
                </Link>
              </span>

              <Link to="/logout">
                <button
                  type="button"
                  className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <button
                  type="button"
                  className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                >
                  Register
                </button>
              </Link>

              <Link to="/login">
                <button
                  type="button"
                  className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;