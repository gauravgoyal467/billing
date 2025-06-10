import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import "./style.css";

const ListLayout = ({ medicine }) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update-medicine/${medicine.SrlNo}`);
    };

    const handleDeleteClick = () => {
        navigate(`/delete-medicine/${medicine.SrlNo}`);
    };

    return (
        <tr className={"listContainer"}>
            {/* Srl NO*/}
            <div className="detail">
                <Tooltip title="Company" placement="bottom-start">
                    <td className="medicine-detail-list">
                        <span className="medicine-comp">{medicine.SrlNo}</span>
                    </td>
                </Tooltip>
            </div>

             {/* Display Detail */}
            <div className="detail">
                <td className="info-list">
                    <Link to={`/medicine/${medicine.SrlNo}`}>
                        <div className="name-list">
                            <span className="medicineName">{medicine.Name}</span>
                            <span className="packing">Packing: {medicine.Packing}</span>
                        </div>
                    </Link>
                </td>
            </div>

            {/* Display Company */}
            <div className="detail">

                <Tooltip title="Company" placement="bottom-start">
                    <td className="medicine-detail-list">
                        <span className="medicine-comp">{medicine.CompanyName}</span>
                    </td>
                </Tooltip>
            </div>

            {/* Display MRP */}
            <div className="detail">
                <Tooltip title="MRP" placement="bottom-start">
                    <td className="medicine-detail-list">
                        <span className="price-list">₹{medicine.MRP}</span>
                    </td>
                </Tooltip>
            </div>

            {/* Deal */}
            <div className="detail">
                <Tooltip title="Deal" placement="bottom-end">
                    <td className="medicine-detail-list">
                        {medicine.Deal ? <span>{medicine.Deal}</span> : <span> NODEAL</span>}
                    </td>
                </Tooltip>
            </div>

            {/* Update and Delete Icons */}
            <div className="detail">
                <td>
                    <Tooltip title="Update" placement="bottom">
                        <IconButton id="edit" onClick={handleUpdateClick}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete" placement="bottom">
                        <IconButton id="delete" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </td>
            </div>
        </tr>
    );
};

export default ListLayout;
