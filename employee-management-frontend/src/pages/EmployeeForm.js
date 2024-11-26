import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/employees/${id}`);
          setName(response.data.name);
          setAge(response.data.age);
          setDepartment(response.data.department);
        } catch (error) {
          setError('Lỗi khi tải thông tin nhân viên.');
          console.error('Lỗi khi tải thông tin nhân viên:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    } else {
      setLoading(false); // Nếu không có ID, không cần tải
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { name, age, department };
    try {
      if (id) {
        await axios.put(`http://localhost:5000/employees/${id}`, employee);
      } else {
        await axios.post('http://localhost:5000/employees', employee);
      }
      navigate('/'); // Sử dụng navigate thay cho history.push
    } catch (error) {
      console.error('Lỗi khi cập nhật/thêm nhân viên:', error);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên nhân viên"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Tuổi"
        required
      />
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="Phòng ban"
        required
      />
      <button type="submit">{id ? 'Cập Nhật' : 'Thêm'}</button>
    </form>
  );
}

export default EmployeeForm;
