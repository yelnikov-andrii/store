/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from '../Select/Select';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {GET_CURRENCIES } from '../../query/api';
import Brand_icon from '../images/Brand_icon.svg';
import Empty_Cart from '../images/Empty_Cart.svg';
import { NavLink } from 'react-router-dom';

export const Header = ({onCurrency, onSelectedCategory, categories, quantityOfProducts}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currencies, setCurrencies] = useState([]);
  const {data: currenciesData, loading: currenciesLoading} = useQuery(GET_CURRENCIES);
  const [currency, setCurrency] = useState('');

  onSelectedCategory(selectedCategory);
  onCurrency(currency);

  useEffect(() => {
    if (!currenciesLoading) {
      setCurrencies(currenciesData.currencies)
    }
  }, [currenciesData, quantityOfProducts]);

  const getCurrency = (name) => {
    setCurrency(name);
  }

  return (
    <header
    className='header'
  >
    <div className='container'>
    <nav
      className='header__nav'
    >
      <ul
        className='header__list'
      >
        {categories.map((category) => (
            <NavLink
              key={category.name}
              onClick={() => {
              setSelectedCategory(category.name);
            }}
            to={category.name}
            className={selectedCategory === category.name ? 'header__list-item header__list-item--active' : 'header__list-item'}
            >
              {category.name}
            </NavLink>

        ))}
      </ul>
      <NavLink to='/' onClick={() => {
        setSelectedCategory('all');
      }}>
        <img 
          src={Brand_icon} 
          alt='brand icon' 
          className='header__logo'
        />
      </NavLink>
      <ul className='header__list-shopping'>
        <li className='header__list-shopping_item'>
          <Select currencies={currencies} onSetCurrency={getCurrency} />
        </li>
        <li className='header__list-shopping_item'>
          <NavLink 
            className='header__btn'
            to='cart'
          >
            <img src={Empty_Cart} alt='empty cart'/>
            {quantityOfProducts !== 0 && (
              <span className='header__amount-of-products'>{quantityOfProducts}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  </header>
  )
}