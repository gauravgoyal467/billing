import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Alert } from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

const FileDownloadModal = () => {
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();
  const modalRef = useRef(null);

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

  const handleDownload = () => {
    const medicineList = JSON.parse(localStorage.getItem("medicineList"));
    if (!medicineList || medicineList.length === 0) {
      setAlertMessage("No data available to download.");
      setAlertType("error");
      return;
    }

    const csv = Papa.unparse(medicineList); 
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "medicineList.csv"); 
    setAlertMessage("CSV file downloaded successfully!");
    setAlertType("success");

    setTimeout(() => {
      setAlertMessage("");
      setOpen(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content" ref={modalRef}>
        <div id="cross" onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className="modal-header">
          <h2>Download CSV File</h2>
        </div>
        <div className="modal-actions">
          <Button onClick={handleDownload} className={"blue"}>Download</Button>
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

export default FileDownloadModal;
