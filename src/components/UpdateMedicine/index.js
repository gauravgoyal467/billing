import React, { useState, useEffect, useRef } from "react";
import { Modal, TextField, Button, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

const UpdateMedicine = () => {
  const { srlNo } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const medicinesList = JSON.parse(localStorage.getItem("medicineList")) || [];
    const fetchedMedicine = medicinesList.find(med => med.SrlNo === srlNo);
    setMedicine(fetchedMedicine);
  }, [srlNo]);

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdate = () => {
    const medicinesList = JSON.parse(localStorage.getItem("medicineList")) || [];
    
    if (!medicine.Name || !medicine.CompanyName || !medicine.MRP) {
      setAlertMessage("Please fill in all the fields before updating.");
      setAlertType("error");
      return;
    }

    const updatedList = medicinesList.map(med =>
      med.SrlNo === srlNo ? { ...med, ...medicine } : med
    );

    localStorage.setItem("medicineList", JSON.stringify(updatedList));
    setAlertMessage("Medicine updated successfully!");
    setAlertType("success");
    setTimeout(() => {
      setAlertMessage("");
      setOpen(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handleCancel = () => {
    setAlertMessage("");
    handleClose();
  };

  if (!medicine) return <div>Loading...</div>;

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content" ref={modalRef}>
        <div id="cross" onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className="modal-header">
          <h2>Update Medicine</h2>
        </div>

        {/* Modal Content with Text Fields for Updating Medicine */}
        <TextField
          label="Medicine Name"
          value={medicine.Name}
          onChange={(e) => setMedicine({ ...medicine, Name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Company"
          value={medicine.CompanyName}
          onChange={(e) => setMedicine({ ...medicine, CompanyName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Deal"
          value={medicine.Deal}
          onChange={(e) => setMedicine({ ...medicine, Deal: e.target.value })}
          fullWidth
        />
        <TextField
          label="MRP"
          value={medicine.MRP}
          onChange={(e) => setMedicine({ ...medicine, MRP: e.target.value })}
          fullWidth
        />
        <div className="modal-actions">
          <Button onClick={handleUpdate} className={"blue"}>Update</Button>
          <Button onClick={handleCancel} className={"red"}>Cancel</Button>
        </div>

        {alertMessage && (
          <Alert severity={alertType} sx={{ marginTop: 2 }}>
            {alertMessage}
          </Alert>
        )}
      </div>
    </Modal>
  );
};

export default UpdateMedicine;
