/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

export const Cart = ({selectedProducts, currency, onQuantity, onSelect}) => {

  const quantity = selectedProducts.reduce((a, b) => a + b.qty, 0);
  const total = selectedProducts.reduce((a, b) => a + (b.prices.find(x => x.currency.symbol === currency).amount * b.qty), 0);

  useEffect(() => {
    onQuantity(quantity);
  }, [quantity, selectedProducts]);


  return (
    <section className='cart'>
      <div className='container'>
        <h2 className='cart__title'>Cart</h2>
        {selectedProducts.length === 0 || quantity === 0 ? (
          <div className='product-description__brand'> 
            No products selected
          </div>

        ) : (
          <div className='cart__block'>
        {selectedProducts.map((product) => (
          <React.Fragment key={product.id}>
          {product.qty !== 0 && (
              <div className='cart__block-item'>
                <div className='cart__block-description product-description'>
                <h1 className='product-description__brand'>
                  {product.brand}
                </h1>
                <p className='product-description__name'>
                  {product.name}
                </p>
                <p className='product-description__price-title'>
                  Price:
                </p>
                <p className='product-description__price-value'>
                  {`${currency}` + product.prices.find(x => x.currency.symbol === currency).amount}
                </p>
                {product.attributes.map((attribute) => (
                  <React.Fragment key={attribute.id}>
                  <span className='product-description-list-title'>
                    {attribute.id}:
                  </span>
                  <ul className='product-description__list'>
                    {attribute.items.map((item) => {
                      if (attribute.id === 'Color') {
                        return (
                          <li
                            className={product.selAttr !== undefined && product.selAttr.find(atr => atr[attribute.id] === item.id) ? 
                              'product-description__list-item--color product-description__list-item product-description__list-item--color-selected' 
                              : 'product-description__list-item--color product-description__list-item'}
                            style={{backgroundColor: `${item.value}`}}
                            key={item.id}
                            >
                          </li>
                        )
                      } else {
                        return (
                          <li 
                          className={product.selAttr !== undefined && product.selAttr.find(atr => atr[attribute.id] === item.id) 
                            ? 'product-description__list-item product-description__list-item--selected' 
                            : 'product-description__list-item'}
                            key={item.id}
                            >
                              {item.displayValue}
                          </li>
                        )
                      }
                    })}
                  </ul>
                  </React.Fragment>
                ))}
                </div>
                <div className='cart__block-quantity'>
                  <div className='cart__block-quantity_selectors'>
                    <button 
                      className='cart__block-quantity_selectors-btn'
                      onClick={() => {
                        const element = selectedProducts.find(x => x.id === product.id);
                          onSelect(
                            selectedProducts.map((x) => 
                              x.id === product.id ? {...element, qty: product.qty + 1} : x)
                          );
                      }}
                    >
                      +
                    </button>
                    <span className='cart__block-quantity_selectors-value'>
                      {product.qty}
                    </span>
                    <button 
                      className='cart__block-quantity_selectors-btn'
                      onClick={() => {
                        const element = selectedProducts.find(x => x.id === product.id);
                        onSelect(
                          selectedProducts.map((x) => 
                            x.id === product.id ? {...element, qty: product.qty - 1} : x)
                        )
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className='cart__block-slider-wrapper'>
                  <button 
                    className='cart__block-slider-btn cart__block-slider-btn--left'
                      onClick={() => {
                        if (product.translate === 0) {
                          return
                        } else {
                          const prod = selectedProducts.find((x) => x.id === product.id);
                          onSelect(
                            [...selectedProducts].map((x) => 
                              x.id === product.id ? {...prod, translate: prod.translate + 210} : x)
                          );
                        }
                      }}
                  >
                    &#10094;
                  </button>
                  <button 
                    className='cart__block-slider-btn'
                    onClick={() => {
                      if (product.translate <= 210 * -1 * (product.gallery.length - 1)) {
                        return
                      } else {
                        const prod = selectedProducts.find((x) => x.id === product.id);
                        onSelect(
                          [...selectedProducts].map((x) => 
                            x.id === product.id ? {...prod, translate: prod.translate - 210} : x)
                        );
                      }
                    }}
                  >
                    &#10095;
                  </button>
                  <div 
                    className='cart__block-quantity_images'
                    style={{transform: `translateX(${product.translate}px)`}}
                  >
                    {product.gallery.map((image) => (
                      <img 
                      src={image} 
                      alt='' 
                      className='cart__block-quantity_images-img'
                      key={image.id}
                      />
                    ))}
                  </div>
                  </div>
                </div>
              </div>
          )}
          </React.Fragment>
        ))}
        <div className='cart__block-bottom'>
          <ul className='cart__block-bottom-list'>
            <li className='cart__block-bottom-list_item'>
              Tax 21%: 
              <span className='cart__block-bottom-list_item-value'>
                {`${currency}`+ (total * 0.21).toFixed(2)}
              </span>
            </li>

            <li className='cart__block-bottom-list_item'>
              Quantity: 
              <span className='cart__block-bottom-list_item-value'>
                {quantity}
              </span>
            </li>

            <li className='cart__block-bottom-list_item'>
              Total: 
                <span className='cart__block-bottom-list_item-value'>
                  {`${currency}`+ total.toFixed(2)}
                </span>
            </li>
          </ul>
          <button className='cart__block-bottom-button'>
            Order
          </button>
        </div>
        </div>
        )}
      </div>
    </section>
  )
};