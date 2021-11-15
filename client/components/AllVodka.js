import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchVodka } from '../store/vodka';
import { fetchProducts } from '../store/products';

export class Vodka extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const filteredVodkaArray = this.props.products.filter(product => {
      return product.category === 'Vodka';
    });
    console.log('this is my filtered array', filteredVodkaArray);
    return (
      <div>
        <h1>Vodka</h1>
        <div>
          <ul style={{ listStyle: 'none' }}>
            {filteredVodkaArray.map(vodka => {
              return (
                <li key={vodka.id}>
                  <div>
                    <h2>
                      <Link to={`/products/${vodka.id}`}>
                        {vodka.name} <img className="cartImage" src={vodka.imageUrl} />
                      </Link>{' '}
                      - {vodka.category} - $ {vodka.price}
                    </h2>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    products: state.products,
  };
};

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Vodka);