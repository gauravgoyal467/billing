import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ListLayout from "../ListLayout";
import "./style.css";

const TabsComponents = ({ medicineList }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        {medicineList && medicineList.length > 0 ? (
          <table className="list_flex">
            {medicineList.map((medicine) => (
              <ListLayout medicine={medicine} key={medicine.SrlNo} />
            ))}
          </table>
        ) : (
          <p>No medicines available.</p>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TabsComponents;
