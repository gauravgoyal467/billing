import React, { useEffect, useState } from "react";
import TabsComponents from "../components/Dashboard/TabsComponents";
import Search from "../components/Search";
import PaginationComp from "../components/PaginationComp";
import Loader from "../components/Common/Loader";
import Footer from "../components/Common/Footer";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useNavigate } from "react-router-dom";
import FileDownloadModal from "../components/FileDownloadModal";

const DashboardPage = () => {
    const [medicineList, setMedicineList] = useState([]);
    const [paginatedMedicines, setPaginatedMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadModalOpen,setDownloadModalOpen] = useState(false);
    const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedMedicines(medicineList.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUploadClick = () => {
    navigate("/uploadFile");
  };

  const handleDownloadClick = () => {
    navigate("/DownloadFile");
  };

  let filteredMedicines = medicineList.filter((item) => {
    return (
      item.Name.toLowerCase().includes(search.toLowerCase()) ||
      item.CompanyName.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    setIsLoading(true);
    const medicineData = JSON.parse(localStorage.getItem("medicineList"));
    if (medicineData) {
      setMedicineList(medicineData);
      setPaginatedMedicines(medicineData.slice(0, 10));
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="select">
        <Search search={search} onSearchChange={onSearchChange} />
        <div className={"upload"} onClick={handleUploadClick} title="Upload File">
          <UploadFileIcon />
        </div>
        <div className={"upload"} onClick={handleDownloadClick} title="Download File">
          <SimCardDownloadIcon />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {downloadModalOpen && <FileDownloadModal/>}
          <TabsComponents
            medicineList={search ? filteredMedicines : paginatedMedicines}
          />
          {!search && (
            <PaginationComp page={page} handlePageChange={handlePageChange} />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
