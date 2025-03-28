import './App.css';
import Header from './components/Common/Header';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import DashboardPage from './Pages/DashboardPage';
import Error from './Pages/Error';
import UpdateMedicine from './components/UpdateMedicine';
import DeleteMedicine from './components/DeleteMedicine';
import FileUploadModal from './components/FileUploadModal';
import FileDownloadModal from './components/FileDownloadModal';
import Billing from './components/Billing';


function App() {

  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/billing" element={<Billing/>}/>
          <Route path="/update-medicine/:srlNo" element={<UpdateMedicine />} />
          <Route path="/delete-medicine/:srlNo" element={<DeleteMedicine />} />
          <Route path="/uploadFile" element={<FileUploadModal/>} />
          <Route path="/DownloadFile" element={<FileDownloadModal/>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
    </div>
  );
}

export default App;
