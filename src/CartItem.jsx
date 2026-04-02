import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);  // Retrieve cart state from Redux store
  const dispatch = useDispatch();  // Alias for 'useDispatch' hook
  let numberOfItems = cart.length;

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => (
        total += parseFloat(item.cost.substring(1)) * item.quantity
    ));
    return total;
  };

  // Return to plant listing page
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Send cart to the checkout section (Function not yet implemented)
  const handleCheckoutShopping = (e) => {
    alert('Function for checkout will be added for future reference.');
  }

  // Increment quantity of item already in cart
  const handleIncrement = (item) => {
    const quantityIncremented = item.quantity + 1;
    numberOfItems += 1;
    dispatch(updateQuantity({name: item.name, quantity: quantityIncremented}));
  };

  // Decrement quantity of item already in cart
  const handleDecrement = (item) => {
    const quantity = item.quantity;
    numberOfItems -= 1;
    if (quantity >= 2) {
      dispatch(updateQuantity({name: item.name, quantity: quantity - 1}));
    } else {
      dispatch(removeItem(item.name));  
    }
  };

  // Remove item and its quantity entire from cart
  const handleRemove = (item) => {
    numberOfItems -= item.quantity;
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemTotalCost = parseFloat(item.cost.substring(1)) * item.quantity;
    return itemTotalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
          <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


