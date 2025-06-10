import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const Popup = ({ product, onClose, onSave }) => {
  const [quantity, setQuantity] = useState(1);
  const [mrp, setMrp] = useState(product.MRP || 0);
  const [deal, setDeal] = useState(product.Deal || 'NODEAL');
  const [less, setLess] = useState(23);
  const [disc, setDisc] = useState(0);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      quantity,
      less,
      MRP: mrp || product.MRP,
      Deal: deal,
      Disc:disc
    };
    onSave(updatedProduct);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        Modify billing details for <b>{`${product.Name}(${product.CompanyName})`}</b>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
        />
        <TextField
          label="MRP"
          variant="outlined"
          fullWidth
          type="number"
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Less%"
          variant="outlined"
          fullWidth
          type="number"
          value={less}
          onChange={(e) => setLess(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Deal"
          variant="outlined"
          fullWidth
          value={deal}
          onChange={(e) => setDeal(e.target.value)}
          margin="normal"
        />
         <TextField
          label="Disc%"
          variant="outlined"
          fullWidth
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
