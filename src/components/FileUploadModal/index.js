import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Alert } from "@mui/material"; // Import Alert from MUI
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Papa from 'papaparse'; // Import the PapaParse library for parsing CSV files
import "./style.css";

const FileUploadModal = () => {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertType, setAlertType] = useState("success"); 
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

  const handleFileChange = (event) => {
    setAlertMessage("");
    setAlertType("success");
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setAlertMessage("Please select a file before uploading.");
      setAlertType("error");
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        localStorage.setItem("medicineList", JSON.stringify(result.data));
        setAlertMessage("File uploaded successfully!");
        setAlertType("success");

        setTimeout(() => {
          setAlertMessage("");
          setOpen(false);
          navigate("/dashboard");
        }, 2000);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleCancel = () => {
    setFile(null);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content" ref={modalRef}>
        <div id="cross" onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className="modal-header">
          <h2>Upload CSV File</h2>
        </div>
        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-input-button">
            Choose File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            id="file-upload"
            className="file-input"
          />
          {file && <p className="file-name">Selected file: {file.name}</p>}
        </div>

        <div className="modal-actions">
          <Button onClick={handleUpload} className={"blue"}>Upload</Button>
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

export default FileUploadModal;
