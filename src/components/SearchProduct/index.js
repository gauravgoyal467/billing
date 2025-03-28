import React, { useState } from 'react';
import './style.css';

const SearchProduct = ({ products, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product) => {
    onAddProduct(product);
    setSearchTerm('');  // Reset the search term after selection
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search here"
        className="search-input"
      />
      {searchTerm !== '' && filteredProducts.length > 0 && (
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li
              key={product.SrlNo}
              onClick={() => handleSelectProduct(product)}  // Use the updated function here
              className="product-item"
            >
              {product.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
