import { NavLink } from "react-router-dom";

export const Main = ({selectedCategory, products, currency}) => {

  return (
    <main
    className='main'
  >
    <div
      className='container'
    >
      <h2 className='main__title'>
        {selectedCategory}
      </h2>
    <div
      className='main__block'
    >
      {products.length !== 0 && (products.map((product) => (
        <NavLink 
          className={product.inStock ? 'main__block-item product-card' : 'main__block-item product-card  product-card--outstock'}
          to={product.id}
          key={product.id}
        >
          <img src={product.gallery[0]} alt='' className='product-card__image'/>
          <p className='product-card__name'>
          {product.name}
          </p>
          <p className='product-card__price'>
            {currency}
            {product.prices.find(price => price.currency.symbol === currency).amount}
          </p>
        </NavLink>
      )))}
    </div>
    </div>
  </main>
  )
}