import React, { useEffect, useState } from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import styles from "./Product.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import {  FaCogs, FaSpinner } from "react-icons/fa";
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);


const toggleFilter= () => {

setShowFilter (!showFilter);

};

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className= {showFilter? `${styles.filter} ${styles.show} ` : `${styles.filter}`}>

        {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
        {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
<div className = {styles.icon} onClick ={toggleFilter}>
<FaCogs size = {20} color = "orangered" />
<p>
<b>
  {showFilter ? "HideFilter" : "ShowFilter"}
</b>

</p>

</div>

        </div>
      </div>
    </section>
  );
};

export default Product;