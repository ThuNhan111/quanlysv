import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

function NotFound() {
  return <h2>Trang không tìm thấy</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
        <Route path="*" element={<NotFound />} /> {/* Đường dẫn không hợp lệ sẽ dẫn đến trang này */}
      </Routes>
    </Router>
  );
}

export default App;
