import React, { useState, useEffect } from 'react';
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, onDelete }) => {
  const [productArr, setProductArr] = useState(products);
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setProductArr(products);
  }, [products]);

  const calculateTotalPayable = () => {
    return productArr.reduce((total, product) => total + (Number(product.finalAmount) || 0), 0)
  };

  const handleSaveInvoice = () => {
    localStorage.setItem('lastWorkingInvoice', JSON.stringify(productArr));
    window.alert('Invoice has been saved successfully in local!');
    navigate('/');
  };


  const handleClearInvoice = () => {
    localStorage.removeItem('lastWorkingInvoice');
    setProductArr([]);
  };

  const handleDelete = (index) => {
    const updatedList = productArr.filter((_, i) => i !== index);
    onDelete(updatedList);
  };

  const handleDownloadPDF = () => {
    if (shopName !== '' && shopAddress !== '') {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      doc.setFontSize(12);
      doc.setTextColor(38, 108, 153);
      // Shop Name - Left aligned
      doc.text(`${shopName}`, 14, 10);

      // Shop Address - Left aligned
      doc.setFontSize(12);
      doc.setTextColor(38, 108, 153);
      doc.text(`${shopAddress}`, 14, 16);

      // "Challan" - Centered
      doc.setFontSize(12);
      doc.setTextColor(209, 135, 56);
      const challanText = "Challan";
      const challanWidth = doc.getTextWidth(challanText);
      const centerX = (pageWidth - challanWidth) / 2;
      doc.text(challanText, centerX, 16);

      // Date - Right aligned
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const dateText = `Date: ${new Date().toLocaleString()}`;
      const dateWidth = doc.getTextWidth(dateText);
      const rightX = pageWidth - dateWidth - 16;
      doc.text(dateText, rightX, 16);

      // Adding table headers
      const headers = [
        'S.No', 'Qty+Free', 'Product', 'M.R.P.', 'Pack', 'Company',
        'Rate', 'Disc%', 'I.C.', 'Net Rate', 'Net Amt.'
      ];

      // Add headers to PDF
      autoTable(doc,{
        head: [headers],
        body: productArr.map((product, index) => [
          index + 1,
          `${product.quantity} ${product.Deal && product.Deal !== 'No Deal' && product.Deal !== '' ? `(${product.Deal})` : ''}`,
          product.Name,
          product.MRP,
          product.Packing,
          product.CompanyName,
          product.Rate || '',
          product.Disc || '',
          product.Tax || '',
          product.netRate || '',
          product.finalAmount || ''
        ]),
        startY: 22,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 2,
          valign: 'middle',
          halign: 'start'
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold',
          textColor: [64, 64, 64],
          fillColor: [255, 255, 255],
          halign: 'center',
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1
      });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const totalPayableText = `Total Payable: ${calculateTotalPayable().toFixed(2)}`;
      const margin = 18;
      const totalPayableX = pageWidth - margin - doc.getTextWidth(totalPayableText);
      doc.text(totalPayableText, totalPayableX, doc.lastAutoTable.finalY + 10);

      // Save the generated PDF
      const formattedDate = new Date().toLocaleDateString().replace(/\//g, '-');
      const fileName = `${shopName}_${formattedDate}.pdf`;
      doc.save(fileName);
    } else {
      window.alert("Shop name and address is mandatory");
    }
  };

  return (
    <div className="finalproduct-list">
      <div className="shop-info">
        <div className="shop-info-left">
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Enter name here"

          />
          <input
            type="text"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            placeholder="Enter Address here"
          />
        </div>
        <div className="shop-info-right">
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
      <div className='table-container'>
        <table className="product-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Qty(Free)</th>
              <th>Product</th>
              <th>M.R.P.</th>
              <th>Pack</th>
              <th>Company</th>
              <th>Rate</th>
              <th>Disc%</th>
              <th>I.C.</th>
              <th>Net Rate</th>
              <th>Net Amt.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productArr.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {product.quantity}
                  {product.Deal && product.Deal !== 'No Deal' && product.Deal !== '' ? ` (${product.Deal})` : ''}
                </td>
                <td>{product.Name}</td>
                <td>{product.MRP}</td>
                <td>{product.Packing}</td>
                <td>{product.CompanyName}</td>
                <td>{product.Rate || ''}</td>
                <td>{product.Disc || ''}</td>
                <td>{product.Tax || ''}</td>
                <td>{product.netRate || ''}</td>
                <td>{product.finalAmount || ''}</td>
                <td>
                  <div className="delete-btn" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-payable">
        <span>Total Amount : </span>
        <span>{calculateTotalPayable().toFixed(2)}</span>
      </div>
      <div className="round-off">
        <span>Round Off : </span>
        <span>{Math.round(calculateTotalPayable()).toFixed(2)}</span>
      </div>
      <div className="bill-actions">
        <button onClick={handleClearInvoice}>Clear Invoice</button>
        <button onClick={handleSaveInvoice}>Save Invoice</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>
    </div>

  );
};

export default ProductList;

