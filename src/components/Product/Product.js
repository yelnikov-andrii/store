import React, {useState, useEffect} from 'react';

export const Product = ({product, currency, onSelect, onQuantity}) => {
  const images = product.gallery;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const[selectedProduct, setSelectedProduct] = useState({selAttr: []});

  const price = product.prices.find((item) => item.currency.symbol === currency);

  const getDescription = (value) => {
    document.getElementById('desc').innerHTML = value;
  }

  useEffect(() => {
    getDescription(product.description);
    setSelectedProduct(product);
  }, [product]);

  return (
    <div className='container'>
      <article className='product'>
      <div className='product__block-images'>
        <div className='product__block-images_aside'>
          {images.map((image) => (
            <img 
              src={image} 
              alt=''
              className='product__block-images_aside--small'
              key={image}
              onClick={() => {
                setSelectedImage(image);
              }}/>
          ))}
        </div>
          <div className='product__block-images_main'>
            <img 
              src={selectedImage}
              alt=''
              className='product__block-images_main--large'
            />
          </div>
        </div>
        <div className='product__block-description product-description'>
          <h1 className='product-description__brand'>
            {product.brand}
          </h1>
          <p className='product-description__name'>
            {product.name}
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
                      className={selectedProduct.selAttr !== undefined && selectedProduct.selAttr.find(atr => atr[attribute.id] === item.id) 
                        ? 'product-description__list-item--color product-description__list-item product-description__list-item--color-selected' 
                        : 'product-description__list-item--color product-description__list-item'}
                      key={item.id}
                      style={{backgroundColor: `${item.value}`}}
                      onClick={() => {
                        const newAttr = {};
                        const keyOfAttr = attribute.id;
                        const value = item.id;
                        newAttr[keyOfAttr] = value;
                        if (selectedProduct.selAttr !== undefined) {
                          if (selectedProduct.selAttr.find(atr => atr.hasOwnProperty(keyOfAttr))) {
                            setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr.filter(atr => !atr.hasOwnProperty(keyOfAttr)), newAttr]});
                          } else {
                            setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr, newAttr]});
                          }
                          
                        } else {
                          setSelectedProduct({...selectedProduct, selAttr: [newAttr]});
                        }
                        }}
                    >
                  </li>
                  )
                } else {
                  return (
                    <li 
                      className={selectedProduct.selAttr !== undefined && selectedProduct.selAttr.find(atr => atr[attribute.id] === item.id) 
                        ? 'product-description__list-item product-description__list-item--selected' 
                        : 'product-description__list-item'}
                      key={item.id}
                      onClick={() => {
                        const newAttr = {};
                        const keyOfAttr = attribute.id;
                        const value = item.id;
                        newAttr[keyOfAttr] = value;
                        if (selectedProduct.selAttr !== undefined) {
                          if (selectedProduct.selAttr.find(atr => atr.hasOwnProperty(keyOfAttr))) {
                            setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr.filter(atr => !atr.hasOwnProperty(keyOfAttr)), newAttr]});
                          } else {
                            setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr, newAttr]});
                          }
                          
                        } else {
                          setSelectedProduct({...selectedProduct, selAttr: [newAttr]});
                        }
                      }}
                    >
                      {item.displayValue}
                    </li>
                  )
                }
              })}
            </ul>
            </React.Fragment>
          ))}
          <p className='product-description__price-title'>
            Price:
          </p>
          <p className='product-description__price-value'>
            {`${price.currency.symbol} ${price.amount}`}
          </p>

          {product.inStock ? (
            <button className='product-description__button'
              onClick={() => {
                onSelect(selectedProduct);
                onQuantity();
            }}>
              Add to cart
            </button>
          ) : (
            <button className='product-description__button product-description__button--outOfStock'>
              Add to cart
            </button>
          )}
          <div 
            id='desc' 
            className='product-description__description'
          >
          </div>
        </div>
        </article>
      </div>

  )
};