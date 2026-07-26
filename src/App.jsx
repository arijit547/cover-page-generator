import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AssignmentPage from './pages/AssignmentPage';
import LabReportPage from './pages/LabReportPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/assignment" element={<AssignmentPage />} />
        <Route path="/create/lab-report" element={<LabReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
