import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

const DeleteMedicine = () => {
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

  const handleDelete = () => {
    const medicinesList = JSON.parse(localStorage.getItem("medicineList")) || [];
    const updatedList = medicinesList.filter(med => med.SrlNo !== srlNo);

    if (updatedList.length === medicinesList.length) {
      setAlertMessage("Medicine not found for deletion.");
      setAlertType("error");
    } else {
      localStorage.setItem("medicineList", JSON.stringify(updatedList));
      setAlertMessage("Medicine deleted successfully!");
      setAlertType("success");
      setTimeout(() => {
        setAlertMessage("");
        setOpen(false);
        navigate("/dashboard");
      }, 2000);
    }
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
          <h2>Delete Medicine</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete {medicine.Name} ?</p>
          <p>Company: {medicine.CompanyName}</p>
        </div>
        <div className="modal-actions">
          <Button onClick={handleDelete} className={"red"}>Yes</Button>
          <Button onClick={handleCancel} className={"green"}>No</Button>
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

export default DeleteMedicine;
