import { useState, useEffect } from "react";
import Product from "../components/Product";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/products");
        setIsLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setIsLoading(false)
      }
    };

    getProduct();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}