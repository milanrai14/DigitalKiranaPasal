import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSingleProduct } from "../../store/productSlice";
import { Status } from "../../globals/types/type";

function SingleProduct() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { selectedProduct, status } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  if (status === Status.LOADING) {
    return <h1>Loading...</h1>;
  }

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/${selectedProduct.productImageUrl}`}
                  alt={selectedProduct.productName}
                />
              </div>

              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full">
                    Add to Cart
                  </button>
                </div>

                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 py-2 px-4 rounded-full">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>

            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.productName}
              </h2>

              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold">
                    Price:
                  </span>

                  <span className="ml-2">
                    Rs. {selectedProduct.productPrice}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold">
                  Product Description:
                </span>

                <p className="mt-2">
                  {selectedProduct.productDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;