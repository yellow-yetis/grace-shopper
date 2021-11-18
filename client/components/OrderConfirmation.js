import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearCart } from '../store/cart';

export class OrderConfirmation extends Component {
  componentDidMount(){
    if(this.props.isLoggedIn){
      this.props.clearCart();
    }
  }


  render() {
    return (
      <div>
        <h2 className="center">Thank you for shopping with us!</h2>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    clearCart: () => dispatch(clearCart())
  }
}

export default connect(mapState, mapDispatch)(OrderConfirmation);
