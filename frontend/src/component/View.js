import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./view.css"
import MainApi from '../api/MainApi';

const View = () => {
  const [filterSalary, setFilterSalary] = useState("llllll")
const[departName,setDepartName] = useState()
  const [departFilter,setDepartFilter] = useState()

  const handleDepartment =async(e)=>{
    const { name, value } = e.target
    console.log("ssDert", value)
    setDepartFilter(value)

    try {
    
      let res = await MainApi.get(`dpartmentFilter?department=${value}`)
      console.log("deppp",res)
      if(res.status==200){
        setData(res.data)
      }
    } catch (err) {
      console.log("slrErr", err)
    }
  }
 
  const handleSalary = async(e) => {
    const { name, value } = e.target
    console.log("ssalla", value)
    setFilterSalary(value)

    try {
    
      let res = await MainApi.get(`salaryFilter?salary=${value}`)
      console.log("salryyy",res)
      if(res.status==200){
        setData(res.data)
      }
    } catch (err) {
      console.log("slrErr", err)
    }
  }


  const navigate = useNavigate()
  const [data, setData] = useState([])
  const getData = async () => {

    try {

      let res = await MainApi.get("getEmploye")
      console.log("ress222", res)
      if (res.status == 200) {
        setDepartName(res.data)
        setData(res.data)
      }

    } catch (err) {
      console.log("errr", err)
    }
  }

  
  useEffect(() => {
    getData()
  }, [])
  const DeleteEmploye = async (id) => {
    console.log("del", id)
    try {

      let res = await MainApi.delete(`deleteEmploye?id=${id}`)
      console.log("delress", res)
      if (res.status == 200) {
        getData()
      }

    } catch (err) {
      console.log("errr", err)
    }
  }


  console.log("dta", data)
  return (<>

    
    {data.length>0?(
      <>
      <div className="MainFilter">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Salary Filter</InputLabel>
          <Select
          
            
            name="filterSalary"
            value={filterSalary}
         
            onChange={handleSalary}
          >
            <MenuItem value="Lowest">Lowest</MenuItem>
            <MenuItem value="Highest">Highest</MenuItem>
  
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">DepartMent Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            
            name="departFilter"
            value={departFilter}
            label="groupFilter"
            onChange={handleDepartment}
          >
          {departName&&departName.map((val,indx)=>{
            return (
  
              <MenuItem value={val.departmentName}>{val.departmentName}</MenuItem>
            )
          })}
         
  
          </Select>
        </FormControl>
      </div>

<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell >Employe Name</TableCell>
        <TableCell align="right">DepartName</TableCell>
        <TableCell align="right">Sallary</TableCell>
        <TableCell align="right">Update</TableCell>
        <TableCell align="right">Delete</TableCell>

      </TableRow>
    </TableHead>

    <TableBody className='tbleBody'>
      {data && data.map((val, indx) => (

        <TableRow
          key={indx}
        >
          <TableCell>
            {val.employeName}
          </TableCell>
          <TableCell align="right">{val.departmentName}</TableCell>
          <TableCell align="right">{val.salary}</TableCell>
          <TableCell align="right">
            <NavLink to={`/?id=${val._id}`}>Update</NavLink>
          </TableCell>
          <TableCell align="right">
            <Button onClick={() => DeleteEmploye(val._id)}>Delete</Button>
          </TableCell>

        </TableRow>
      ))}

    </TableBody>
  </Table>
</TableContainer>
</>
    ):(<h1 style={{textAlign:"center"}}>Please Add Employe Details </h1>)}

    <div className='addEmploye'>

      <Button variant="contained" onClick={() => { navigate('/') }}>Add Employe</Button>
    </div>
  </>
  )
}

export default View