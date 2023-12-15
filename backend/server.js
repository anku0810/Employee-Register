const express=require('express');
const mysql=require('mysql');
const cors= require('cors')

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employees"
})

app.get('/',(req,res)=>{
    const sql="SELECT * FROM empregist";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.post('/', (req, res, next) => {
    const sql = "INSERT INTO empregist (Emp_name, DOB, Age, Department, Designation, Salary, Address, Phone_No) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Emp_name,
        req.body.DOB,
        req.body.Age,
        req.body.Department,
        req.body.Designation,
        req.body.Salary,
        req.body.Address,
        req.body.Phone_No,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("created the database");
    });
});

  
app.delete('/:Emp_name', (req, res, next) => {
    const sql = "DELETE FROM empregist WHERE Emp_name= ?";
    const Emp_name =req.params.Emp_name;

    db.query(sql, [Emp_name], (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("deleted the databases");
    });
});


app.listen(3011, ()=>{
    console.log("Running the server");
})