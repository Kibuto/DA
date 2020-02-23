import React, { Component } from "react";

export const CartContext = React.createContext();
export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      sum: 0,
      amount: 0
    };

    this.addToCart = this.addToCart.bind(this);
    this.countIncrease = this.countIncrease.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  countIncrease(product) {
    // const { cartItems, sum, amount } = this.state;
    this.setState({
        cartItems: this.state.cartItems.map(item => {
            if (item.id === product.id) {
                item.quantity = item.quantity + 1;
            }
            return item;
        }),
        sum: this.state.sum += parseFloat(product.price.split('.').join('')),
        amount: this.state.amount + 1
    });
  }
 
  removeFromCart(product){
    // const { cartItems, sum, amount } = this.state;
    if(product.quantity >= 2) {
      this.setState({
          cartItems: this.state.cartItems.map(item => {
              if (item.name.toLowerCase() === product.name.toLowerCase()) {
                  item.quantity = item.quantity - 1;
              }
              return item;
          }),
          sum: this.state.sum -= parseFloat(product.price.split('.').join('')),
          amount: this.state.amount - 1
      });
    } else {
      const filt = this.state.cartItems.filter( item =>  item.id !== product.id )
        this.setState({
          cartItems: filt,
          amount: this.state.amount - 1,
          sum: this.state.sum -= parseFloat(product.price.split('.').join(''))
        })
    }
  }

  addToCart(product) {
    //const { cartItems, amount, sum } = this.state;
    let find = this.state.cartItems.find(
        item => item.name.toLowerCase() === product.name.toLowerCase()
    );
    if(find === undefined) {
        const productWithQuantity = { ...product, quantity: 1 };
        this.setState({
            cartItems: [...this.state.cartItems, productWithQuantity],
            amount: this.state.amount + 1,
            sum: this.state.sum += parseFloat(product.price.split('.').join(''))
        });
    } else {
        this.countIncrease(product);
    }
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          countIncrease: this.countIncrease,
          removeFromCart: this.removeFromCart,
          amount: this.state.amount,
          sum: this.state.sum
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}