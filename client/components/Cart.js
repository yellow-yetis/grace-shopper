import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCartProducts, updateCart, removeProductFromCart } from '../store/cart';
import { fetchCartTotals } from '../store/cartTotals';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      productArr: [],
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  showModal(event) {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    this.props.fetchCartProducts(this.props.userId);
    this.props.fetchCartTotals(this.props.userId);
  }

  handleChange(e, product) {
    let itemUpdatedInCart = {
      ...product,
      cartLiquor: {
        liquorQuantity: e.target.value,
        liquorTotalPrice: e.target.value * product.price,
      },
    };
    this.props.updateCart(this.props.userId, itemUpdatedInCart);
    this.props.fetchCartTotals(this.props.userId);
  }

  removeItem(userId, productId) {
    this.props.removeProductFromCart(userId, productId);
    this.props.fetchCartProducts(userId);
    this.props.fetchCartTotals(userId);
  }

  sumFinder(itemToSum) {
    return this.props.productsInCart.reduce(function (prev, curr) {
      return prev + curr.cartLiquor[itemToSum];
    }, 0);
  }

  render() {
    return (
      <div>
        <h1 className="center">Shopping Cart</h1>
        <ul style={{ listStyle: 'none' }}>
          {this.props.productsInCart.map(product => {
            return (
              <li key={product.id}>
                <h4>{product.name}</h4>
                <img className="cartImage" src={product.imageUrl} />
                <div>
                  Total Price: {'$'}
                  {product.cartLiquor.liquorTotalPrice}
                </div>
                <div>
                  Total Quantity:{' '}
                  <input
                    type="number"
                    min="1"
                    defaultValue={product.cartLiquor.liquorQuantity}
                    onChange={e => this.handleChange(e, product)}
                  />
                </div>
                <button onClick={() => this.removeItem(this.props.userId, product.id)}>
                  Remove From Cart
                </button>
                <h4 style={{ color: 'red' }}>{product.error}</h4>
              </li>
            );
          })}
        </ul>
        <div className="right">
          Total Items{' '}
          {this.props.totals.totalQuantity ? this.sumFinder('liquorQuantity') : <div>0 Items</div>}{' '}
          Total Cost {'$'}
          {this.props.totals.totalPrice ? this.sumFinder('liquorTotalPrice') : <div>'$0'</div>}
        </div>
        <Checkout />
      </div>
    );
  }
}

const mapState = state => {
  return {
    productsInCart: state.cartProducts,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    totals: state.cartTotals,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCartProducts: id => dispatch(fetchCartProducts(id)),
    fetchCartTotals: id => dispatch(fetchCartTotals(id)),
    updateCart: (userId, product) => dispatch(updateCart(userId, product)),
    removeProductFromCart: (userId, productId) =>
      dispatch(removeProductFromCart(userId, productId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
