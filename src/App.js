/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {GET_CATEGORIES } from './query/api';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Product } from './components/Product/Product';
import { Cart } from './components/Cart/Cart';
import './App.scss';

function App() {
  const {data, loading} = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currency, setCurrency] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCategories(data.categories)
    }
  }, [data]);

  useEffect(() => {
    if (!loading && categories.length !== 0 && selectedCategory) {
      setCategories(data.categories)
      const category = categories.find(category => category.name === selectedCategory);

    setProducts(category.products);
    }
    
  },[selectedCategory, data]);

  const getCurrency = (name) => {
    setCurrency(name);
  };

  const getCategory = (name) => {
    setSelectedCategory(name)
  };

  const getQuantity = (value) => {
    setQuantity(value);
  };

  const increase = () => {
    setQuantity(prev => prev + 1);
  };

  const getSelectedProducts = (product) => {
    const exist = selectedProducts.find(item => item.id === product.id);
    product.translate = 0;
    setSelectedProducts([...selectedProducts.filter(el => el.qty !== 0)]);

    if(exist) {
      setSelectedProducts(
        selectedProducts.map((x) => 
          x.id === product.id ? {...exist, qty: exist.qty + 1} : x)
      );

    } else {
      product.qty = 1;
      setSelectedProducts(
        prev => [...prev, product]
        );
    }
  }

  if (loading || categories.length === 0) {
    return 'Loading...';
  }

  return (
        <BrowserRouter>
        <div>
        <Header 
          onCurrency={getCurrency} 
          onSelectedCategory={getCategory} 
          categories={categories}
          quantityOfProducts={quantity}
        />
          <Routes>
            <Route 
              path={`/${selectedCategory}`} 
              element={
              <Main 
                selectedCategory={selectedCategory} 
                products={products} 
                currency={currency}
              />}> 
            </Route>

            <Route 
              path='/' 
              element={<Navigate replace to='/all'/>}>
            </Route>

            <Route 
              path='cart' 
              element={
              <Cart 
                onSelect={setSelectedProducts} 
                onQuantity={getQuantity} 
                selectedProducts={selectedProducts} 
                currency={currency} 
              />}>
            </Route>
          </Routes>

          <Routes>
          {products.map((product) => (
              <Route 
                path={`${selectedCategory}/${product.id}`}
                key={product.id}
                element={
                <Product 
                  onSelect={getSelectedProducts} 
                  product={product} 
                  currency={currency}
                  onQuantity={increase}
                />}>
              </Route>
            ))}
          </Routes>
        
      </div>
        </BrowserRouter>
  );
}

export default App;
