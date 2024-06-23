import styled from "styled-components";
import axios from 'axios';
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  console.log(cat, filters, sort)

  const [products, setproducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:8000/api/product?category${cat}` : `http://localhost:8000/api/product`);
        setproducts(res.data);
        console.log(res);
      } catch (error) {
        console.log("erreur");
      }
    }
    getProducts();
  }, [cat])

  useEffect(() => {
    cat && setFiltredProducts(products.filter((item) => 
      Object.entries(filters).every(([key, value]) => 
        item[key].includes(value)
      )
    ))
  }, [products, cat, filters])

  useEffect(() => {
    if(sort === "newest") {
      setFiltredProducts((prev) => [...prev].sort((a, b) => a.createAt - b.createAt))
    }
    else if(sort === "asc") {
      setFiltredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    }
    else {
      setFiltredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])
  return (
    <Container>
       {cat || filters ? (
        filtredProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))
      ) : (
        products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)
      )}
    </Container>
  );
};

export default Products;