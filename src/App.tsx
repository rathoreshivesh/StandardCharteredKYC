import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Progress from './components/ProgressBar';
import PersonalDetails from './pages/PersonalDetails';
import AadhaarUpload from './pages/AadhaarUpload';
import PanPage from './pages/PanUpload';
import SignaturePage from './pages/SignatureUpload';
import LoginPage from './pages/Login/Login';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Progress />
        <Routes>
          <Route path="/" element={<PersonalDetails />} />
          <Route path="/aadharcard" element={<AadhaarUpload />} />
          <Route path="/pancard" element={<PanPage />} />
          <Route path="/signature" element={<SignaturePage />} />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}