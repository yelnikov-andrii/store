/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const Select = ({currencies, onSetCurrency}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('$');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onSetCurrency(selectedCurrency);
  }, [selectedCurrency])

  return (
    <ul className='select'>
      <div 
        className={open ? 'select__button select__button--open' : 'select__button'}
        onClick={() => {
          setOpen(!open)
        }}
        >
            {selectedCurrency}
          </div>
          <div className={open ? 'select__content select__content--open' : 'select__content'}>
            {currencies.map((currency) => (
              <div 
                className="select__content-item"
                key={currency.symbol}
                onClick={() => {
                  setSelectedCurrency(currency.symbol)
                  setOpen(false)
                }}>
                <span className="select__content-item_symbol">
                  {currency.symbol}
                </span>
                <span>
                  {currency.label}
                </span>
              </div>
            ))}
          </div>
    </ul>
  )
}