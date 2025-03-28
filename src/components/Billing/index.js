import React, { useState, useEffect } from 'react';
import SearchProduct from '../SearchProduct';
import ProductList from '../ProductList';
import Popup from '../Popup';
import convertData from '../../function/convertData';
import './style.css'

const Billing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('medicineList')) || [];
    setProducts(savedProducts);

    const savedBill = JSON.parse(localStorage.getItem('lastWorkingInvoice')) || [];
    setProductList(savedBill);
  }, []);

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    const finalProduct = convertData(updatedProduct);
    setProductList((prevList) => [
      ...prevList,
      finalProduct,
    ]);
    setPopupOpen(false);
  };

  const handleDeleteProduct = (updatedProductList) => {
    setProductList(updatedProductList);
    localStorage.setItem('lastWorkingInvoice', JSON.stringify(updatedProductList));
  };

  return (
    <div className="billing-container">
      <SearchProduct products={products} onAddProduct={handleAddProduct} />
      {popupOpen && (
        <Popup
          product={selectedProduct}
          onClose={() => setPopupOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
      <ProductList products={productList} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default Billing;
