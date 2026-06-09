import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/user/Register";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/user/Login";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  return (
    <Provider store={store}>{/*Hamile store={store} miss garim vane hamiley store bhitra vako kei ni use garna paudinam. So store = {store} is neccessary*/}
      {/* React Redux provider wraps the whole app so store is available everywhere */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />}/>
          <Route path="/products/:id" element={<SingleProduct />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;