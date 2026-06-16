import { useState, type ChangeEvent, type FormEvent } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { PaymentMethod, type IData } from "./type";
import { orderItem } from "../../store/checkoutSlice";

function Checkout() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((store) => store.cart);
  const productsData = items.length > 0 ? items.map((item)=>{
    return{
      productId: item.productId,
      productQuantity: item.quantity
    
  }
  }): []
  console.log(items);

  const subTotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total + 0,
    0,
  );
  const totalQunatityInCart = items.reduce(
    (total, item) => item.quantity + total + 0,
    0,
  );
  const shippingAddress = 100;
  const total = items.length > 0 ? (subTotal + shippingAddress) * 1.13 : 0;
  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    addressLine: "",
    totalAmount: total,
    zipcode: "",
    paymentMethod: PaymentMethod.Cod,
    products: productsData,
    email: "",
    state: ""
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setData({
      ...data,
      products: productsData,
      totalAmount: total,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(orderItem(data));
  }
  

  const [paymentMethod, setPaymetMethod] = useState<PaymentMethod>(PaymentMethod.Cod)

  const handlePayment = (data: PaymentMethod)=>{
    setPaymetMethod(data)
    console.log(data);
  }
  // console.log(handleChange);
  
  return (
    <>
      <Navbar />
      <div>
        <h1 className="sr-only">Checkout</h1>
        <div className="flex flex-col h-full md:flex-row">
          {/* sidebar */}
          <section className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px] lg:min-w-[420px] dark:bg-neutral-800">
            <div className="relative h-full">
              <div className="px-6 py-8 md:overflow-auto md:h-screen">
                {/* Product List */}
                {items.length > 0 ? (
                  items.map((item) => {
                    return (
                      <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                          <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md dark:bg-neutral-700">
                            <img
                              src={`http://localhost:3000/${item.Product.productImageUrl}`}
                              className="w-full object-contain"
                              alt="black sweater"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm text-slate-900 font-semibold dark:text-slate-50">
                              {item.Product.productName}
                            </h3>
                            <ul className="text-sm text-slate-500 font-medium space-y-2 mt-2 dark:text-slate-400">
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{item.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto text-slate-900 font-semibold dark:text-slate-50">
                                  Rs {item.Product.productPrice} /-
                                </span>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    );
                  })
                ) : (
                  <p>No Items</p>
                )}
                <hr className="border-slate-300 my-6 dark:border-neutral-700" />
                <div>
                  <ul className="text-slate-500 font-medium space-y-4 dark:text-slate-400">
                    <li className="flex flex-wrap gap-4 text-sm">
                      Subtotal{" "}
                      <span className="ml-auto text-slate-900 font-semibold dark:text-slate-50">
                        {subTotal}
                      </span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      Shipping{" "}
                      <span className="ml-auto text-slate-900 font-semibold dark:text-slate-50">
                        Rs 100
                      </span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      Tax{" "}
                      <span className="ml-auto text-slate-900 font-semibold dark:text-slate-50">
                        13 %
                      </span>
                    </li>
                    <hr className="border-slate-300 dark:border-neutral-700" />
                    <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Total <span className="ml-auto">Rs {total}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* Delivery Details form */}
          <section className="w-full h-max rounded-md py-8 px-8 xl:px-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend className="text-xl text-slate-900 font-semibold mb-6 dark:text-slate-50">
                  Delivery Details
                </legend>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fname"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="firstName"
                      placeholder="John"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lname"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@readymadeui.com"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="phoneNumber"
                      placeholder="123-456-7890"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      Address Line
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="addressLine"
                      placeholder="123 Main Street"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      name="zipcode"
                      placeholder={"XXXX"}
                      required
                      className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>
              {/* Payment methods */}
              <fieldset className="mt-12">
                <legend className="text-xl text-slate-900 font-semibold mb-6 dark:text-slate-50">
                  Payment method
                </legend>
                <select name="" id="paymentMethod" onChange={(e)=>handlePayment(e.target.value as PaymentMethod)}>
                  <option value={PaymentMethod.Esewa}>Esewa</option>
                  <option value={PaymentMethod.Khalti}>Khalti</option>
                  <option value={PaymentMethod.Cod}>Cash on delivery</option>
                </select>
          
              </fieldset>
              {/* billing address checkbox */}
              <label className="inline-flex items-center group has-[input:checked]:text-slate-900 mt-6">
                <input
                  id="billing-address"
                  name="billing-address"
                  type="checkbox"
                  required
                  className="sr-only"
                  defaultChecked
                />
                {/* Custom box */}
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700
                          bg-white dark:bg-neutral-800
                          group-has-[input:checked]:bg-blue-600
                          group-has-[input:checked]:outline-blue-600
                          group-focus-within:outline-2
                          group-focus-within:outline-blue-600"
                  aria-hidden="true"
                >
                  {/* Checkmark */}
                  <svg
                    className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                    viewBox="0 0 12 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                </span>
                <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                  Billing address is the same as shipping address
                </span>
              </label>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      
                >
                  Rs {total} /-
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Checkout
