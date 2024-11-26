const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Kết nối với cơ sở dữ liệu MySQL
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'nhan',
 database: 'employee_management'
});
db.connect(err => {
 if (err) throw err;
 console.log('Đã kết nối với cơ sở dữ liệu MySQL');
});
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.json(results);
    });
   });
   app.post('/employees', (req, res) => {
    const { name, age, department } = req.body;
    db.query('INSERT INTO employees (name, age, department) VALUES (?, ?, ?)', 
   [name, age, department], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, age, department });
    });
   });
   app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, department } = req.body;
    db.query('UPDATE employees SET name = ?, age = ?, department = ? WHERE id = ?', 
        [name, age, department, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Cập nhật thành công' });
    });
   });
   app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Xóa thành công' });
    });
   });
   const PORT = 5000;
app.listen(PORT, () => {
 console.log(`Server đang chạy trên cổng ${PORT}`);
});